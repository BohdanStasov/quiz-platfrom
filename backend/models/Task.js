const mongoose = require("mongoose");

const AnswerSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
    },
    isCorrect: {
        type: Boolean,
        required: true,
    },
});

const AssignmentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    question: {
        type: String,
        required: true,
    },
    answers: [AnswerSchema],
});

const TaskSchema = new mongoose.Schema(
    {
        testName: {
            type: String,
            required: true,
        },
        testDescription: {
            type: String,
            required: true,
        },
        assignments: [AssignmentSchema], 
    },
    { timestamps: true }
);

module.exports = mongoose.model("Task", TaskSchema);