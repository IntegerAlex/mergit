import express from 'express';
import {generateSSHKeyPair} from '../utils/keys'
const app = express();
const port = 3000;
import {exec} from 'child_process';
import { constrainedMemory } from 'process';

//exec('')
app.get('/', (req, res) => {
}); 



app.get('/Keys', (req, res) => {
        let privateKey , publicKey
	generateSSHKeyPair()
	.then((data:key|any)=>{
		privateKey = data.privateKey
		publicKey = data.publicKey
		gitServer.publickey(publicKey)
		cli.privateKey(privateKey)

	})
});


app.listen(port,()=>{
console.log("running"+port)
})
interface key {
	privateKey ?: string,
	publicKey ?: string
}
