const fs = require('fs');
const path = require('path');

const tasksFilePath = path.join(__dirname, 'data', 'task.js');

function saveTasksToFile(tasks) {

  const fileContent = `
const tasks = ${JSON.stringify(tasks, null, 2)};

module.exports = tasks;
`;

  fs.writeFileSync(tasksFilePath, fileContent);

}

module.exports = saveTasksToFile;