const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { Schema } = mongoose;
const userSchema = new Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    select: false,
    // minlength: [8, "Password must be at least 8 characters long"],
    // validate: {
    //   validator: function (value) {
    //     return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
    //       value
    //     );
    //   },
    //   message:
    //     "Password must have at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character",
    // },
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  adress: {
    type: String,
  },
  city: {
    type: String,
  },
  postCode: {
    type: String,
  },
  votedFor: {
    type: Array,
  },
});
userSchema.pre("save", async function (next) {
  // If the password is modified or newly set, hash it
  if (this.isModified("password") || this.isNew) {
    try {
      const salt = await bcrypt.genSalt(10); // Generate salt
      const hashedPassword = await bcrypt.hash(this.password, salt); // Hash the password
      this.password = hashedPassword; // Set the hashed password
      next(); // Proceed with saving the user
    } catch (error) {
      next(error); // If there's an error, pass it to the next middleware
    }
  } else {
    next(); // If password isn't modified, continue saving the user
  }
});
userSchema.methods.comparePassword = async function (
  enteredPassword,
  cryptedPasssword
) {
  return await bcrypt.compare(enteredPassword, cryptedPasssword);
};
const userModel = mongoose.model("users", userSchema);
module.exports = userModel;
