// DB CONNECTION/ INSERT DATA
const { faker } = require('@faker-js/faker');
const mysql = require('mysql2');

// Create the connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'delta_app',
  password: 'NewPass@123', // add password
});

// INSERTING data in BULK

//Inbuilt function from faker
let getRandomUser = () => {
  return [
    faker.string.uuid(),
    faker.internet.username(), // before version 9.1.0, use userName()
    faker.internet.email(),
    faker.internet.password(),
  ];
};

// Inserting new data
let q = 'INSERT INTO user (id, username, email, password) VALUES ?';

// Using Loops to add data in Bulk
let data = [];
for (let i = 1; i <= 100; i++) {
  data.push(getRandomUser()); // 100 fake user data
}

// Execute Query
try {
  connection.query(q, [data], (err, result) => {
    if (err) throw err;
    console.log(result);
  });
} catch (err) {
  console.log(err);
}

// End Connection
connection.end();