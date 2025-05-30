const mongoose = require('mongoose');
// Importing chat.js
const Chat = require('./models/chat.js');

// CREATING CONNECTION
main()
  .then(() => {
    console.log('connection successful');
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

// Inserting data into DB
let allChats = [
  {
    from: 'Avery',
    to: 'Jude',
    msg: 'send me Maths PYQs',
    created_at: new Date(),
  },
  {
    from: 'Ella',
    to: 'Rue',
    msg: 'Lets meet @seleneCafe on sunday?',
    created_at: new Date(),
  },
  {
    from: 'Xaden',
    to: 'Violet',
    msg: 'Fight for it, Violence',
    created_at: new Date(),
  },
  {
    from: 'Kai',
    to: 'Isabella',
    msg: 'i finished translating your favorite novel into german',
    created_at: new Date(),
  },
  {
    from: 'Dante',
    to: 'Vivian',
    msg: 'Hello, Mia Cara',
    created_at: new Date(),
  },
];

Chat.insertMany(allChats);