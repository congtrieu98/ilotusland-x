/* eslint-disable prettier/prettier */
import * as bcrypt from "bcrypt";

export async function hashPassword(password: string) {
    const salt = await bcrypt.genSaltSync();
    const hashPassword = await bcrypt.hash(password, salt)
    return hashPassword;
}

export async function decodePassword(password: string, passwordDB: string) {
    return await bcrypt.compare(password, passwordDB)
}