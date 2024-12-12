const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false, // Change this to false to make it optional
  },
});

module.exports = mongoose.model("Category", categorySchema);
