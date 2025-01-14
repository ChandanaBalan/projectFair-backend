const mongoose = require('mongoose')

const projectScheme = new mongoose.Schema({
    title:{
        require: true,
        type: String
    },
    language:{
        require: true,
        type: String
    },
    github:{
        require: true,
        type: String
    },
    website:{
        require: true,
        type: String
    },
    overview:{
        require: true,
        type: String
    },
    projectImage:{
        require: true,
        type: String
    },
    userId:{
        require: true,
        type: String
    },
})

//model

const projects = mongoose.model('projects', projectScheme)
module.exports = projects