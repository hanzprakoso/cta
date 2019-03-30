//use path module
const path = require('path');
//use express module
const express = require('express');
//use hbs view engine
const hbs = require('hbs');
var HandlebarsIntl = require('handlebars-intl');
HandlebarsIntl.registerWith(hbs);
//use bodyParser middleware
const bodyParser = require('body-parser');
//use mysql database
const mysql = require('mysql');
//date
const moment = require('moment');
//random 
const uniqid = require('uniqid');

//auth
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
//image process
const fileUpload = require('express-fileupload');
const busboy = require('connect-busboy');
const morgan = require('morgan');
const api = require('./routes/api');
const app = express();
const cors = require('cors');

//Create Connection
const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'cta_db'
});

//connect to database
conn.connect((err) =>{
  if(err) throw err;
  console.log('Mysql Connected...');
});

//set views file
app.set('views',path.join(__dirname,'views'));
//set view engine
app.set('view engine', 'hbs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(fileUpload());
app.use(busboy());
app.use(morgan('dev'));
app.use(cors())
//set folder public as static folder for static file
app.use('/assets',express.static(__dirname + '/public'));
app.use('/products', express.static(path.join(__dirname, 'dist')));
app.use('/api', api);
//express-session configuration
app.use(require('express-session')(
  { secret: 'keyboard cat', resave: false, saveUninitialized: false })
);
//passport
app.use(passport.initialize());
app.use(passport.session());

//auth
passport.use(new LocalStrategy(
  function(username, password, done) {
    conn.query('SELECT * FROM users WHERE username = ? and password = ?', 
    [username, password], function(err, rows, fields) {
      if(err) return done(err);
  
      // if user not found
      if (rows.length <= 0) {
        return done('Incorrect username or password.');
      } 
      return done(null, rows[0]);
    });
  }
));

passport.serializeUser(function(user, done) {
  done(null, user.username);
});

passport.deserializeUser(function(username, done) {
  conn.query('SELECT * FROM users WHERE username = ?', [username], function(err, user) {
    if(err) return done(err);
    done(null, user);
  });
});

 const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated())
    return next();
  res.redirect('/login');
}

//route for login
app.get('/login',
  function(req, res){
    res.render('login');
  }
);

app.post('/login', 
  passport.authenticate('local', { 
    successRedirect: '/',
    failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
});

//route for homepage
app.get('/', isAuthenticated,(req, res) => {
  let sql = "SELECT * FROM product";
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.render('product_view',{
      results: results
    });
  });
});

//route detail produk
app.get('/detail/:id',(req, res) => {
  let sql = "SELECT * FROM product WHERE product_id = '"+ req.params.id +"'";
  let sql2 = "SELECT * FROM product_image WHERE product_id = '"+ req.params.id +"'";
  let query = conn.query(sql, (err, product) => {
    let query = conn.query(sql2, (err, image) => {
    if(err) throw err;
    res.render('detail',{
      product: product,
      image: image
    });
    });
  });
});

//route tambah gambar
app.post('/tambah_gambar',(req, res) => {
  let id = req.body.id;
  let date = moment().format('YYYYMMDD');
  let img_id = uniqid.time();
  let image = req.files.image;
  image.mv('./public/img/product/'+img_id+'_'+image.name);

  let data = {img_id: img_id, product_id: id, img: img_id+'_'+image.name, note: req.body.note};
  let sql = "INSERT INTO product_image SET ?";
  let query = conn.query(sql, data,(err, results) => {
    if(err) throw err;
    res.redirect("/detail/"+ id +"");
  });
});

//route for insert data
app.post('/save',(req, res) => {
  let id = uniqid();
  let date = moment().format('YYYYMMDD');
  let img_id = uniqid.time();
  let image = req.files.image;
  image.mv('./public/img/product/'+img_id+'_'+image.name);

  let data = {product_id: id, product_name: req.body.product_name, product_description: req.body.product_description, image: img_id+'_'+image.name,  product_price: req.body.product_price};
  let sql = "INSERT INTO product SET ?";
  let query = conn.query(sql, data,(err, results) => {
    if(err) throw err;
    res.redirect('/');
  });
});

//route for update data
app.post('/update',(req, res) => {
  let sql = "UPDATE product SET product_name='"+req.body.product_name+"', product_description='"+req.body.product_description+"', product_price='"+req.body.product_price+"', image='"+req.body.image+"' WHERE product_id="+req.body.id;
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.redirect('/');
  });
});

//route for delete data
app.post('/delete',(req, res) => {
  let sql = "DELETE FROM product WHERE product_id="+req.body.product_id+"";
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
      res.redirect('/');
  });
});
//route for delete data
app.post('/delete_img',(req, res) => {
  let id = req.body.id;
  let p_id = req.body.p_id;
  let sql = "DELETE FROM product_image WHERE img_id='"+id+"'";
  let query = conn.query(sql, (err, results) => {
   if(err) throw err;
      res.redirect("/detail/"+ p_id +"");
  });
});

//server listening
app.listen(8000, () => {
  console.log('Server is running at port 8000');
});

hbs.registerHelper("inc", function(value, options)
{
    return parseInt(value) + 1;
});