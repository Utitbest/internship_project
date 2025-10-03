import mongoose from "mongoose";

const IntegrationSchema = new mongoose.Schema({
  service: { 
    type: String,
        enum: ["mailchimp", "getresponse"],
        required: true 
    },
  apiKey: { 
        type: String,
        required: true 
    },
  createdAt: { 
        type: Date,
        default: Date.now 
    },
});

export default mongoose.model("Integration", IntegrationSchema);
