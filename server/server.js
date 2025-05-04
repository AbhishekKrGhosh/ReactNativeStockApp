import express from "express";
import cors from "cors";
import stockRoutes from "./routes/stocks.js";
import testRoutes from "./routes/test.js";
import axios from "axios";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/api/stocks", stockRoutes);
app.use("/api/test", testRoutes);

setInterval(async () => {
  try {
    const res = await axios.get(`https://reactnativestockapp.onrender.com/api/test`);
    console.log("✅ Internal /api/test call response:", res.data);
  } catch (err) {
    console.error("❌ Error calling /api/test:", err.message);
  }
}, 300000);

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
