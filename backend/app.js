const {app, express} = require("./server")
const mongoose = require("mongoose");
const ExpressError = require("./util/ExpressError");
const cors = require("cors");


mongoose.connect("mongodb:mongodb:27017/new-docker-db").then(()=>{
    console.log("Database connected Success");
}).catch((e)=>{
    console.log("Error while connecting to database", e);
})

const PORT  = 5000 

app.use(express.urlencoded({extended:true}));
app.use(express.json())
app.use(cors());

const musicRouter = require("./router/musicRouter");

app.use("/music", musicRouter);

app.all("*", function (req, res, next) {
    next(ExpressError("Page not found", 404));
  });
  
  app.use(function (err, req, res, next) {
    const { status = 500 } = err;
    if (!err.message) {
      err.message = "Something went wrong";
    }
    res
      .json({
        msg: err.type,
      })
      .status(status);
  });


app.listen(PORT, ()=>{
    console.log(`Listening on port ${PORT}`);
})