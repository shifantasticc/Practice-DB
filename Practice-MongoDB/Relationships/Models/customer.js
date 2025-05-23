const mongoose = require('mongoose');
const { Schema } = mongoose;

main()
  .then(() => console.log('DB connection successful'))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/relationDemo');
}

// ONE TO MANY RELATIONSHIP SCHEMA (adding Id to access data from other collection)
// storing child reference in parent
const orderSchema = new Schema({
  item: String,
  price: Number,
});

const customerSchema = new Schema({
  name: String,
  orders: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Order',
    },
  ],
});

// Pre - run before the query is executed
// customerSchema.pre('findOneAndDelete', async () => {
//   console.log('PRE MIDDLEWARE');
// });

// Post - run after the query is executed
// Deleting Orders after Customer is Deleted
customerSchema.post('findOneAndDelete', async (customer) => {
  if (customer.orders.length) {
    let res = await Order.deleteMany({ _id: { $in: customer.orders } });
    console.log(res);
  }
});

const Order = mongoose.model('Order', orderSchema);
const Customer = mongoose.model('Customer', customerSchema);

// const addOrders = async () => {
//   let res = await Order.insertMany([
//     { item: 'Samosa', price: 20 },
//     { item: 'Chips', price: 10 },
//     { item: 'Veda pao', price: 15 },
//   ]);
//   console.log(res);
// };

// addOrders();

// const addCustomer = async () => {
//   let cust1 = new Customer({
//     name: 'Lana Myres',
//   });

// ACCESSING ORDER ID
//   let order1 = await Order.findOne({ item: 'Chips' });
//   let order2 = await Order.findOne({ item: 'Veda pao' });

//   cust1.orders.push(order1);
//   cust1.orders.push(order2);

//   let result = cust1.save();
//   console.log(result);

// PRINTING DATA FROM DB ON CONSOLE
//   let result = await Customer.find({});
//   console.log(result);
// };

// addCustomer();

// ACCESSING DATA USING POPULATE (instead of order id => order data will be there)
const findCustoner = async () => {
  let result = await Customer.find({}).populate('orders');
  console.log(result[0]);
};

// findCustoner();

const addCus = async () => {
  let newCust = new Customer({
    name: 'Daisy warner',
  });

  let newOrder = new Order({
    item: 'Pizza',
    price: 300,
  });

  newCust.orders.push(newOrder);

  await newOrder.save();
  await newCust.save();

  console.log('Added new Customer!');
};

// addCus();

const delCust = async () => {
  let data = await Customer.findByIdAndDelete('68277319c578d11e75fa9f77');
  console.log(data);
};

delCust();
