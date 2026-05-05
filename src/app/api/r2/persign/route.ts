import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { key, contentType } = await req.json()
    if (!key || !contentType) return NextResponse.json({ error: 'Missing key or contentType' }, { status: 400 })

    const allowedTypes = ['video/mp4', 'video/webm', 'video/quicktime']
    if (!allowedTypes.includes(contentType)) return NextResponse.json({ error: 'MP4, WebM, or MOV only.' }, { status: 400 })

    const { CLOUDFLARE_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_BUCKET_NAME } = process.env
    if (!CLOUDFLARE_ACCOUNT_ID || !R2_ACCESS_KEY_ID || !R2_SECRET_ACCESS_KEY || !R2_BUCKET_NAME) {
      return NextResponse.json({ error: 'R2 not configured' }, { status: 500 })
    }

    const endpoint = `https://${CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`
    const uploadUrl = await generatePresignedUrl({
      endpoint, bucket: R2_BUCKET_NAME, key, contentType,
      accessKeyId: R2_ACCESS_KEY_ID, secretAccessKey: R2_SECRET_ACCESS_KEY, expiresIn: 3600,
    })
    const publicUrl = `${process.env.NEXT_PUBLIC_R2_BASE_URL}/${key}`
    return NextResponse.json({ uploadUrl, publicUrl, key })
  } catch (err) {
    console.error('[R2 Presign Error]', err)
    return NextResponse.json({ error: 'Failed to generate upload URL' }, { status: 500 })
  }
}

async function generatePresignedUrl({ endpoint, bucket, key, contentType, accessKeyId, secretAccessKey, expiresIn }: {
  endpoint: string; bucket: string; key: string; contentType: string
  accessKeyId: string; secretAccessKey: string; expiresIn: number
}) {
  const region = 'auto'
  const now = new Date()
  const datestamp = now.toISOString().replace(/[:-]|\.\d{3}/g, '').slice(0, 8)
  const amzdate = now.toISOString().replace(/[:-]|\.\d{3}/g, '')
  const credentialScope = `${datestamp}/${region}/s3/aws4_request`
  const host = new URL(endpoint).host

  const url = new URL(`${endpoint}/${bucket}/${key}`)
  url.searchParams.set('X-Amz-Algorithm', 'AWS4-HMAC-SHA256')
  url.searchParams.set('X-Amz-Credential', `${accessKeyId}/${credentialScope}`)
  url.searchParams.set('X-Amz-Date', amzdate)
  url.searchParams.set('X-Amz-Expires', String(expiresIn))
  url.searchParams.set('X-Amz-SignedHeaders', 'content-type;host')
  url.searchParams.set('X-Amz-Content-Sha256', 'UNSIGNED-PAYLOAD')

  const canonicalRequest = [
    'PUT', `/${bucket}/${key}`, url.searchParams.toString(),
    `content-type:${contentType}\nhost:${host}\n`,
    'content-type;host', 'UNSIGNED-PAYLOAD',
  ].join('\n')

  const stringToSign = ['AWS4-HMAC-SHA256', amzdate, credentialScope, await sha256(canonicalRequest)].join('\n')
  const signingKey = await getSigningKey(secretAccessKey, datestamp, region, 's3')
  url.searchParams.set('X-Amz-Signature', await hmacHex(signingKey, stringToSign))
  return url.toString()
}

async function sha256(msg: string): Promise<string> {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(msg))
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('')
}

async function hmac(key: ArrayBuffer, msg: string): Promise<ArrayBuffer> {
  const cryptoKey = await crypto.subtle.importKey('raw', key, { name: 'HMAC', hash: 'SHA-256' }, false, ['sign'])
  return crypto.subtle.sign('HMAC', cryptoKey, new TextEncoder().encode(msg))
}

async function hmacHex(key: ArrayBuffer, msg: string): Promise<string> {
  const buf = await hmac(key, msg)
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('')
}

async function getSigningKey(secret: string, date: string, region: string, service: string): Promise<ArrayBuffer> {
  const initial: ArrayBuffer = new TextEncoder().encode(`AWS4${secret}`).buffer as ArrayBuffer
  const kDate    = await hmac(initial, date)
  const kRegion  = await hmac(kDate, region)
  const kService = await hmac(kRegion, service)
  return hmac(kService, 'aws4_request')
}