import "dotenv/config";
import {app} from "./src/app.js";

const PORT = process.env.PORT || 4000;

app.on("error", (err) => {
  console.log(err)
})

app.listen(PORT, () => {
  console.log("server running", PORT)
})
