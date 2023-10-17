const express = require('express')
const app = express()
const cors = require('cors')
app.use(cors())
app.use(express.urlencoded({extended:false}))
app.use(express.json())

app.listen(5,()=>{console.log('api runing...')})

module.exports = app