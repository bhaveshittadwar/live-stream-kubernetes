// Import necessary modules
const express = require('express');
const mongoose = require('mongoose');

// Create an instance of Express
const app = express();

mongoose.set('strictQuery', false)
// Middleware for parsing JSON
app.use(express.json());

const { DB_USERNAME, DB_PASSWORD, DB_NAME, DB_HOST } = process.env;

// Connect to MongoDB using Mongoose
mongoose.connect(`mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: 'myDatabase', // Include the database name here
  retryWrites: true,
  w: 'majority', // Set write concern here
});
const db = mongoose.connection;

// Check for MongoDB connection status
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB successfully!');
});

// Define a schema and model for MongoDB
const Schema = mongoose.Schema;
const sampleSchema = new Schema({
  name: String,
  age: Number,
  email: String,
});

const SampleModel = mongoose.model('Sample', sampleSchema);

// Route to handle POST request to insert a document into MongoDB
app.post('/insertDocument', async (req, res) => {
  try {
    // Create a new document instance based on the SampleModel
    const newDocument = new SampleModel({
      name: req.body.name,
      age: req.body.age,
      email: req.body.email,
    });

    // Save the document to the database
    await newDocument.save();

    res.status(201).json({ message: 'Document inserted successfully!' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/', async (req, res) => {
    res.send("Hello World");
})

// Start the server on port 3000
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

  