const mongoose = require('mongoose');

const { MONGO_URI } = process.env;

exports.connect = () => {
  mongoose
    .connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    })
    .then(() => {
      console.log("DB connection success");
    })
    .catch((error) => {
      console.log("DB connection failed");
      console.error(error);
      process.exit(1);
    })
}