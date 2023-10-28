import { app } from "./server/index.js";
import "dotenv/config";

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`app listening on port ${port}`));
