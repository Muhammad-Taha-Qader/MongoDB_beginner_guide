const { MongoClient } = require('mongodb');

// Connection URI for MongoDB Atlas
const uri = "connection string here";   //REPLACE IT WITH YOURS
 
// Database Name
const dbName = 'databse name here';  //REPLACE IT WITH YOURS

async function main() {
    // Create a new MongoClient
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        // Connect the client to the server
        await client.connect();
        console.log('Connected to the MongoDB Atlas cluster');

        // Connect to the specific database
        const db = client.db(dbName);
        console.log(`Connected to database: ${dbName}`);

        // List all collections in the database
        const collections = await db.listCollections().toArray();
        console.log('Collections in the database:');
        collections.forEach(collection => console.log(collection.name));
    } catch (err) {
        console.error('Error: ', err);
    } finally {
        // Close the client
        await client.close();
        console.log('Disconnected from the MongoDB Atlas cluster');
    }
}

main().catch(console.error);
