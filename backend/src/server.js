require('dotenv').config({ path: `${process.cwd()}/.env` });
const express= require('express');
const bodyParser = require('body-parser');
const authRouter = require('./router/authRouter');
const rolePermissionRouter = require('./router/rolePermissionRouter');
const ContributorRouter= require('./router/contributorRouter');
const AppError= require('./utils/appError');
const catchAsync= require('./utils/catchAsync');
const globalErrorHandler= require('./controller/errorController');
const userRouter = require('./router/userRouter');
const itemRouter = require('./router/itemRouter');


const app = express();

app.get('/', (req, res) => {
  res.send('LWMMS is working');
});

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/auth', authRouter);
app.use('/access',rolePermissionRouter);
app.use('/contributor', ContributorRouter);
app.use('/users',userRouter);
app.use('/items',itemRouter);


// app.use('*', (req, res) => {
//   res.status(404).json({ 
//     error: 'Route not found' });
// });

//error middleware
app.use('*', catchAsync(async(req, res,next) => {
  throw new AppError('This is an invalid route', 404);
}));

app.use(globalErrorHandler);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});