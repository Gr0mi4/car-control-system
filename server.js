const express = require('express')
const mongose = require('mongoose')

const PORT = process.env.PORT || 4000

const app = express ()

app.use(express.json())
app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/vehicle', require('./routes/vehicle.routes'))

async function start() {
  try {
    await mongose.connect('mongodb+srv://D00m:Gr0mi4@cluster0.4j32b.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    })
    app.listen(PORT, () => {
      console.log('Server has been started...')
    })
  } catch (e) {
    console.log(e)
    process.exit(1)
  }
}

start()
