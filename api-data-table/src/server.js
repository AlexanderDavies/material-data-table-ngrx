const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const { setOriginHeaders } = require("./middleware/cross-origin");
const { normalizePort } = require("./utils/normalize-port");
const { handleErrors } = require("./middleware/error");
const userRoutes = require("./routes/user");
const { handleUnknownRoute } = require("./middleware/unknown-route");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

//parse http stream
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//allow cross origin headers
app.use(setOriginHeaders);

//user route
app.use("/user", userRoutes);

//centralised error handling
app.use(handleErrors);

//handle unknown routes
app.use(handleUnknownRoute);

//connect to db
mongoose.connect(
  `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PWRD}@${process.env.MONGO_DB}`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

//ensure the port environment variable is valid
const port = normalizePort(process.env.PORT);

//start server - here
const server = app.listen(port || 3000, () => {
  console.log(`listening on: ${server.address().port}`);
});

module.exports = server;
