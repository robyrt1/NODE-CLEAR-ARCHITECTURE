import dotenv from "dotenv";
import { expressConfig } from "./express";

dotenv.config();
const port: number = Number(process.env.PORT) || 3001;

expressConfig.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
