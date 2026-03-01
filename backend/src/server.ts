import "reflect-metadata";
import app from "./app";
import { AppDataSource } from "./infrastructure/database/data-source";

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  let retries = 5;
  while (retries > 0) {
    try {
      await AppDataSource.initialize();
      console.log("Database connection established.");

      app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
      });
      break;
    } catch (error) {
      console.error("Error during Data Source initialization:", error);
      retries -= 1;
      console.log(`Retries left: ${retries}, waiting 5 seconds...`);
      await new Promise((res) => setTimeout(res, 5000));
      if (retries === 0) process.exit(1);
    }
  }
};

startServer();
