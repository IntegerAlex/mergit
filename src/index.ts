import express from 'express';
import {generateSSHKeyPair} from '../utils/keys'
import GitServer from './gitserver'
import 
//import ejs from 'ejs'
//import Cli from './cli'
const gitServer = new GitServer()
//const cli = new Cli()



const app = express();
const port = 3000;

app.set('view engine','ejs')
app.get('/', (req, res) => {
	res.render('../views/index.ejs')
}); 



app.get('/Keys', (req, res) => {
        let privateKey , publicKey
	generateSSHKeyPair()
	.then((data:key|any)=>{
		privateKey = data.privateKey
		publicKey = data.publicKey
		gitServer.publicKey(publicKey) 
//		cli.privateKey(privateKey)
	res.send(privateKey)
	})
});

app.get('/repo/:name', async(req,res)=>{
	const repo_name = req.params.name
	getRepoData(repo_name)
	.then((data:any)=>{
	res.render('../views/repoData',data)
	})

})
app.listen(port,()=>{
console.log("running"+port)
})
interface key {
	privateKey ?: string,
	publicKey ?: string
}
