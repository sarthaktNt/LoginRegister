// import express from 'express';
// import mysql from 'mysql';
// import cors from 'cors';
// import jwt from 'cors';
// import bcrypt from 'bcrypt';
// import cookieParser from 'cookie-parser';

// const app = express();
// app.use(express.json());
// app.use(cors());
// app.use(cookieParser());

// // create connection with database 

// const db =mysql.createConnection({
//     host:"localhost",
//     user:"root",
//     password:"",
//     database:'signup'
// })
// app.listen(8081,()=>{
//     console.log("Sarting server.........")
// })

// Required dependencies
import  express from 'express';
import bodyParser from'body-parser';
import mysql from 'mysql';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import cors from 'cors';
import cookieParser from 'cookie-parser';


const app = express();
const port = 3000;
app.use(express.json())
app.use(cors())
app.use(cookieParser)

// MySQL Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'ecommercedatabase'
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL database');
});

// Middleware
app.use(bodyParser.json());

// Middleware for token validation
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization']; 
  if (!token) return res.status(403).send({ auth: false, message: 'No token provided.' });

  jwt.verify(token, 'your_secret_key', (err, decoded) => {
    if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });

    req.userId = decoded.id;
    next();
  });
};

// Register User
app.post('/register', (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 8);

  db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword], (err, result) => {
    if (err) return res.status(500).send('Error on registration.');

    const token = jwt.sign({ id: result.insertId }, 'jwt_secret_key', {
      expiresIn: 86400 // expires in 24 hours 
    });

    res.status(200).send({ auth: true, token: token });
  });
});

// Login User
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  db.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
    if (err) return res.status(500).send('Error on the server.');
    if (!results || results.length === 0) return res.status(404).send('User not found.');

    const user = results[0];
    const passwordIsValid = bcrypt.compareSync(password, user.password);
    if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });

    const token = jwt.sign({ id: user.id }, 'jwt_secret_key', {
      expiresIn: 86400 // expires in 24 hours
    });

    res.status(200).send({ auth: true, token: token });
  });
});

// Product home page
app.get('/products', (req, res) => {
  // Fetch products from database
  db.query('SELECT * FROM products', (err, results) => {
    if (err) return res.status(500).send('Error retrieving products.');

    res.status(200).send(results);
  });
});

// Product details page
app.get('/products/:productId', (req, res) => {
  const productId = req.params.productId;

  // Fetch product details from database based on productId
  db.query('SELECT * FROM products WHERE id = ?', [productId], (err, results) => {
    if (err) return res.status(500).send('Error retrieving product details.');
    if (!results || results.length === 0) return res.status(404).send('Product not found.');

    res.status(200).send(results[0]);
  });
});

// Add to cart
app.post('/cart', verifyToken, (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.userId;

  // Add product to user's cart in the database
  db.query('INSERT INTO cart (userId, productId, quantity) VALUES (?, ?, ?)', [userId, productId, quantity], (err, result) => {
    if (err) return res.status(500).send('Error adding product to cart.');

    res.status(200).send('Product added to cart successfully.');
  });
});

// Remove from cart
app.delete('/cart/:productId', verifyToken, (req, res) => {
  const productId = req.params.productId;
  const userId = req.userId;

  // Remove product from user's cart in the database
  db.query('DELETE FROM cart WHERE userId = ? AND productId = ?', [userId, productId], (err, result) => {
    if (err) return res.status(500).send('Error removing product from cart.');

    res.status(200).send('Product removed from cart successfully.');
  });
});

// Search products
app.get('/search', (req, res) => {
  const searchTerm = req.query.q;

  // Perform search query in the database
  db.query('SELECT * FROM products WHERE name LIKE ?', [`%${searchTerm}%`], (err, results) => {
    if (err) return res.status(500).send('Error searching products.');

    res.status(200).send(results);
  });
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
