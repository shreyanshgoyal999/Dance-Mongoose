const express = require("express")
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/contactDance', {useNewUrlParser: true, useUnifiedTopology: true});
                                    // Database name                              


const app = express();
app.use(express.urlencoded()) // body parser , we can also import body-parser instead of this

const port = process.env.PORT || 8003;
const hostname = "127.0.0.1";

const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    concern: String
});

const Contact = mongoose.model("Contacts",contactSchema)


// To serve static files
app.use('/static',express.static("static"))

// Setting Pug as view engine
app.set("view engine","pug")
app.set("views","./views")


app.get("/",(req,res)=>{
   
    res.status(200).render("home.pug");
})

app.get("/contact",(req,res)=>{
   
    res.status(200).render("contactform.pug");
})

// Sending Form Data to database
app.post("/contact",(req,res)=>{
    let formData = new Contact(req.body)

    formData.save((err,data)=>{
        if(err) return console.error(err);
        else {
            console.log("Form Data Saved in Database")
            res.send("Form Submitted !!")
            }
    })
    
})

app.listen(port,()=>{
    console.log("Running At Port 8003");
})