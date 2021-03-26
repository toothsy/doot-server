const express = require('express');
const cors = require('cors');
const app = express();
const saltRounds = 5
let userData = [
    {
        username:"chris",
        password:"abcde"
    },
    {
        username:"raju",
        password:"abcde"
    }
]
const verify = (req, res) =>{
    console.log(req.body);
    let username = req.body.username
    let password = req.body.password
    let flag =  userData.some(user=>user.username === username&&user.password === password )
    console.log(flag)
    flag? res.status(200).send(true): res.send(false).status(200)     
                }
const register = (req, res) =>{
    // let username = req.body.username
    // let password = req.body.password
    console.log(req.body);
    userData.push(req.body)
    console.log(userData)
    res.status(200).send(true)
}        
const port = 5000  ||  process.env.PORT;
app.use(cors())
app.use(express.json({ extended: false }) );
app.post('/login',verify)
app.post('/register', register)
app.get('/', (req, res) =>res.send("prolly not suposed to see this"))
app.listen(port,()=>{console.log("server is running on port " + port)})


const plainTextPSWD = "abcde"