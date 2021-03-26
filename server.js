const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
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
    let username = req.body.username
    let password = req.body.password
    let flag =  userData.some(user=>user.username === username&&user.password === password )
    flag? res.status(200).send(true): res.send(false).status(200)     
                }
const register = (req, res) =>{
    userData.push(req.body)
    res.status(200).send(true)
}        
const port = process.env.PORT||5000;
app.use(express.json({ extended: false }) );
app.post('/login',verify)
app.post('/register', register)
app.get('/', (req, res) =>res.send("nooo dont come here"))
app.listen(port,()=>{console.log("server is running on port " + port)})
