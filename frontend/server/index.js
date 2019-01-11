import path from 'path'
import express from 'express'


const PORT = 3000

const app = express()

app.use(express.static(
  path.resolve(__dirname, '..', 'build'),
  {maxAge: '7d'},
))

app.get('/*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'))
})


app.listen(PORT, (error) => {
  if (error) {
    return console.log('server error:', error)
  }

  console.log("listening on " + PORT + "...")
})
