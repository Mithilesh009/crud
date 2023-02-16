const express = require('express');
const app= express();
const bodyParser = require('body-parser')
const mysql = require('mysql2') 
const cors = require("cors")
const PORT = process.env.PORT || 3001
const path = require('path')
const HOST = process.env.HOST
const USER = process.env.USER
const PASSWORD = process.env.PASSWORD
const DATABASE = process.env.DATABASE




// const mysql = require('mysql2');


const db = mysql.createConnection({
    host:HOST,
    user: USER,
    password:PASSWORD,
    database:DATABASE
});


app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));

// const middlware = (req,res,next)=>{
//     console.log(`Hello My Middlware`)
//     return next();
// }


app.post("/create" ,(req,res)=>{
    console.log(req.body)
    const productName = req.body.productName;
    const seller = req.body.seller;
    const price = req.body.price;
    
    db.query('INSERT INTO selleritems (ProductName,seller,price) VALUES(?,?,?)',[productName,seller,price], (err,result)=>{
        if(err){
            console.log("error : ",err)
            
        }else{
            console.log("result : ",result)
            res.send("Values inserted")
        }
    })

})

app.get("/read" , (req,res)=>{
    const sqlGet= "SELECT * FROM selleritems";
    db.query(sqlGet,(err,result)=>{
        if(err){
            console.log('error : ',err)
        }else{
            console.log('result : ',result)
            res.send(result)
        }
    }) 


})


app.put('/update',(req,res)=>{
    const id= req.body.id;
    const productName= req.body.productName;
    const seller = req.body.seller;
    const price = req.body.price;
    db.query("UPDATE selleritems SET  ProductName = ? WHERE id = ? ", [productName,id],
    (err,result)=>{
        console.log("error :" ,err)
        // console.log("result :" ,result)
    }
    )
    db.query("UPDATE selleritems SET  seller = ? WHERE id = ? ", [seller,id],
    (err,result)=>{
        console.log("error :" ,err)
        // console.log("result :" ,result)
    }
    )
    db.query("UPDATE selleritems SET  price = ? WHERE id = ? ", [price,id],
    (err,result)=>{
        console.log("error :" ,err)
        // console.log("result :" ,result)
    }
    )
})

app.delete('/delete/:id',(req,res)=>{
    const id = req.params.id;
    db.query("DELETE FROM selleritems WHERE id=?",id,(err,result)=>{
        console.log("error :",err)
        console.log("result :",result)
    })
})



app.delete('/deleteAll',(req,res)=>{
    db.query("TRUNCATE TABLE selleritems ",(err,result)=>{
        console.log("error :",err)
        console.log("result :",result)
    })
})


app.use(express.static(path.join(__dirname, './client/build')))

app.get('*' , (req,res)=>{
    res.sendFile(path.join(__dirname , './client/build/index.html'))
});

app.listen(PORT , ()=>{
    console.log("Server is runing on port 3000")
})

