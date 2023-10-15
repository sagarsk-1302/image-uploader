const express = require("express");
var cors = require('cors')

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors())



// Post Req Body Check
app.post("/api", function (req, res, next) {
    if (Object.keys(req.body).length === 0) {
        res.status(400).json({
            Status: {
                ResponseCode: 400,
                ResponseMessage: "Bad Request!",
            }
        });
    } else {
        next();
    }
});



app.use("/api/upload-image", require("./image_uploader/index.js"))


//test the api
app.get("/api/", (req, res) => {
    res.status(200).send("API IS RUNNING!");
});

app.use('/',(req, res) => {
    res.status(200).send("Welcome to Exchange Rate Portal !!");
});


//create server on the port 5000
const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));