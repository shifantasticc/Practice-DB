const mongoose = require('mongoose');

// CREATING CONNECTION
main()
  .then(() => {
    console.log('connection successful');
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/amazon');
}

// // SCHEMA
// const bookSchema = new mongoose.Schema({
//   title: {
//     type: String,
//     required: true,
//   },
//   author: {
//     type: String,
//   },
//   price: {
//     type: Number,
//   },
// });

// SCHEMA + TYPE OPTIONS
const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    maxlength: 20,
  },
  author: {
    type: String,
  },
  price: {
    type: Number,
    min: [100, 'price is too low for Amazon selling'], // Error message if minimum value is not reached
  },
  discount: {
    type: Number,
    default: 0,
  },
  category: {
    type: String,
    enum: ['fiction', 'non-fiction'],
  },
  genre: [String],
});

const Book = mongoose.model('Book', bookSchema);

// INSERTING BOOK
let book1 = new Book({
  title: 'The Cruel Prince',
  author: 'Holly Black',
  price: 500,
  discount: 5,
  category: 'fiction',
  genre: ['fantasy', 'Mystery', 'Romance'],
});

book1
  .save()
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });

// INSERTING MULTIPLE BOOKS
Book.insertMany([
  {
    title: 'Fourth Wing',
    author: 'Rebecca Yarros',
    price: 1300,
  },
  {
    title: 'A Good Girls Guide To Murder',
    author: 'Holly Jackson',
    price: 1000,
  },
  {
    title: 'The Inheritance Game',
    author: 'Jennifer Lyn Barnes',
    price: 1500,
  },
])
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });

// ADDING MORE BOOKS ACCORDING TO SCHEMA
Book.insertMany([
  {
    title: 'Lightlark',
    author: 'Alex Aster',
    price: 1800,
  },
  {
    title: 'Rock Paper Scissors',
    price: 1200,
  },
  {
    title: 'King Of Pride',
  },
])
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });

// SCHEMA RULES DOESN'T WORK WHEN UPDATING DATA
// Schema Rules Validation While Updating Values
Book.findByIdAndUpdate(
  '681f5787a895e9ea6261bc1a',
  { price: 800 },
  { runValidators: true },
)
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });

