require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 3000


app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
  res.json({
    "message":"Api working."
  })
})

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
})