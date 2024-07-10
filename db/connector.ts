// database connectors
//
// Access management of database 
import { createClient } from "@libsql/client";
import dotenv from 'dotenv'
import {Table} from './schema'
dotenv.config()
export const turso = createClient({
  url: process.env.TURSO_DATABASE_URL || 'MERGIT',
  authToken: process.env.TURSO_AUTH_TOKEN,
});
const createTable =  new Table
//createTable.CTmainMetaData()
createTable.CTrepoCommitData("mergit")





