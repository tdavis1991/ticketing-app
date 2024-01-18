import mongoose, { Schema, model, models } from "mongoose";

const ticketSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["open", "in-progress", "resolved"],
      default: "open",
    },
    severity: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
    priority: {
      type: Number,
      enum: [1, 2, 3, 4, 5],
      default: 3,
    },
    assignee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
    comments: [
      {
        text: {
          type: String,
          required: true,
        },
        author: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User", // Reference to the User model
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    attachments: [
      {
        filename: {
          type: String,
        },
        uploadedBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User", // Reference to the User model
        },
        uploadedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Ticket = models.Ticket || model("Ticket", ticketSchema);

export default Ticket;
