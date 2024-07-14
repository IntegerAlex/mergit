import {turso} from './connector'
export class Table{

	async CTmainMetaData(){
		const sql = `CREATE TABLE main_meta_data(repo_name VARCHAR PRIMARY KEY,description VARCHAR,owner VARCHAR,last_commit DATE) `
		await turso.execute(sql)
		.then((response)=>{
			console.log( response)
		})
	}

	async CTrepoCommitData(user_repo:string){
		const sql = `CREATE TABLE ${user_repo}repo(commit_date DATE,commit_message VARCHAR , author VARCHAR ,files_changed NUMERIC , added NUMERIC , removed NUMERIC)`
		await turso.execute(sql)
		.then((response)=>{
			console.log(response.toJSON())
		})
	}
	
}


