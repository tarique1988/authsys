import mongoose from "mongoose";

export const connect = () => {
  const user = process.env.DB_USER;
  const pass = process.env.DB_PASS;
  const host = process.env.DB_HOST;

  mongoose
    .connect(`mongodb://${user}:${pass}@${host}`, {
      useUnifiedTopology: true,
      useCreateIndex: true,
      useNewUrlParser: true,
      useFindAndModify: false,
    })
    .then((conn) => {
      console.log(`Database connection established!`);
    })
    .catch((err) => {
      console.log(`Failed to connect to the database, exiting!`, err);
      process.exit(2);
    });
};

export const disconnect = () => {
  mongoose
    .disconnect()
    .then(() => {
      console.log(`Database disconnected.`);
    })
    .catch((err) => {
      console.log(`There was an error, exiting!`, err);
      process.exit(2);
    });
};
