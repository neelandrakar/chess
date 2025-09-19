import { Schema } from 'mongoose'
const UserSchema = new Schema({
  userId: {
    type: Schema.Types.Number,
    required: true,
    trim: true
  },
  username: {
    type: Schema.Types.String,
    required: true,
    trim: true
  },
  name: {
    type: Schema.Types.String,
    default: null,
    trim: true
  },
  mobno: {
    type: Schema.Types.Number,
    default: 0,
    trim: true
  },
  created_on: {
    type: Schema.Types.Date,
    default: Date.now()
  }
})

module.exports = UserSchema;