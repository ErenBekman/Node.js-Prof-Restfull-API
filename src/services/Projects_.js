const Project = require('../models/Projects')

const insert = (data) => {
    const project = new Project(data)
   return project.save()
}
const list = (where) => {
    return Project.find(where || {}).populate({
        path: "user_id",
        select: "full_name email"
    })
}
const modify = (data, id) => {
    return Project.findByIdAndUpdate(id, data, { new : true })
    // return Project.findByIdAndUpdate({_id: id}, data, { new : true })
    // return Project.findById(id).then(project => {
    //     project.name = data.name
    //     project.age = data.age
    //     return project.save()
    // })
}

const remove = (id) => {
    return Project.findByIdAndDelete(id)
}

module.exports = { insert , list, modify , remove}