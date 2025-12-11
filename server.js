// server.js
import express from 'express'
import cors from 'cors'
import 'dotenv/config' // .env için (npm i dotenv)

import sellerRoutes from './sellerRoutes.js'

const app = express()
const PORT = process.env.PORT || 4000

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('TradePi Seller API ayakta 🚀')
})

// /api/seller/... altında tüm seller route'ları
app.use('/api/seller', sellerRoutes)

app.listen(PORT, () => {
  console.log(`Seller backend ${PORT} portunda çalışıyor.`)
})
