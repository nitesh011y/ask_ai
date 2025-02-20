const express= require("express")
const app= express()


app.use(express.static(path.join(__dirname, 'public')));
app.set("view engine","ejs")
module.exports= app;