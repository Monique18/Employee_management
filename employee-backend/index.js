import express from "express"
import bodyParser from "body-parser"
import cors from "cors"
import dotenv from "dotenv"
import employeeRoute from "./routes/employee.js"

dotenv.config()

const app = express()  //simplifies the creation of an api
const PORT = process.env.PORT || 3000;
const corsOptions = {
    origin: "*"
}

app.use(cors(corsOptions));
app.use(bodyParser.json())

//creating the route

app.use("/api/employee",employeeRoute);

//middleware to handle my app
app.use(function(req,res){
   res.status(404).json({error:"Not Found!"});
});

app.use((err,req,res,next) => {
    const statusCode = err.StatusCode  || 500;
    const message = err.message || "Internal server error";
    return res.status(statusCode).json({error: message});
})

app.listen(PORT,() => {
    console.log(`Listening on port ${PORT}`);
});


