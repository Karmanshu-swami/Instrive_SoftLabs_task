const cron = require("node-cron");
const readXlsxFile = require('read-excel-file/node');

// Please add your file path in place of this file path
const filePath = "C:/Users/Karmanshu Swami/Desktop/Node_js_interview/middleware/uploads/Node_Task.xlsx"

async function readFile() {
    await readXlsxFile(fs.createReadStream(filePath)).then((rows) => {
        for (let i = 1; i < rows.length; i++) {
            if (!rows[i][1] || rows[i][2] || rows[i][3]) {
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
    });
};

const task = cron.schedule('* * 1 * * *', () => {
    readFile()
    // console.log("task started every hr")
});
task.start();


module.exports = task;