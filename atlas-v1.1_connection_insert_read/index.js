const { MongoClient } = require('mongodb');
const config = require('./config');

async function main() {
    // Create a new MongoClient
    const client = new MongoClient(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        // Connect the client to the server
        await client.connect();
        console.log('Connected to the MongoDB Atlas cluster');

        // Connect to the specific database
        const db = client.db(config.dbName);
        console.log(`Connected to database: ${config.dbName}`);

        // Insert some student data
        await insertStudents(db);

        // Fetch and display student data
        await showStudents(db);
    } catch (err) {
        console.error('Error: ', err);
    } finally {
        // Close the client
        await client.close();
        console.log('Disconnected from the MongoDB Atlas cluster');
    }
}

async function insertStudents(db) {
    const studentsCollection = db.collection('students');

    // Insert some sample student data
    await studentsCollection.insertMany([
        { name: 'Taha', age: 20, grade: 'A' },
        { name: 'Muammad Taha', age: 22, grade: 'B' },
        { name: 'Taha at ITU', age: 21, grade: 'C' }
    ]);

    console.log('Inserted sample student data');
}

async function showStudents(db) {
    const studentsCollection = db.collection('students');

    // Find all students
    const students = await studentsCollection.find({}).toArray();

    console.log('\n\nAll Students:');
    console.log(students);
}

main().catch(console.error);
