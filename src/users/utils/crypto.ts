/* eslint-disable prettier/prettier */
import * as bcrypt from "bcrypt";

export async function hashPassword(password: string) {
    const salt = await bcrypt.genSaltSync();
    const hashPassword = await bcrypt.hash(password, salt)
    return hashPassword;
}

// export async function generatedKey() {
//     const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
//         modulusLength: 570,
//     });
//     publicKey.export({ type: 'spki', format: 'pem' }).toString().replace(/-----BEGIN PUBLIC KEY-----\n|\n-----END PUBLIC KEY-----/g, '');
//     privateKey.export({ type: 'pkcs8', format: 'pem' }).toString().replace(/-----BEGIN PRIVATE KEY-----\n|\n-----END PRIVATE KEY-----/g, '');
//     return {
//         publicKey,
//         privateKey
//     }
// }