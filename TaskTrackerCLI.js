import fs from 'fs';
import readline from 'node:readline';
import { stdin, stdout } from 'node:process';

const rl = readline.createInterface({ input: stdin, output: stdout });

function ask(question) {
    return new Promise(resolve => rl.question(question, resolve));
}

function AddTask (name ) {
    let tasks = JSON.parse(fs.readFileSync('Tasks.json', 'utf8'));
    tasks.push({ name, completed: false});
    fs.writeFileSync('Tasks.json', JSON.stringify(tasks, null, 2));
    console.log(`Task ${name} added.`);
}

function DeleteTask (name) {
    let tasks = JSON.parse(fs.readFileSync('Tasks.json', 'utf-8'));
    const initialLength = tasks.length;
    tasks = tasks.filter(task => task.name !== name);
    if (tasks.length === initialLength) { 
        console.log(`Task ${name} not found.`);
        return;
    }
    fs.writeFileSync('Tasks.json', JSON.stringify(tasks, null, 2));
    console.log(`Task ${name} deleted.`);
}

function MarkTask (name) { 
    const tasks = JSON.parse(fs.readFileSync('Tasks.json', 'utf-8'));
    const taskIndex = tasks.findIndex(task => task.name === name);
    if (taskIndex === -1) { 
        console.log(`Task ${name} not found.`);
        return;
    }
    tasks[taskIndex].completed = !tasks[taskIndex].completed;
    fs.writeFileSync('Tasks.json', JSON.stringify(tasks, null, 2));
    console.log(`Task ${name} marked as ${tasks[taskIndex].completed ? 'completed ' : 'incomplete'}`);
}

function ListTasks () { 
    const tasks = JSON.parse(fs.readFileSync('Tasks.json', 'utf-8'));
    if (tasks.length === 0 ) { 
        console.log('No tasks found.');
        return;
    }
    tasks.forEach(task => {
        console.log(`- ${task.name} [${task.completed ? 'x' : ' '}]`);
    });
}

function TaskDone (name) { 
    const tasks = JSON.parse(fs.readFileSync('Tasks.json', 'utf-8'));
    const taskIndex = tasks.findIndex(task => task.name === name);
    if (taskIndex === -1) { 
        console.log(`Task ${name} not found.`);
        return;
    }
    tasks[taskIndex].completed = true;
    fs.writeFileSync('Tasks.json', JSON.stringify(tasks, null, 2));
    console.log(`Task ${name} marked as completed.`);
}

function TaskUnDone (name) {
    const tasks = JSON.parse(fs.readFileSync('Tasks.json', 'utf-8'));
    const taskIndex = tasks.findIndex(task => task.name === name);
    if (taskIndex === -1) {
        console.log(`Task ${name} not found.`);
        return;
    }
    tasks[taskIndex].completed = false;
    fs.writeFileSync('Tasks.json', JSON.stringify(tasks, null, 2));
    console.log(`Task ${name} marked as incomplete.`);
}

function TaskInProcess (name) { 
    const tasks = JSON.parse(fs.readFileSync('Tasks.json', 'utf-8'));
    const taskIndex = tasks.findIndex(task => task.name === name);
    if (taskIndex === -1) { 
        console.log(`Task ${name} not found.`);
        return;
    }
    tasks[taskIndex].completed = false; // still not done
    tasks[taskIndex].status = "in-process";
    fs.writeFileSync('Tasks.json', JSON.stringify(tasks, null, 2));
    console.log(`Task ${name} marked as in process.`);
}

async function main () { 
    const command = await ask("Enter command (add, delete, mark, list, done, undone, inprocess): ");

    let name = "";
    if (command !== "list") {
        name = await ask("Enter task name: ");
    }

    switch (command) {
        case 'add':
            AddTask(name); break;
        case 'delete':
            DeleteTask(name); break;
        case 'mark':
            MarkTask(name); break;
        case 'list':
            ListTasks(); break;
        case 'done':
            TaskDone(name); break;
        case 'undone':
            TaskUnDone(name); break;
        case 'inprocess':
            TaskInProcess(name); break; 
        default: console.log('Invalid input'); break;
    }
    rl.close();
}

main();