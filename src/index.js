import "dotenv/config";
import express from "express";
import route from "./routes/index.js";
import connectDb from "./configs/db.js";
import bodyParser from "body-parser";
import { engine } from "express-handlebars";
import morgan from "morgan";
import methodOverride from 'method-override';
import path from 'path';
import {fileURLToPath} from 'url';
const PORT = 3000;


connectDb();
const app = express();

// override with POST having ?_method=DELETE
app.use(methodOverride('_method'))

//template engine
// set .handlebars to .hbs
app.engine(
  '.hbs',
  engine({
    extname: ".hbs", 
  }),
); 
app.set("view engine", ".hbs");
const __filename = fileURLToPath(import.meta.url);
// 👇️ "/home/john/Desktop/javascript"
const __dirname = path.dirname(__filename);
app.set("views", path.join(__dirname, "resources", "views"));
app.use(morgan('combined'))
// parse application/json
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));


route(app);

app.listen(PORT, () => {
  console.log(`\nlistening on ${PORT}, http://localhost:${PORT}`);
});
