const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const authorRouter = require("./routes/author");
const bookRouter = require("./routes/book");

dotenv.config();

//connect to db
mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.log(err);
});

const app = express();

app.use(bodyParser.json({
    limit: "50mb"
}));
app.use(cors());
app.use(morgan("common"));

//Routes
app.use("/v1/author", authorRouter);
app.use("/v1/book", bookRouter);

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
