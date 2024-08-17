const mongoose = require('mongoose');

mongoose.connect('YOUR_MONGODB_CONNECTION_STRING', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const DataSchema = new mongoose.Schema({
  url: String,
  content: [String],
});

const Data = mongoose.model('Data', DataSchema);

module.exports = Data;