import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    student: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    skill: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    pricing: { type: Number, required: true, min: 0 },
    pricingType: {
      type: String,
      enum: ["hourly", "fixed"],
      default: "fixed"
    },
    deliveryTime: { type: String, required: true, trim: true },
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export const Service = mongoose.model("Service", serviceSchema);
