const express = require("express")
const app = express();
const cors = require("cors")
const port = 3000

//Database
const sequelize = require("./db/connection")
sequelize.sync().then(()=>console.log("database synced"))
app.use(cors())
app.use(express.json())
app.get("/",(req,res)=>{
    return res.send("Tech Erudite Mern project")
})

//User routes
const UserRoute = require("./app/router/user.route")
app.use("/user",UserRoute);

app.listen(port,()=>console.log(`Listening to server ${port}`))