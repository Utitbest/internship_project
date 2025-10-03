
import fetch from "node-fetch";
import Integration from "../models/Integration.js";
import { validateMailchimpKey, getMailchimpLists } from "../utils/mailchimpClient.js";
import { validateGetResponseKey, getGetResponseLists } from "../utils/getResponseClient.js";

// Save & validate API key
export const saveIntegration = async (req, res) => {
  try {
    const { service, apiKey } = req.body;

    if (!service || !apiKey) {
      return res.status(400).json({ error: "Service and API key are required" });
    }

    let isValid = false;

    if (service === "mailchimp") {
      isValid = await validateMailchimpKey(apiKey);
    } else if (service === "getresponse") {
      isValid = await validateGetResponseKey(apiKey);
    }

    if (!isValid) {
      return res.status(400).json({ error: "Invalid API key" });
    }

    // save integration
    const integration = new Integration({ service, apiKey });
    await integration.save();

    res.status(201).json({ message: "Integration saved successfully", integration });
  } catch (error) {
    console.error("Save Integration Error:", error.message);
    res.status(500).json({ error: "Server error, please try again later" });
  }
};

// Fetch lists/segments
export const fetchLists = async (req, res) => {
  try {
    const { service } = req.query;
    if (!service) {
      return res.status(400).json({ error: "Service is required" });
    }

    const integration = await Integration.findOne({ service });
    if (!integration) {
      return res.status(404).json({ error: "No integration found" });
    }

    let lists = [];
    if (service === "mailchimp") {
      lists = await getMailchimpLists(integration.apiKey);
    } else if (service === "getresponse") {
      lists = await getGetResponseLists(integration.apiKey);
    }

    res.json({ lists });
  } catch (error) {
    console.error("Fetch Lists Error:", error.message);
    res.status(500).json({ error: "Failed to fetch lists, please try again later" });
  }
};
