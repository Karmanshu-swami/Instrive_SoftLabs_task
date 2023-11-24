const express = require('express');
const { testRoute, uploadRoute, add_data, getData, runTask } = require('../controller/controllerIndex');
const upload = require('../middleware/upload');
const router = express.Router();

// Test route to check the working of the node application
router.get("/test", testRoute);

// To be used to upload the file in the middleware/uploads folder
router.post("/add-file", upload.single("xlsFile"), uploadRoute);

// This controller is used to add the data manually in the database
router.post("/add_data", add_data);

// This controller is used to get all the data from the database
router.get("/get_data", getData);

// This route is used to run the cron job
router.get("/task_start", runTask);

module.exports = router;