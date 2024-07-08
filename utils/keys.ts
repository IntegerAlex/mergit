import {generateKeyPair} from 'crypto'


export async function generateSSHKeyPair() {
const passphrase = ''
return new Promise((resolve,reject)=>{ 
    generateKeyPair('rsa', {
      modulusLength: 4096,
      publicKeyEncoding: {
        type: 'spki',
        format: 'pem'
      },
      privateKeyEncoding: {
        type: 'pkcs8',
        format: 'pem',
        cipher: 'aes-256-cbc',
        passphrase: passphrase
      }
    },(err,publicKey,privateKey)=>{
	    
	    if(err){
	    return reject({"empty":null})
	    }
	else{
		resolve({"publicKey":publicKey,"privateKey":privateKey})
	}
    });

})}
// test
/*
generateSSHKeyPair().then((data)=>{
console.log(data)
})
*/
