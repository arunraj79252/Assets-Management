const express = require('express');
const handleErrors = require('./middlewares/handle-errors.middleware');
const authRouter = require('./routes/google-auth.routes');
const userRouter = require('./routes/user.routes');
const categoryAttributeRouter = require('./routes/category-attribute.routes');
const categoryRouter = require('./routes/category.routes')
const app = require("./server");
const cors = require('cors');
const dotenv = require('dotenv');
const { NotFound } = require('./utils/errors');
const assetRouter = require('./routes/asset.routes');

dotenv.config();

const { ORIGIN } = process.env;

app.use(express.json());

app.use(cors({
    origin: ORIGIN,
}))

app.use('/google', authRouter);
app.use('/user', userRouter);
app.use('/category-attribute', categoryAttributeRouter);
app.use('/category', categoryRouter);
app.use('/asset', assetRouter)
app.get('*', function (req, res, next) {
    next(new NotFound('not found'));
});

app.use(handleErrors);

module.exports = app;