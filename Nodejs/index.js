const express = require('express');
const sql = require('mssql');
const cors = require('cors'); 
require('dotenv').config()

// Express App
const app = express();
const port = 5000;

// Middleware to parse JSON requests
app.use(express.json());

// SQL Server Configuration
const dbConfig = {
  user: 'your_username',        
  password: 'your_password',   
  server: 'your_server_name',       
  database: 'your_database_name',
  options: {
    encrypt: true,              
    trustServerCertificate: true, // Allow self-signed certificates
  },
};

app.use(cors({
  origin: 'http://localhost:3000'  // Allow only React app running on localhost:3000 to make requests
 }));

// Establish a database connection
let pool;

const connectToDatabase = async () => {
  try {
    pool = await sql.connect(dbConfig);
    console.log('Connected to SQL Server!');
  } catch (err) {
    console.error('Database connection failed:', err);
  }
};

// Endpoint to fetch data
app.get('/categories', async (req, res) => {
  try {
    const result = await pool.request().query('SELECT * FROM categories');
    const response = result.recordset;
    res.json(response);
  } catch (err) {
    console.error('Error fetching data:', err);
    res.status(500).send('Server Error');
  }
});

// Start the server
app.listen(port, async () => {
  console.log(`Server running on http://localhost:${port}`);
  await connectToDatabase(); // Connect to the database when the server starts
});
