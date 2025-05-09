import "dotenv/config";

import app from "./app.js";

import { connectDB } from "./src/config/db.config.js";

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
};

startServer();
