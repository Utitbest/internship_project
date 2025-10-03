import fetch from "node-fetch";

// Validate GetResponse key by calling ping endpoint
export const validateGetResponseKey = async (apiKey) => {
  try {
    const res = await fetch("https://api.getresponse.com/v3/accounts", {
      headers: { "X-Auth-Token": `api-key ${apiKey}` },
    });

    return res.ok; // valid if key works
  } catch (error) {
    console.error("GetResponse validation error:", error.message);
    return false;
  }
};

// Fetch campaigns/lists from GetResponse
export const getGetResponseLists = async (apiKey) => {
  try {
    const res = await fetch("https://api.getresponse.com/v3/campaigns", {
      headers: {
        "X-Auth-Token": `api-key ${apiKey}`,
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "GetResponse API error");

    return data || [];
  } catch (error) {
    console.error("GetResponse fetch lists error:", error.message);
    throw error;
  }
};
