
const Encrypt = (str) => {
    let x = str.length;
    let a = 0, p = 51, MOD = 1e9 + 9;
    let c, prev = 1;
    for (let i = 0; i < x; i++) {
        a += (str.charCodeAt(i)) * prev * p;
        a %= MOD;
        prev = (prev * 51) % MOD;
    }
    return a;
}

const passwordCheck = (str) => {
    let result = (str.length >= 8 && str.length <= 15), a = 0, b = 0, c = 0;
    for (let index = 0; index < str.length; index++) {
        if (str.charCodeAt(index) >= 97 && str.charCodeAt(index) <= 122)
            a = 1;
        if (str.charCodeAt(index) >= 65 && str.charCodeAt(index) <= 90)
            b = 1;
        if (str.charCodeAt(index) >= 48 && str.charCodeAt(index) <= 57)
            c = 1;
    }
    return (result & a & b & c);
}
const EmailCheck = (str) => {
    return true;
}
module.exports = {
    Encrypt,
    passwordCheck,
    EmailCheck
};
