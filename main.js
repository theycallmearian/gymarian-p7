require('dotenv').config()
const mongoose = require('mongoose')
const app = require('./app')

const PORT = process.env.PORT || 3000

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('🟢 Conectado a MongoDB Atlas')
    app.listen(PORT, () => {
      console.log(`🏃‍♂️➡️ Servidor corriendo en puerto ${PORT}`)
    })
  })
  .catch((err) => {
    console.error('🛑 Error conectando a MongoDB:', err)
    process.exit(1)
  })
