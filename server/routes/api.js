const express = require('express');
const mysql = require('mysql');
const router = express.Router();
const app = express();

//Create Connection
  // const corsOptions = {
  //   origin: 'http://localhost:4200',
  //   optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  // }

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'cta_db'
  });

  router.get('/product' ,(req, res) => {
    let sql = "SELECT * FROM product";
    let query = conn.query(sql, (err, results) => {
      if(err) throw err;
      res.json(200,{
        results: results
      });
    });
  });
  
  router.get('/service' ,(req, res) => {
    let sql = "SELECT * FROM service";
    let query = conn.query(sql, (err, results) => {
      if(err) throw err;
      res.json(200,{
        results: results
      });
    });
  });
  
  router.get('/product/:id', (req, res, next) => {
    let sql = "SELECT * FROM product WHERE product_id = '"+ req.params.id +"'";
  let sql2 = "SELECT * FROM product_image WHERE product_id = '"+ req.params.id +"'";
  let query = conn.query(sql, (err, product) => {
    let query = conn.query(sql2, (err, image) => {
    if(err) throw err;
    res.json(200,{
      product: product,
      image: image
    });
    });
  });
  });
  
  router.get('/product/limit/:num', (req, res, next) => {
    let num = req.params.num;
    let sql = "SELECT * FROM product LIMIT "+ num +"";
    let query = conn.query(sql, (err, results) => {
      if(err) throw err;
      res.json(200,{
        results: results
      });
    });
  });

  router.get('/product_page' ,(req, res) => {
    let sql = "SELECT * FROM product_page WHERE id = '99'";
    let query = conn.query(sql, (err, results) => {
      if(err) throw err;
      res.json(200,{
        results: results
      });
    });
  });
  
  router.get('/contact' ,(req, res) => {
    let sql = "SELECT * FROM contact_page WHERE id = '99'";
    let query = conn.query(sql, (err, results) => {
      if(err) throw err;
      res.json(200,{
        results: results
      });
    });
  });

  router.get('/index' ,(req, res) => {
    let sql = "SELECT * FROM index_page WHERE id = '99'";
    let query = conn.query(sql, (err, results) => {
      if(err) throw err;
      res.json(200,{
        results: results
      });
    });
  });

  router.get('/about' ,(req, res) => {
    let sql = "SELECT * FROM about_page WHERE id = '99'";
    let query = conn.query(sql, (err, results) => {
      if(err) throw err;
      res.json(200,{
        results: results
      });
    });
  });

  router.get('/service_page' ,(req, res) => {
    let sql = "SELECT * FROM service_page WHERE id = '99'";
    let query = conn.query(sql, (err, results) => {
      if(err) throw err;
      res.json(200,{
        results: results
      });
    });
  });
  router.post('/add_message' ,(req, res) => {
    let name = req.body.name;
    let email = req.body.email;
    let message = req.body.message;
    let data = {name: name, email: email, message: message};
    let sql = "INSERT INTO message SET ?";
    let query = conn.query(sql, data,(err, results) => {
      if(err) throw err;
      res.json(200,{
        message: 'berhasil'
      })
    });
  });
  module.exports = router;