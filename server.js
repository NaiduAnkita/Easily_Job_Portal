import app from "./index.js";
import dotenv from "dotenv";
dotenv.config();

app.listen(3200, () => {
  console.log("server is listening on 3200");
});
