const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));

const posts = {};

app.get('/posts', (req, res) => {
  res.send(posts);
});

app.post('/events', (req, res) => {
  console.log('Events that received: ', req.body.type);
  const { type, data } = req.body;
  if (type === 'PostCreated') {
    const { id, title } = data;
    posts[id] = { id, title, comments: [] };
  }

  if (type === 'CommentCreated') {
    const { commentId, content, postId, status } = data;
    const post = posts[postId];
    post?.comments.push({ id: commentId, content, status });
  }

  if (type === 'CommentUpdated') {
    const { id, content, postId, status } = data;
    const post = posts[postId];
    const comment = post.comments.find((comment) => {
      return comment.id === id;
    });
    comment.status = status;
    comment.content = content;
  }
  res.send({});
});

app.listen(4002, () => {
  console.clear();
  console.log('Listening on 4002');
});
