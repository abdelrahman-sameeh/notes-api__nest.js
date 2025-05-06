import * as crypto from "crypto"

export function decrypt(encryptedCode: string, iv: string): string {
  const secretKey = process.env.AES_SECRET_KEY || "510c1775b400669332344ec2253d250800f05c7d81416e152ed9df6c9bd8b023";
  const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(secretKey, 'hex'), Buffer.from(iv, 'hex'));

  let decryptedCode = decipher.update(encryptedCode, 'hex', 'utf8');
  decryptedCode += decipher.final('utf8');

  return decryptedCode;
}


