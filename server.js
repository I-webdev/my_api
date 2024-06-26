import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("Public"));

app.get("/", async(req, res)=>{
try{
    const response = await axios.get("http://localhost:3100/motivation");
    res.render("index.ejs", {result: response.data});
}catch(error){
    res.status(500).send("This page can not be rendered.");
}
});

app.get("/:_id", async(req, res)=>{
       
    try{
        const response = await axios.get("http://localhost:3100/motivate");
        const id = parseInt(req.params._id);
    console.log(id);
    const foundJoke = response.data.find((motivation)=>motivation._id === id);
    
        res.render("index.ejs", {result: foundJoke});
    }catch(error){
        res.status(500).send("This page can not be rendered.");
    }
    });




app.listen(port, ()=>{
    console.log(`This app is running of https://localhost:${port}.`);
})