const app= require("./app ")
app.post("/user/data", (req, res) => {
  const { message } = req.body; // Use "message" instead of "data"

  if (!message) {
    return res.status(400).send("No message received!");
  }

  console.log("Received message:  ", message);

  res.redirect("/explain/ai"); // Redirect after processing
module.exports= message;


});
