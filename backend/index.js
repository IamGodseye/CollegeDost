const express = require('express');
const app = express();
const Connection = require('./connection/connectDatabase');
const cors = require('cors');
const bodyparser = require('body-parser');
const morgan = require('morgan');
app.use(morgan('dev'))


const dotenv = require('dotenv');
dotenv.config();


app.use(cors());
app.use(express.json());
app.use(bodyparser({extended:true}));
require('./models/allPosts');
require('./models/universityPosts');
require('./models/user');
require('./models/Resources');
require('./models/universitydata');
require('./models/hashtagPost');
require('./models/AdminPosts');
require('./models/hashTagUniv');
// require('./models/Message');
require('./models/Allcomments');
require('./models/UnivComments');
app.use(require('./routes/routes'));


Connection();


const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log("Listening To The Server");
})