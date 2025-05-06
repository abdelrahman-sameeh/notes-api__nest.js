import * as crypto from "crypto"

export function encrypt(str: string, iv: Buffer = crypto.randomBytes(16)) {
  const secretKey = process.env.AES_SECRET_KEY || "510c1775b400669332344ec2253d250800f05c7d81416e152ed9df6c9bd8b023";
  const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(secretKey, 'hex'), iv);

  let encryptedStr = cipher.update(str, 'utf8', 'hex');
  encryptedStr += cipher.final('hex');

  return {
    encryptedStr,
    iv: iv.toString('hex'),
  };
}