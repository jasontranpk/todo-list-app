function project(name){
    const project = {};
    project.taskList = [];
    project.name = name;
    project.add = (task) =>{
        project.taskList.push(task);
    }
    return project;

}
export default project;