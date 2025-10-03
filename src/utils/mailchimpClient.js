import fetch from "node-fetch";

// Validate Mailchimp API key by calling "ping" endpoint
export const validateMailchimpKey = async (apiKey) => {
  try {
    const serverPrefix = apiKey.split("-")[1];
    const res = await fetch(`https://${serverPrefix}.api.mailchimp.com/3.0/`, {
      headers: { Authorization: `apikey ${apiKey}` },
    });

    return res.ok; // returns true if key is valid
  } catch (error) {
    console.error("Mailchimp validation error:", error.message);
    return false;
  }
};

// Fetch Mailchimp lists
export const getMailchimpLists = async (apiKey) => {
  try {
    const serverPrefix = apiKey.split("-")[1];
    const res = await fetch(`https://${serverPrefix}.api.mailchimp.com/3.0/lists`, {
      headers: { Authorization: `apikey ${apiKey}` },
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.detail || "Mailchimp API error");

    return data.lists || [];
  } catch (error) {
    console.error("Mailchimp fetch lists error:", error.message);
    throw error;
  }
};
