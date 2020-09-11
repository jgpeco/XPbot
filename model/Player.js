const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PlayerSchema = new Schema({
  discordUserId: {
    type: Number,
  },
  name: {
    type: String,
    required: true,
  },
  xp: {
    type: Number,
    required: true,
  },
});

module.exports = Player = mongoose.model('player', PlayerSchema);
