require('dotenv').config()
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const connectDb = require('./db/conn')
const authRouter = require('./routes/authRoutes')
const app = express()

const port = process.env.PORT || 3000
connectDb()

app.use(express.json())
app.use(cors({
  origin:process.env.ORIGIN,
  credentials:true
}))
app.use(cookieParser())


app.get('/', (req, res) => {
  res.json({
    "message": "Api working."
  })
})

app.use("/api/auth",authRouter)

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
})