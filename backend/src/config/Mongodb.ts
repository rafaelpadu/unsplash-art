import mongoose from "mongoose";

const URI =
  process.env.MONGODB_URL || "mongodb://admin:123456@localhost:27017/admin";
const dbInit = () =>
  mongoose.connect(URI, { dbName: "images" }, (err) => {
    if (err) console.log(err.message);
    console.log("MongoDB conectado com sucesso!");
  });

export default dbInit;
