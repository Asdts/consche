import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  autoSchedule: {
    type: Boolean,
    required: true,
    default: false,
  },
  calendarId: {
    type: String,
    required: false,
  },
  accessToken: {
    type: String,
    required: false,
  },
  contestType: {
    type: String,
    required: false,
    default: "all",
    },
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt
})

export const User = mongoose.models.User || mongoose.model("User", userSchema)
