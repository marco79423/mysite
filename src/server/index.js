import express from 'express';
import path from 'path';

const app = express()
const port = 3000

app.use('/assets', express.static(path.join(__dirname, 'assets')))
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server listening on port ${port}`);
});
