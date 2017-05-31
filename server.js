const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const mongoURI = 'mongodb://heroku_s0jdcxjc:jhu1kbd1sb862og3aac5ehi2mf@ds019038.mlab.com:19038/heroku_s0jdcxjc';
const localMongo = 'mongodb://localhost/nytreact';

const localPORT = 3001;

app.set('port', (process.env.PORT || localPORT));

mongoose.connect(mongoURI /*localMongo*/ );

let schema = mongoose.Schema;

let articleSchema = new schema({
  author: {
    type: String,
    trim: true,
    required: "author is not required" 
  },
  heading : { 
    type : String,
    trim : true,
    required : "heading is not required"
  },
  weblink : {
    type: String,
    default : 'https://www.google.com',
    trim : true,
    required : "Weblink is Required"
  },
  pubDate : {
    type : String,
    trim : false,
    required : "Date is not Required"
  }
});

let article = mongoose.model('article',articleSchema);

app.use(express.static(path.join(__dirname,'build')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.get('/api/saved/', function(req,res){
  // mongoose query saved articles
  article.find({},(err,doc) => {
    if(err){
      res.send(err); 
      console.log(err);
    } else {
      console.log(doc);
      res.send(doc);
    }
  });
});

app.post('/api/saved/', function(req,res){ // mongoose save an article 
  let incoming = req.body; 
  article.create(incoming)
  .then((doc) => res.json(doc))
  .catch((err) => console.log(err));

});

// passing in the weblink
app.delete('/api/saved/', function(req,res){
  // mongoose delete article
  article.findOneAndRemove({weblink: req.query.weblink},(err)=>{
    if (err) {console.log("error deleting doc ",err);}
  })
  .then((doc)=>{
    res.json(doc);
  })

});

app.get('*', function(req,res){
  res.sendFile(path.join(__dirname,'build','index.html'));
});

app.listen(app.get('port'),function(){
  console.log("Express server started on port",app.get('port'));
})