
const mongoose = require("mongoose");
const _ = require("lodash");

let Schema = new mongoose.Schema({
    icon: { type: String, required: true },
    file: { type: String, required: true },
    fileType: { type: String, required: true },
    title: { type: String, require: true },
    desc: { type: String, require: true },
    product:[{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    modifiedLog: [
        {
        date: { type: String, required: true },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        }
        }
    ]
});

module.exports =   mongoose.model('EducationalSources', Schema);