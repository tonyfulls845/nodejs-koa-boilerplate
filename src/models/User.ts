import { Schema, model } from "mongoose";

export const UserSchema = new Schema({
  firstName: { type: String, default: "", trim: true, maxlength: 256 },
  lastName: { type: String, default: "", trim: true, maxlength: 256 },
});

model("User", UserSchema);
