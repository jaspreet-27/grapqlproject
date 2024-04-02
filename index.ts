import { PORT } from "./env";
import App from "./app";
import { config } from "dotenv";


try {
    const result: any = config();
    if (result && result.parsed) {
      Object.keys(result.parsed).forEach((key) => {
        process.env[key] = result.parsed[key];
      });
    }
  } catch (e) {
    console.log(".env file not found, skipping..");
  }
  new App(Number(PORT)).listen();