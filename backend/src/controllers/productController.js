import { Product } from "../models/Product.js";

function uploadedImages(files = []) {
  return files.map((file) => `/uploads/${file.filename}`);
}

export async function createProduct(req, res) {
  try {
    const product = await Product.create({
      seller: req.user._id,
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      images: uploadedImages(req.files),
      isSelfMade: true
    });

    return res.status(201).json({ product });
  } catch (error) {
    return res.status(500).json({ message: "Product creation failed", error: error.message });
  }
}

export async function myProducts(req, res) {
  const products = await Product.find({ seller: req.user._id }).sort({ createdAt: -1 });
  return res.json({ products });
}

export async function listProducts(req, res) {
  const { q, category } = req.query;
  const filter = { isActive: true };

  if (q) {
    filter.$or = [
      { title: { $regex: q, $options: "i" } },
      { description: { $regex: q, $options: "i" } }
    ];
  }

  if (category) {
    filter.category = category;
  }

  const products = await Product.find(filter)
    .populate("seller", "fullName email phoneNumber studentProfile.collegeName")
    .sort({ createdAt: -1 });

  return res.json({ products });
}

export async function productDetail(req, res) {
  const product = await Product.findById(req.params.id).populate(
    "seller",
    "fullName email phoneNumber studentProfile.collegeName"
  );

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  return res.json({ product });
}
