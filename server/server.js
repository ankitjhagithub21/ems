require('dotenv').config()
const express = require('express')
const cors = require('cors')
const connectDb = require('./db/conn')
const authRouter = require('./routes/authRoutes')
const app = express()

const port = process.env.PORT || 3000
connectDb()

app.use(express.json())
app.use(cors())


app.get('/', (req, res) => {
  res.json({
    "message": "Api working."
  })
})

app.use("/api/auth",authRouter)

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
})