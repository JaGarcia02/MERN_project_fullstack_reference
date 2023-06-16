import mongoose from "mongoose";
import bcrypt from "bcryptjs";

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
  {
    timestamps: true,
  }
);

/* This apporch is we are encrypting the password in the models insted to the controllers */
// this will encrypt the password before saving to the database
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  } else {
    // this function will salt the password
    const salt = await bcrypt.genSaltSync(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
});

// this will compare if the password entered by the user is match in the database
userSchema.methods.matchPasswords = async function (enteredPassword) {
  return await bcrypt.compareSync(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);
export default User;
