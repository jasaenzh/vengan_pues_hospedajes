import mongoose from "mongoose";

const permissionEnum = ['adminAccess', 'controlAccess', 'userAccess'];

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    permissions: {
      type: [{
        type: String,
        enum: permissionEnum,
      }],
      default: ['userAccess'],
    },
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    secondName: {
      type: String,
      required: false,
      trim: true,
      default: null
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    secondLastName: {
      type: String,
      required: false,
      trim: true,
      default: null
    },
    emailVerified: {
      type: Boolean,
      default: false,
    },
    emailVerificationCode: {
      type: String,
    },
    fullName: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
)

// Antes de guardar el documento, actualiza el campo fullName
userSchema.pre('save', function (next) {
  let fullName = this.firstName;
  if (this.secondName) {
    fullName += ' ' + this.secondName;
  }
  fullName += ' ' + this.lastName;
  if (this.secondLastName) {
    fullName += ' ' + this.secondLastName;
  }
  this.fullName = fullName.trim();
  next();
});

export default mongoose.model("User", userSchema);
