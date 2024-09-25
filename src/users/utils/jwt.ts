/* eslint-disable prettier/prettier */
import jwt, { SignOptions } from 'jsonwebtoken'

export const signToken = ({
    payload,
    privateKey = process.env.JWT_SECRET,
    options = {
        algorithm: 'HS256'
    }
}: {
    payload: string | Buffer | object,
    privateKey?: string,
    options?: SignOptions
}) => {
    return new Promise<string>((resolve, reject) => {
        jwt.sign(payload, privateKey, options, (error, token) => {
            if (error) {
                reject(error)
                return;
            }

            resolve(token)
        })
    })
}
