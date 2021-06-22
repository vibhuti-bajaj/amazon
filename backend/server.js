import express from 'express'
import data from './data.js';
const app=express();

app.use('/api/products',(req,res)=>{
    res.send(data.products)
})

app.use('/',(req,res)=>{
    res.send("server ready")
})
const port=process.env.PORT||5000;
app.listen(5000,()=>{
    console.log(`Serve at https://localhost:${port}`);
})