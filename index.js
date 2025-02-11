import 'dotenv/config';

import express from 'express';

import router from './app/router.js';

import session from 'express-session';


const PORT = process.env.PORT || 3000;

const app = express();

app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: "Guess it!",
    cookie: {
      secure: false,
      maxAge: (1000*60*60) // ça fait une heure
    }
  }));

app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.set('view engine', 'ejs');

app.set('views', './app/views');

app.use(router);

app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
  });
