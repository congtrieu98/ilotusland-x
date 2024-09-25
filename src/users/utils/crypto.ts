/* eslint-disable prettier/prettier */
import bcrypt from "bcrypt";

export function hashPassword(password: string) {
    return bcrypt.hash(password, 10, function (hash) {
        return hash
    });
}