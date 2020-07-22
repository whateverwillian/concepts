const app = require('express')();

app.get('/', (req, res) => {
  res.json({
    status: 'success',
    message: 'The server is running!',
  });
})

app.listen(3333, () => {
  console.log('Server running on port 3333...');
})
