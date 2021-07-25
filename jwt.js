import { sign, verify } from "jsonwebtoken";
const securityKey = "skJwt";
export const tojwt = (obj) => {
    return sign(obj, securityKey);
};
export const fromjwt = (str) => {
    try {
        return verify(str, securityKey);
    } catch (_error) {
        return {};
    }
};
