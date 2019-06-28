// Dependencies
// =============================================================
const db = require("./models");
const schedule = require('node-schedule');

// =============================================================
var rule = new schedule.RecurrenceRule();
rule.dayOfWeek = [0, new schedule.Range(0, 7)];
rule.hour = 24;
rule.minute = 0;

var resetTasks = schedule.scheduleJob(rule, function () {
    db.Task.update(
        {
            UserId: null
        },
        {
            where: {
                UserId: !null
            }
        }
    ).then(function (res) {
        console.log("this is working!");
        res.json({ update: true });
    });
});

module.exports = resetTasks;