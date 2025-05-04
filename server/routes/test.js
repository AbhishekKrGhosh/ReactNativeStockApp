import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  console.log("📥 /api/test was called");
  res.json({ message: "Test API hit" });
});

export default router;
