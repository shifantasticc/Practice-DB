const mongoose = require('mongoose');

// CREATING CONNECTION
main()
  .then(() => {
    console.log('connection successful');
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/test');
}

// CREATING SCHEMA
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number,
});

// CREATING MODEL(class)
const Employee = mongoose.model('Employee', userSchema);
const User = mongoose.model('User', userSchema);

//INSERTING USER 1
const user1 = new User({
  name: 'Selene',
  email: 'SeleneStar@gmail.com',
  age: 19,
});

user1.save();

//INSERTING USER 2
const user2 = new User({
  name: 'Luna',
  email: 'LunaWater@gmail.com',
  age: 21,
});

user2
  .save()
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });

// INSERTING MULTIPLE USERS
User.insertMany([
  {
    name: 'Eliana',
    email: 'ElianaNector@gmail.com',
    age: 14,
  },
  {
    name: 'Sam',
    email: 'SamAsher@gmail.com',
    age: 13,
  },
  {
    name: 'Rue',
    email: 'RueBloom@gmail.com',
    age: 11,
  },
]).then((res) => console.log(res));

// USING FIND
User.find({ age: { $gt: 20 } })
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.log(err);
  });

// USING FIND BY ID
User.findById('681e525c3f674820313b5f41')
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.log(err);
  });

// UPDATE
User.updateOne({ name: 'Luna' }, { email: 'LunaMoon@gmail.com' })
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });

// UPDATE + PRINT UPDATED DATA IN TERMINAL
User.findOneAndUpdate({ name: "Luna" }, { age: 26 }, { new: true })
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });

// FIND BY ID + UPDATE
User.findByIdAndUpdate(('681e525c3f674820313b5f41'), { age: 25 }, { new: true })
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });

// DELETE-ONE
User.deleteOne({name : "Jack"})
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });

// DELETE-MANY
User.deleteMany({age: {$lt: 15 }})
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });

// FIND ONE + DELETE
User.findOneAndDelete({ name: 'Garrick' })
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });

// FIND BY ID + DELETE
User.findByIdAndDelete('681f443ffeae7778f8bd7836')
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });
