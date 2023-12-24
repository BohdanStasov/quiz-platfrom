const router = require("express").Router();
const Task = require("../models/Task");
const { submit } = require("../controllers/task");

router.post("/", async (req, res) => {
    const newTask = new Task(req.body);
    try {
        const savedTask = await newTask.save();
        res.status(200).json(savedTask);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get("/", async (req, res) => {
    try {
        const tasks = await Task.find();
        res.status(200).json(tasks);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post("/submit", submit)

module.exports = router;