const express = require('express');
const User = require('./controllers/user');
const errorMiddleware = require('./middlewares/errorMiddleware');
const { validatePayload } = require('./middlewares/login');
const userRouter = require('./routes/user');
const categoryRouter = require('./routes/category');
const blogPostRouter = require('./routes/blogPost');

// ...

const app = express();

app.use(express.json());

app.post('/login', validatePayload, User.login);

app.use('/user', userRouter);

app.use('/categories', categoryRouter);

app.use('/post', blogPostRouter);

app.use(errorMiddleware);

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
