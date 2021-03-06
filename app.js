const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blogs')
//express app
const app = express();

// connect to MongoDB
const dbURI = 'mongodb+srv://PhiliciaWatson:Wangxian@123@node-tuts.lvjko.mongodb.net/node-tuts?retryWrites=true&w=majority'
mongoose.connect(dbURI, { useNewUrlParser:true, useUnifiedTopology:true }).then((result) => console.log('connected to db')).catch((err) => console.log(err));

//listen for requests
app.listen(3000);

// app.use((req, res) => {
//   console.log('new request made')
// })

// register view engine
app.set('view engine','ejs');

// for morgan and middleware & static files
app.use(express.static('public'));
app.use(morgan('dev'));

// mongoose and mongo sandbox routes
app.get('/add-blog', (req,res) => {
  //sends us back to Schema document
  const blog = new Blog({
    title: 'new blog',
    snippet: 'about my new blog',
    body: 'more about my new blog'
  });
  blog.save()
  .then((result) =>{
    res.send(result)
  })
  .catch((err) =>{
    console.log(err);
  });
});

app.get('/all-blogs', (req,res) => {
  //sends us back to Schema document
  Blog.find()
  .then((result) =>{
    res.send(result);
  })
  .catch((err) =>{
    console.log(err);
  });
});

app.get('/single-blog',(req,res) =>{
  Blog.findById()
})




const blogs = [
    {title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    {title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    {title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur'},
  ];

//   app.use((req, res, next) => {
//     console.log('in the next middleware');
//      next();
//    });

//   app.use((req, res, next) => {
//     console.log('new request made:');
//     console.log('host: ', req.hostname);
//     console.log('path: ', req.path);
//     console.log('method: ', req.method);
//     next();
//   });
   

app.get('/', (req,res) => {
    res.render('index', { title: 'Home', blogs });
});

app.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
});

app.get('/blogs/create', (req, res) => {
    res.render('create', { title: 'Create a new blog' });
});

// 404 page
app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
  });
  

// app.get('/', (req,res) => {
//     res.sendFile('./views/index.html',{root:__dirname});
// });

// app.get('/about', (req,res) => {
//     res.sendFile('./views/about.html',{root:__dirname});
// })  

//redirect

// app.get('/about-us', (req,res) => {
//     res.redirect('/about');
// })  

//404 page

// app.use( (req,res) => {
//     res.status(404).sendFile('./views/404.html',{ root:__dirname });
// })

