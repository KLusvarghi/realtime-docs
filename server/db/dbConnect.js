import { MongoClient } from 'mongodb';
import "dotenv/config";

// export default async function connectToDatabase() {
//   try {
//     if(!process.env.DB_CONNECTION_STRING) {
//       throw new Error('DB_CONNECTION_STRING is not defined in .env file');
//     }
//     const client = new MongoClient(process.env.DB_CONNECTION_STRING)
//     await client.connect();
//     const db = client.db('realtime-websockets');
//     const documents = db.collection('documents');
//     if(documents){
//       consol.log('Connected to MongoDB');
//     }

//   } catch (error) {
//     consol.elog(error)
//   }
// }

const client = new MongoClient(process.env.DB_CONNECTION_STRING)

let documentsCollection;
let usersCollection;

try {
  if (!process.env.DB_CONNECTION_STRING) {
    throw new Error('DB_CONNECTION_STRING is not defined in .env file');
  }
  await client.connect();
  const db = client.db('realtime-websockets');
  documentsCollection = db.collection('documents');
  usersCollection = db.collection('users');

  if (documentsCollection && usersCollection) {
    console.log('Connected to Data base');
  }
} catch (error) {
  consol.log(error)
}

export { documentsCollection, usersCollection }

