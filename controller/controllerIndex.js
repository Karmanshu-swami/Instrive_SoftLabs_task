const userModel = require("../models/usersData");
const fs = require('fs');
const readXlsxFile = require('read-excel-file/node');
const task = require("../cronTask/task");

// Please add your file path in place of this file path
const filePath = "C:/Users/Karmanshu Swami/Desktop/Node_js_interview/middleware/uploads/Node_Task.xlsx"


// Test route to check the working of the node application
const testRoute = async (req, res) => {
    return res.status(200).json({
        type: true,
        message: "Test worked fine"
    });
};

// To be used to upload the file in the middleware/uploads folder
const uploadRoute = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                type: false,
                message: "File not available!"
            })
        } else {
            return res.status(200).json({
                type: true,
                message: "File uploaded successfully"
            })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            type: false,
            message: error
        });
    }
};

// This controller is used to add the data manually in the database
const add_data = async (req, res) => {
    try {
        await readXlsxFile(fs.createReadStream(filePath)).then((rows) => {
            for (let i = 1; i < rows.length; i++) {
                // checking if the mendatory fields are present or not
                if (!rows[i][0] || !rows[i][1] || !rows[i][2]) {
                    const saveData = userModel({
                        name: rows[i][1],
                        emailId: rows[i][2],
                        mobile: rows[i][3],
                        address1: rows[i][4],
                        country: rows[i][5],
                        status: "Inactive",
                        err_log: "Required fields not present"
                    });
                    saveData.save();
                } else {
                    const saveData = userModel({
                        name: rows[i][1],
                        emailId: rows[i][2],
                        mobile: rows[i][3],
                        address1: rows[i][4],
                        country: rows[i][5],
                        status: "Active",
                        err_log: ""
                    });
                    saveData.save();
                }

            }
            return res.json(rows)
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            type: false,
            message: error
        });
    }
};

// This controller is used to get all the data from the database
const getData = async (req, res) => {
    try {
        const usersData = await userModel.find();
        return res.status(200).json({
            type: true,
            data: usersData
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            type: false,
            message: error
        });
    }
};

// This route is used to run the cron job
const runTask = async (req, res) => {
    try {
        console.log("task initiated")
        task.start();
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            type: false,
            err: error,
            message: "Cannot run the cron job"
        });
    }
}

module.exports = { testRoute, uploadRoute, add_data, getData, runTask }