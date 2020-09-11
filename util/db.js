const mongoose = require('mongoose');
const env = require('dotenv').config();

const db = process.env.ATLAS;

const connectdb = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });

    console.log('MongoDB Connected');
  } catch (error) {
    console.log(err.message);
    process.exit(1);
  }
};

module.exports = connectdb;
