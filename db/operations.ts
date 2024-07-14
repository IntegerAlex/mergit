import { response } from 'express'
import {turso} from './connector'
import { resolve } from 'path'
export function getRepoData(repo_name:String){
	return new Promise((resolve,reject)=>{
		turso.execute(`SELECT * FROM ${repo_name}repo`)
		.then((response,rejection)=>{
			if(rejection){
			reject(reject)
			}
			resolve(response)	
		})
	}
)}
