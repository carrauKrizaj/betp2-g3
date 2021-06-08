require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;
const uri = process.env.CONNECTION_MONGO;

const client = new MongoClient(uri);
let instance = null; 

async function getConnection(){
    if(instance == null){
        try{
            instance = await client.connect(); 
        } catch(err){
            console.log(err.mesage);
        }
    } 
    return instance;
};


module.exports = {getConnection};