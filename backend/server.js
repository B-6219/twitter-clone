import exress from 'express';

const app = exress();
const PORT = 5000;

app.get('/',(req,res) =>{
    res.send("Server is Ready")
})

app.listen(PORT || 8000 ,() => {
    console.log("Server is Running Sucessfully");   
})