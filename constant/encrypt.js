
const Encrypt = (str) => {
    let x = str.length;
    let a = 0, p = 51, MOD = 1e9 + 9;
    let c, prev = 1;
    for (let i = 0; i < x; i++) {
        a += (str[i].charCodeAt(0)) * prev * p;
        a %= MOD;
        prev = (prev * 51) % MOD;
    }
    return a;
}


module.exports = Encrypt;
