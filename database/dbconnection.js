const mongoose = require("mongoose");
const dbconnection = mongoose
  .connect(process.env.DATABASE_URL)
  .catch((err) => {
    console.log(err);
  })
  .then(() => {
    console.log(
      `Uni Assist DB Connected Succefully On Port ${process.env.PORT}`
    );
  });
module.exports = dbconnection;
