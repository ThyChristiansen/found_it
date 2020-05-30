
const express = require('express');
require('dotenv').config();

const app = express();
const bodyParser = require('body-parser');
const sessionMiddleware = require('./modules/session-middleware');

const passport = require('./strategies/user.strategy');


// Route includes
const userRouter = require('./routes/user.router');
const boxRouter = require('./routes/box.router');
const itemRouter = require('./routes/item.router');
const roomRouter = require('./routes/room.router');
const roomNameRouter = require('./routes/roomName.router');
const searchRouter = require('./routes/search.router');



// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);
app.use('/api/room', roomRouter);
app.use('/api/box', boxRouter);
app.use('/api/item', itemRouter);
app.use('/api/roomName', roomNameRouter);
app.use('/api/search', searchRouter);




// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
