import { Service } from "../models/Service.js";

export async function createService(req, res) {
  try {
    const service = await Service.create({
      student: req.user._id,
      skill: req.body.skill,
      description: req.body.description,
      pricing: req.body.pricing,
      pricingType: req.body.pricingType || "fixed",
      deliveryTime: req.body.deliveryTime
    });

    return res.status(201).json({ service });
  } catch (error) {
    return res.status(500).json({ message: "Service creation failed", error: error.message });
  }
}

export async function myServices(req, res) {
  const services = await Service.find({ student: req.user._id }).sort({ createdAt: -1 });
  return res.json({ services });
}

export async function listServices(req, res) {
  const { skill } = req.query;
  const filter = { isActive: true };

  if (skill) {
    filter.skill = { $regex: skill, $options: "i" };
  }

  const services = await Service.find(filter)
    .populate("student", "fullName email phoneNumber studentProfile.collegeName studentProfile.course")
    .sort({ createdAt: -1 });

  return res.json({ services });
}

export async function serviceDetail(req, res) {
  const service = await Service.findById(req.params.id).populate(
    "student",
    "fullName email phoneNumber studentProfile.collegeName studentProfile.course studentProfile.profilePhotoUrl"
  );

  if (!service) {
    return res.status(404).json({ message: "Service not found" });
  }

  return res.json({ service });
}
