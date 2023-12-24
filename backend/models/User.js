const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
        },
        password: {
            type: String,
        },
        tasks: [
            {
                taskId: {
                    type: mongoose.Schema.Types.ObjectId,
                    required: true,
                },
                grade: {
                    type: Number,
                    required: true,
                },
            }
        ],
    },
    { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);