// import express from "express";
// import { saveIntegration, fetchLists } from "../controllers/integrationController.js";

// const router = express.Router();

// router.post("/", saveIntegration);
// router.get("/lists", fetchLists);

// export default router;


import express from "express";
import { saveIntegration, fetchLists } from "../controllers/integrationController.js";

const router = express.Router();

// Save & validate API key
// POST /api/integrations/esp
router.post("/", saveIntegration);

// Fetch lists/segments from Mailchimp or GetResponse
// GET /api/integrations/esp/lists?service=mailchimp
// GET /api/integrations/esp/lists?service=getresponse
router.get("/lists", fetchLists);

export default router;
