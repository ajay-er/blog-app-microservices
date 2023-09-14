const express = require('express');
const morgan = require('morgan');
const axios = require('axios');

const app = express();

app.use(express.json());
app.use(morgan('tiny'));

app.post('/events', async (req, res) => {
  console.log('Events that received: ', req.body.type);
  const { type, data } = req.body;
  if (type === 'CommentCreated') {
    const status = data.content.includes('orange') ? 'rejected' : 'approved';

    await axios.post('http://event-bus-srv:4005/events', {
      type: 'CommentModerated',
      data: {
        id: data.commentId,
        postId: data.postId,
        content: data.content,
        status,
      },
    });
  }
  res.send({});
});

app.listen(4003, () => {
  console.clear();
  console.log('Listening on 4003');
});
