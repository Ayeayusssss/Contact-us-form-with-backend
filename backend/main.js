const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mysql = require('mysql2')
const cors= require('cors')

app.use(cors())
app.use(bodyParser.json());

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'contact'
  });
pool.getConnection((err,succ)=>{
    if (err) throw err
else{
    console.log('connection sucessful');
}
})

app.get('/contact', (req, res) => {
    const sql = 'SELECT * FROM contactinfo';
  
    pool.query(sql, (error, results) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
      }
  
      res.json(results);
    });
  });
  

  app.post('/contactinfo', (req, res) => {
    const { name, email, subject, message } = req.body;
    console.log(req.body);
    const sql = 'INSERT INTO contactinfo (name, email, subject, message) VALUES (?, ?, ?, ?)';
    pool.query(sql, [name, email, subject, message], (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error inserting data into database');
      } else {
        res.send('Data inserted into database');
      }
    });
  });


 app.get('/',(req,res)=>{
    res.send('hi')
 })
 app.listen(8080,()=>{
    console.log('started');
 })