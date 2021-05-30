const MongoClient = require('mongodb').MongoClient;
const uri = 'mongodb+srv://admin:famafr123@cluster0.pvklr.mongodb.net/test?retryWrites=true&w=majority';

const client = new MongoClient(uri);
let instance = null; 

async function getConnection(){
    if(instance){
        try{
            instance = await client.connect(); 
        } catch(err){
            console.log(err.mesage);
        }
    } 
    return instance;
};


module.exports = {getConnection};