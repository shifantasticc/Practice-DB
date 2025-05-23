const mongoose = require('mongoose');
const { Schema } = mongoose;

main()
  .then(() => console.log('DB connection successful'))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/relationDemo');
}

// ONE TO SQUILLIONS RELATIONSHIP SCHEMA (adding Id to access data from other collection)
// storing parent reference in child
const userSchema = new Schema({
  username: String,
  email: String,
});

const postSchema = new Schema({
  content: String,
  likes: Number,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});

const User = mongoose.model('User', userSchema);
const Post = mongoose.model('Post', postSchema);

// const addData = async () => {
//   // Extracting User1 from DB
//   let user = await User.findOne({ username: 'VioletRiorson' });

//   let post2 = new Post({
//     content: 'Bye Bye Xaden!',
//     likes: 15,
//   });

//   post2.user = user;
//   let res = await post2.save();
//   console.log(res);

// let user1 = new User({
//   username: 'VioletRiorson',
//   email: 'Violet@gmail.com',
// });

// let post1 = new Post({
//   content: "Hello Xaden!",
//   likes: 10
// });

// post1.user = user1;
// let result = await user1.save();
// let res = await post1.save();
// console.log(result);
// console.log(res);
// };

// addData();

const getData = async () => {
  let result = await Post.findOne({}).populate('user', 'username');
  console.log(result);
};

getData();
