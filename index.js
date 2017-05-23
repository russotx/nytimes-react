const express = require('express');
const app = express();

app.set('port', (process.env.PORT || 3000));

app.use(express.state(__dirname + '/build/index.html'));

app.get('*', function(req,res){
  res.sendFile(__dirname+'/build/index.html');
});

app.listen(app.get('port'),function(){
  console.log("Express server started on port",app.get('port'));
})