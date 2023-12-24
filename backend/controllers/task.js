const User = require("../models/User");
const Task = require("../models/Task");

module.exports.submit = async (req, res) => {
    const username = req.body.username;
    const taskId = req.body.taskId;
    const answersByAssignment = req.body.answersByAssignment;

    try {
        const task = await Task.findById(taskId);
        if (!task) {
            return res.status(404).json({ message: "Task not found." });
        }

        const taskGrade = calculateTaskGrade(task, answersByAssignment);

        await User.findOneAndUpdate(
            { username },
            {
                $push: {
                    tasks: {
                        taskId,
                        grade: taskGrade,
                    },
                },
            }
        );

        res.status(200).json("Task has been submitted.");
    } catch (err) {
        console.error(err);
        res.status(404).json(err);
    }
};

function calculateTaskGrade(task, answersByAssignment) {
    let taskGrade = 0;

    for (const assignmentId in answersByAssignment) {
        const assignment = task.assignments.id(assignmentId);

        if (!assignment) {
            // Handle the error appropriately (e.g., log it, return an error response)
            console.error(`Assignment not found with ID ${assignmentId}`);
            continue; // Skip to the next iteration
        }

        const validAnswerIds = assignment.answers.map(answer => answer._id.toString());
        const selectedAnswerId = answersByAssignment[assignmentId];

        // Convert to an array for every function
        const selectedAnswerIds = Array.isArray(selectedAnswerId) ? selectedAnswerId : [selectedAnswerId];

        const isValidSubmission = selectedAnswerIds.every(id => validAnswerIds.includes(id));

        if (!isValidSubmission) {
            // Handle the error appropriately (e.g., log it, return an error response)
            console.error(`Invalid answer selection for assignment ID ${assignmentId}`);
            continue; // Skip to the next iteration
        }

        const correctAnswerIds = assignment.answers
            .filter(answer => answer.isCorrect)
            .map(answer => answer._id.toString());

        const userGrade = selectedAnswerIds.filter(id => correctAnswerIds.includes(id)).length;

        taskGrade += userGrade;
    }

    return taskGrade;
}



