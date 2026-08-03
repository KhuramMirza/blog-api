import app from "./src/app.js";
import connectDB from "./config/db.js";

const PORT = process.env.PORT || 8000;

await connectDB();
app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
