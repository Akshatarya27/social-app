// const express = require('express');
// const bodyParser = require('body-parser');
// const db = require('./db');
// const userRoutes = require('./routes/users');
// const postRoutes = require('./routes/posts');

// const app = express();
// const port = process.env.PORT || 3000;

// app.use(bodyParser.json());

// app.use('/api/users', userRoutes);
// app.use('/api/posts', postRoutes);

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });


const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const db = require('./db');
const userRoutes = require('./routes/users');
const postRoutes = require('./routes/posts');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);

app.get('/',(res,req)=>{
  res.send('HI WELCOME TO DAILY BUFFER TO HEROKU')

})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
