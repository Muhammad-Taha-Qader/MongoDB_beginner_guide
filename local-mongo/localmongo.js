const { MongoClient } = require('mongodb');

// Connection URI
const uri = 'mongodb://localhost:27017';  //IF a differnt one REPLACE IT WITH YOURS

// Database Name
const dbName = 'CreatorFeatureDB';   //REPLACE IT WITH YOURS DB name

async function main() {
    // Create a new MongoClient
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        // Connect the client to the server
        await client.connect();
        console.log('Connected to the MongoDB server');

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
        console.log('Disconnected from the MongoDB server');
    }
}

main().catch(console.error);
