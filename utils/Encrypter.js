const crypto = require('crypto');

/**
 * Wrapper class for encrypting and decrypting strings using NodeJS Crypto API.
 */
class Encrypter {
    constructor() {
        this.password = 'some secret password';
        this.key = crypto.createSecretKey(this.randomBytes(24));
        this.algorithm = 'aes-192-cbc'
    }
    encrypt(str) {
        let cipher = crypto.createCipheriv(this.algorithm, this.key, Buffer.alloc(16));
        let encrypted = cipher.update(str, 'utf8', 'hex');
        encrypted += cipher.final('hex');
        return encrypted;
    }
    decrypt(str) {
        let decipher = crypto.createDecipheriv(this.algorithm, this.key, Buffer.alloc(16));
        let decrypted = decipher.update(str, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        return decrypted;
    }
    /**
     * @param { the size of the hash } size 
     */
    randomBytes(size) {
        return crypto.randomBytes(size);
    }
}

module.exports = Encrypter;