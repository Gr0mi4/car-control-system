const express = require('express');
const mongose = require('mongoose');

const PORT = process.env.PORT || 4000;

const app = express();

app.use(express.json());
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/vehicle', require('./routes/vehicle.routes'));
app.use('/api/images', require('./routes/images.routes'));
app.use('/api/notes', require('./routes/notes.routes'));

async function start() {
  app.listen(PORT, () => {
    console.log('Server has been started...');
  });
  try {
    await mongose.connect("mongodb://D00m:Gr0mi4@cluster0-shard-00-00.4j32b.mongodb.net:27017,cluster0-shard-00-01.4j32b.mongodb.net:27017,cluster0-shard-00-02.4j32b.mongodb.net:27017/?ssl=true&replicaSet=atlas-14nrvh-shard-0&authSource=admin&retryWrites=true&w=majority", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    });
  } catch (e) {
    console.log(e, 'Cant connect to the data base');
  }
}

start();
