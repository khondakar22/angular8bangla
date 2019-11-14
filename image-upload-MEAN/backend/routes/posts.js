const express = require('express'); 
const router = express.Router();
const Post = require('../models/post');
const multer = require('multer');

const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg'
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error('Invalid mime type');
    if(isValid) {
      error = null; 
    }
    cb(null, "backend/images");
  }, 
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(' ').join('-');
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + '_' + Date.now() + '.' + ext);
  }
})
router.post('', multer({storage: storage}).single('image'), (req, res, next) => {
  const url = req.protocol + '://' + req.get('host');
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    imagePath: url + '/images/' + req.file.filename
  });
  console.log(post);
  post.save().then(createdPostId => {
    res.status(201).json({
      message: 'The New Post is added sucessfully!',
      post: {
        ...createdPostId,
        id: createdPostId._id,
      }
    });
  });
});

router.put('/:id', (req, res, next) => {
  const post = new Post({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content
  });
  Post.updateOne({_id: req.params.id}, post ).then(result => {
    console.log(result);
    res.status(200).json({message: 'Update Sucessfull'})
  })
})

router.get('', (req, res, next) => {
  Post.find().then(documents => {
    console.log(documents);
    res.status(200).json({
      message: 'Posts fetched succesfully!',
      posts: documents,
    });
  });
});
router.get('/:id', (req, res, next) => {
  Post.findById(req.params.id).then(post => {
    console.log(post);
    if(post){
      res.status(200).json(post);
    }else {
      res.status(404).json({})
    }
   
  });
});
router.delete('/:id', (req, res, next) => {
  console.log(req.params.id);
  Post.deleteOne({_id: req.params.id}).then(result => {
    console.log(result);
    res.status(200).json({message: 'Message deleted'});
  })
});

module.exports = router;