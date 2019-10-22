const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Post = require('./models/post');

const app = express();

mongoose
  .connect(
    'mongodb+srv://Riyad:NcW10RUkhAvz0Ulr@cluster0-j0dbz.mongodb.net/node-angular?retryWrites=true&w=majority',
  )
  .then(() => {
    console.log('Connected to Database!');
  })
  .catch(() => {
    console.log('There is erorr');
  });

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept',
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, DELETE, OPTIONS',
  );
  next();
});

app.post('/api/posts', (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
  });
  console.log(post);
  post.save().then(createdPostId => {
    res.status(201).json({
      message: 'The New Post is added sucessfully!',
      postId: createdPostId._id
    });
  });
});

app.get('/api/posts', (req, res, next) => {
  Post.find().then(documents => {
    console.log(documents);
    res.status(200).json({
      message: 'Posts fetched succesfully!',
      posts: documents,
    });
  });
});

app.delete('/api/posts/:id', (req, res, next) => {
  console.log(req.params.id);
  Post.deleteOne({_id: req.params.id}).then(result => {
    console.log(result);
    res.status(200).json({message: 'Message deleted'});
  })
});

module.exports = app;
