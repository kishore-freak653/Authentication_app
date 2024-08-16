import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// This pre-save hook will run before saving a user document
userSchema.pre("save", async function (next) {
  // Check if the password field is modified
  if (!this.isModified("password")) {
    next(); // Skip the hashing if password is not modified
  }

  // Generate a salt and hash the password
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);

  next(); // Continue with the save operation
});

userSchema.methods.matchPasswords = async function (enteredPassword){

  return await bcrypt.compare(enteredPassword,this.password);
}
const usersModel = mongoose.model("users", userSchema);
export default usersModel;
