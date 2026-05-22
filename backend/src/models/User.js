import bcrypt from "bcryptjs";
import mongoose from "mongoose";

const bankDetailsSchema = new mongoose.Schema(
  {
    accountNumber: { type: String, trim: true },
    ifsc: { type: String, trim: true, uppercase: true }
  },
  { _id: false }
);

const studentProfileSchema = new mongoose.Schema(
  {
    alternatePhone: { type: String, trim: true },
    collegeName: { type: String, trim: true },
    course: { type: String, trim: true },
    graduationYear: { type: Number },
    aadhaarNumber: { type: String, trim: true },
    bankDetails: bankDetailsSchema,
    purpose: { type: String, trim: true },
    profilePhotoUrl: { type: String, trim: true },
    approvalDocumentUrl: { type: String, trim: true },
    isApproved: { type: Boolean, default: false }
  },
  { _id: false }
);

const customerProfileSchema = new mongoose.Schema(
  {
    address: { type: String, trim: true }
  },
  { _id: false }
);

const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    password: { type: String, required: true, minlength: 6 },
    phoneNumber: { type: String, required: true, trim: true },
    role: { type: String, enum: ["student", "customer"], required: true },
    studentProfile: studentProfileSchema,
    customerProfile: customerProfileSchema
  },
  { timestamps: true }
);

userSchema.pre("save", async function hashPassword(next) {
  if (!this.isModified("password")) {
    next();
    return;
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.comparePassword = function comparePassword(candidate) {
  return bcrypt.compare(candidate, this.password);
};

userSchema.methods.toSafeJSON = function toSafeJSON() {
  const user = this.toObject();
  delete user.password;
  return user;
};

export const User = mongoose.model("User", userSchema);
