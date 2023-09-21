import { connect } from "mongoose";
import { DATABASE_URL } from "./index.js";

const dbConnect = async () => {
  try {
    const conn = connect(DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected`);
  } catch (error) {
    console.log("error while connecting to database => ", error);
    process.exit(1);
  }
};

// connect(DATABASE_URL, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
//   .then(() => console.log("connected to Database"))
//   .catch((e) => {
//     console.log("Error while connecting the database ");
//     console.log("Error in DB " + e);
//     process.exit(1);
//   });

export default dbConnect;
