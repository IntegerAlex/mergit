import express from 'express';
import {createKeys} from '../utils/keys'
const app = express();
const port = 3000;
import {exec} from 'child_process';

exec('')
app.get('/', (req, res) => {
}); 



app.get('/Keys', (req, res) => {  
    const {private , public } = createKeys();
});
