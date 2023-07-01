////////////////////////
// Setup - Import deps and create app object
////////////////////////
require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
const fruitRouter = require('./controllers/fruitRoutes');
const userRouter = require('./controllers/user');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const app = express();



const PORT = process.env.PORT;

//////////////////////
// Declare Middleware
//////////////////////
app.use(morgan('dev'));
app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));
// sets up the ability to track if the user has authorization to access authorized routes
app.use(session({
    secret: process.env.SECRET,
    store: MongoStore.create({ mongoUrl: process.env.DATABASE_URL}),
    saveUninitialized: true, 
    resave: false,
}));
app.use('/fruit', fruitRouter);
app.use('/user', userRouter);



app.get('/', (req, res) => {
    res.render('index.ejs');
});


///////////////////////////
// Server Listener
///////////////////////////
app.listen(PORT, () => console.log(`app listening on port ${PORT}`));