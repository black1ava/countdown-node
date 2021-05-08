const express = require('express');

const app = express();
app.use('/', express.static('public'));
app.use('/assets', express.static('assets'));
app.use('/resource', express.static('resource'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, function(){
  console.log(`Server is running on port ${ PORT }`);
});