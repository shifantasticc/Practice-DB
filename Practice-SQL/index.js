const { faker } = require('@faker-js/faker');
const mysql = require('mysql2');
const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override');
const { v4: uuidv4 } = require('uuid');

app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

app.use(express.static(path.join(__dirname, 'public')));

// Create the connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'delta_app',
  password: 'xyz', // add password
});

//Inbuilt function from faker
let getRandomUser = () => {
  return [
    faker.string.uuid(),
    faker.internet.username(), // before version 9.1.0, use userName()
    faker.internet.email(),
    faker.internet.password(),
  ];
};

// HOME ROUTE
app.get('/', (req, res) => {
  let q = `SELECT count(*) FROM user`;
  // Execute Query
  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      let count = result[0]['count(*)'];
      // Homepage UI File
      res.render('home.ejs', { count });
    });
  } catch (err) {
    console.log(err);
    // Error msg for Homepage
    res.send('Some error in DB');
  }
});

app.post('/', (req, res) => {
  res.redirect('/user');
});

// 1) H.W: Create Form to ADD a new user to the DB
// POST request
app.get('/user/add', (req, res) => {
  let q = `SELECT * FROM user`;
  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      // /user/add UI File
      res.render('newuser.ejs');
    });
  } catch (err) {
    console.log(err);
    // Error msg for Homepage
    res.send('Some error in DB');
  }
});

// Adding New user
app.post('/user', (req, res) => {
  // Adding code here
  let { username, email, password } = req.body;
  let id = uuidv4();
  let q = `INSERT INTO user (id, username, email, password) VALUES ?`;
  let newUser = [[id, username, email, password]];
  // Execute Query
  try {
    connection.query(q, [newUser], (err, result) => {
      if (err) throw err;
      console.log(result);
      res.redirect('/user');
    });
  } catch (err) {
    console.log(err);
  }
});

// Show Route
app.get('/user', (req, res) => {
  let q = `SELECT * FROM user`;
  // Execute Query
  try {
    connection.query(q, (err, users) => {
      if (err) throw err;
      // /user UI File  ("{users}" is all the DB data)
      res.render('showusers.ejs', { users });
    });
  } catch (err) {
    console.log(err);
    // Error msg for Homepage
    res.send('Some error in DB');
  }
});

// Edit Route
app.get('/user/:id/edit', (req, res) => {
  let { id } = req.params;
  let q = `SELECT * FROM user WHERE id='${id}'`;
  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      let user = result[0];
      // /user/:id/edit UI File
      res.render('edit.ejs', { user });
    });
  } catch (err) {
    console.log(err);
    // Error msg for Homepage
    res.send('Some error in DB');
  }
});

// Update (DB) Route
app.patch('/user/:id', (req, res) => {
  let { id } = req.params;
  let { password: formPass, username: newUsername } = req.body;
  let q = `SELECT * FROM user WHERE id='${id}'`;
  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      let user = result[0];
      // Comparing Password
      if (formPass != user.password) {
        res.send('WRONG password');
      } else {
        // Upadting username
        let q2 = `UPDATE user SET username='${newUsername}' WHERE id='${id}'`;
        connection.query(q2, (err, result) => {
          if (err) throw err;
          res.redirect('/user');
        });
      }
    });
  } catch (err) {
    console.log(err);
    // Error msg for Homepage
    res.send('Some error in DB');
  }
});

// 2) H.W: Create Form to DELETE a user from the DB, if they enter correct email id & pw.
// DELETE request (create a delete button like edit.)
app.get('/user/:id/delete', (req, res) => {
  let { id } = req.params;
  let q = `SELECT * FROM user WHERE id='${id}'`;
  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      let user = result[0];
      // /user/:id/delete UI File
      res.render('delete.ejs', { user });
    });
  } catch (err) {
    console.log(err);
    // Error msg for Homepage
    res.send('Some error in DB');
  }
});

// Update (DB) Route
app.delete('/user/:id', (req, res) => {
  let { id } = req.params;
  let {
    password: formPass,
    username: newUsername,
    email: formEmail,
  } = req.body;
  let q = `SELECT * FROM user WHERE id='${id}'`;
  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      let user = result[0];
      // Comparing Emmail and Password
      if (formEmail != user.email && formPass != user.password) {
        res.send('WRONG email and password');
      } else {
        // Now compare the email and password and delete the username.
        // Deleting username
        let q2 = `DELETE FROM user WHERE id='${id}'`;
        connection.query(q2, (err, result) => {
          if (err) throw err;
          res.redirect('/user');
        });
      }
    });
  } catch (err) {
    console.log(err);
    // Error msg for Homepage
    res.send('Some error in DB');
  }
});

// starting the server
app.listen('8080', () => {
  console.log('server is listeniung to port 8080');
});

// TEMP COMMENT OUT
// Execute Query
// try {
//   connection.query(q, [data], (err, result) => {
//     if (err) throw err;
//     console.log(result);
//   });
// } catch (err) {
//   console.log(err);
// }

// // End Connection
// connection.end();
