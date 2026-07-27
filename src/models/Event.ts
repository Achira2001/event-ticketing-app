import { Schema, model, models } from "mongoose";

const EventSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  category: { type: String, required: true },
  date: { type: Date, required: true },
  price: { type: Number, required: true },
  totalTickets: { type: Number, required: true },
  availableTickets: { type: Number, required: true },
  imageUrl: { type: String, required: true },
  organizer: { type: Schema.Types.ObjectId, ref: "User" },
}, { timestamps: true });

export default models.Event || model("Event", EventSchema);