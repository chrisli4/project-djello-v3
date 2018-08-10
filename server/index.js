// app.js

// express ====================================================================
const express = require('express');
const app 	  = express();

// socket.io
const http = require('http').createServer(app);
const io = require('socket.io')(http);

io.on('connection', (socket) => {
  socket.on('userConnected', socket.join)
  socket.on('userDisconnected', socket.leave)
})

app.set('socketIo', io);

const config = require('./config/main')
// mongoose ===================================================================
const mongoose = require('mongoose');
mongoose.connect(config.database, { useNewUrlParser: true });

// logging ====================================================================
/*
const logger = require('morgan');
const morganToolkit = require('morgan-toolkit')(logger);
app.use(morganToolkit());
*/

// body parser ================================================================
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// enable CORS from client-side ===============================================

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Cache-Control, Pragma');

  // intercept OPTIONS method
  if (req.method === 'OPTIONS') {
    res.sendStatus(204);
  } else {
    next();
  }
})

// passport ===================================================================
const passport = require('passport');
const passportService = require('./config/passport');
const requireAuth = passport.authenticate('jwt', { session: false });
const requireLogin = passport.authenticate('local', { session: false });


// router =====================================================================
const authController = require('./routes/authRouter')
const userRouter = require('./routes/userRouter');

app.post('/register', authController.register);
app.post('/login', requireLogin, authController.login);
app.use('/users', requireAuth, userRouter);

// server  ====================================================================
app.set('port', (process.env.PORT || 3001));
http.listen(app.get('port'), () => {
	console.log(`Find the server at ${app.get('port')}`);
});
