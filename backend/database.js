const { MongoClient } = require('mongodb');
const client = new MongoClient('mongodb://127.0.0.1:27017', { useUnifiedTopology: true });
let db, votesCollection, categoriesCollection, usersCollection;
async function connectDB() {
  await client.connect();
  db = client.db('votesDB');
  votesCollection = db.collection('votes');
  categoriesCollection = db.collection('categories');
  usersCollection = db.collection('users');
  console.log('Connected to MongoDB');
}
module.exports = { 
  connectDB, 
  getVotesCollection: () => votesCollection, 
  getCategoriesCollection: () => categoriesCollection, 
  getUsersCollection: () => usersCollection 
};
