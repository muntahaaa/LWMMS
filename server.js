require('dotenv').config({ path: `${process.cwd()}/.env` });
const express= require('express');
const bodyParser = require('body-parser');
const authRouter = require('./router/authRouter');
const rolePermissionRouter = require('./router/rolePermissionRouter');

const app = express();

app.get('/', (req, res) => {
  res.send('LWMMS is working');
});

app.use(express.json());
app.use(bodyParser.json());

app.use('/auth', authRouter);
app.use('/access',rolePermissionRouter);
app.use('*', (req, res) => {
  res.status(404).json({ 
    error: 'Route not found' });
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});