import crypto from "crypto";

const algorithm = 'aes-256-ctr';
const secretKey = process.env.ENCRYPTION_KEY || 'your_secret_key';
const iv = crypto.randomBytes(16);

export const encrypt = (text: string) => {
    const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
    const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);
    return `${iv.toString('hex')}:${encrypted.toString('hex')}`;
};

export const decrypt = (hash: string) => {
    const [ivString, encryptedText] = hash.split(':');
    const decipher = crypto.createDecipheriv(algorithm, secretKey, Buffer.from(ivString, 'hex'));
    const decrypted = Buffer.concat([decipher.update(Buffer.from(encryptedText, 'hex')), decipher.final()]);
    return decrypted.toString();
};
