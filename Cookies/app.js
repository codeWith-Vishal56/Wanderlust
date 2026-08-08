const express = require('express');

const app = express();
const port = 8080;
const cookieParser = require('cookie-parser');

app.use(cookieParser("SecretCode"));

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
 
app.get("/setsignedcookies",(req,res)=> {
  res.cookie("made-in" , "india" , {signed:true});
  res.send("cookies received");
});


app.get("/getsignedcookies",(req,res)=> {
  console.log(req.signedCookies);
  res.send("cookies printed");
});
