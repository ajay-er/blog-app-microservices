const express = require('express');
const app = express();
const axios = require('axios');
const cors = require('cors');
const morgan = require('morgan');

app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));

app.post('/events', (req, res) => {
  const event = req.body;

  console.log(event);

  axios.post('http://localhost:4000/events', event).catch((err) => {
    console.log(err);
  });
  axios.post('http://localhost:4001/events', event).catch((err) => {
    console.log(err);
  });
  axios.post('http://localhost:4002/events', event).catch((err) => {
    console.log(err);
  });

  res.send({ status: 'OK' });
});

app.listen(4005, () => {
  console.log('Listening on 4005');
});
