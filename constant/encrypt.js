
const encrypt = (str) => {
    let x = str.length;
    let a = 0, p = 51, MOD = 1e9 + 9;
    let c, prev = 1;
    for (let i = 0; i < x; i++) {
        a += (str[i].charCodeAt(0)) * prev * p;
        a %= MOD;
        prev *= 51;
        prev %= MOD;
    }
    return a;
}


module.exports = encrypt;
