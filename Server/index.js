const mongoose = require('mongoose');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path= require('path');
const cors= require('cors');

const config = require('config');

const designRoutes = require('./routes/designRoutes');

mongoose.connect(config.get('db') , { useNewUrlParser: true ,useUnifiedTopology: true })
    .then(() => console.log(`Connected to ${config.get('db')}`))
    .catch(err =>  console.error('Could not connect to mongodb'));

mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

app.set("view engine", "ejs");

app.use(cors());

app.use(express.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}));

app.use('/design' , designRoutes);

if(process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../Client/build')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname ,'..','Client','build','index.html'));
    }); 
}
else{
    app.use(express.static(path.join(__dirname, '../Client/public')));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname+'/../Client/public/index.html'));
    });
}



const port=process.env.PORT || 8000 ;
console.log(port);
const server = app.listen(port, ()=> console.log(`Listening on port ${port}...`));
var env = process.env.NODE_ENV || 'development';
console.log(env);