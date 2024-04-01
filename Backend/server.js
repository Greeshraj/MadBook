const express = require('express'); 
const Razorpay = require('razorpay');
const cors = require('cors');
const mongoose = require('mongoose');
const crypto = require("crypto");
require('dotenv').config();
 

const app = express();
const port = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());
// app.use(express.urlencoded())
app.use(express.text());


const uri = process.env.ATLAS_URI ;
const options = {
    useNewUrlParser: true,
    //   useCreateIndex: true,
    useUnifiedTopology: true,
}

mongoose
    .connect(uri, options)
    .then(() => {
        console.log('MongoDB Connected')
    })
    .catch((err) => console.log(err))





const signinRouter = require('./routes/signin');
const signupRouter = require('./routes/signup');
const usersRouter = require('./routes/user');
const subjectRouter = require('./routes/subject')
const pdfRouter  = require('./routes/pdf')

app.use('/signup', signupRouter);
app.use('/signin', signinRouter);
app.use('/user', usersRouter);
app.use('/subject',subjectRouter);
app.use('/pdf',pdfRouter);


app.post("/order", (req, res) => {
    console.log("we are in the order",req.body);
    try {
      const razorpay = new Razorpay({
        key_id: process.env.KEY_ID,
        key_secret: process.env.KEY_SECRET 
      });

      const options = req.body;
      const order = razorpay.orders.create(options);
  
      if (!order) {
        return res.status(500).send("Error");
      }
  
      res.json(order);
    } catch (err) {
      console.log(err);
      res.status(500).send("Error");
    }
  });
  app.post("/order/validate", async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;
  
    const sha = crypto.createHmac("sha256", process.env.KEY_SECRET);
    //order_id + "|" + razorpay_payment_id
    sha.update(`${razorpay_order_id}|${razorpay_payment_id}`);
    const digest = sha.digest("hex");
    if (digest !== razorpay_signature) {
      return res.status(400).json({ msg: "Transaction is not legit!" });
    }
  
    res.json({
      msg: "success",
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
    });
  });  

app.use((error, req, res, next) => {
    console.log('Error', error)
    return res.status(error.statusCode).json({ message: error.message })
})
app.listen(port, (err) => {
    console.log(`Server is running on the port: of the ${port}`);
    if (err) console.log(err)
})
