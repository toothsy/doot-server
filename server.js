const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const mailgun = require('nodemailer-mailgun-transport');



const app = express();
app.use(cors());
const port = process.env.PORT||5000;
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

const email = (req, res) =>{

    let {email,subject,message} = req.body

    const auth = {
        auth:{
            api_key: "0ee89c4d07c709edbe959f3759044e1d-a09d6718-577dab70",
            domain:"sandbox1ef2b3c7472046ec8830b6acf1818a57.mailgun.org"
        }
    }
    const transporter = nodemailer.createTransport(mailgun(auth))
    const mailOptions = {
        from:email,
        to:"c.j.atharva@gmail.com",
        text:message,
        subject:subject
    }
    console.log(req.body)
    transporter.sendMail(mailOptions,(err,data) => {
        if(err){
            console.log("\n\n\n\n error is here ",err)
            res.status(500).json({message:"something wong"})
        }
        else
        console.log("\n\n\n\n data is here ",data)
        res.status(200).json({message:"all good"})



    })
}
app.use(express.json({ extended: false }) );
app.post('/login',verify)
app.post('/register', register)
app.post('/email', email)
app.get('/', (req, res) =>res.send("nooo dont come here"))
app.listen(port,()=>{console.log("server is running on port " + port)})
