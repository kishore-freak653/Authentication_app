import mongoose,{mongo} from "mongoose";
import  dotenv  from "dotenv";
dotenv.config();

const connectDB = async ()=>{
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MONGODB CONNECTED: ${connect.connection.host}`)
  } catch (error) {
    console.log(error)
    process.exit(1);
  }
}

export default connectDB