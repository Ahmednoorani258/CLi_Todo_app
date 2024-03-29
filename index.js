#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
import chalkAnimation from "chalk-animation";
async function karaoke(arr, time) {
    let text = chalkAnimation.karaoke(arr);
    await new Promise((resolve) => {
        setTimeout(resolve, time);
    });
    text.stop();
}
async function rainbow(arr, time) {
    let text = chalkAnimation.rainbow(arr);
    await new Promise((resolve) => {
        setTimeout(resolve, time);
    });
    text.stop();
}
function looping(a) {
    for (let ele of a) {
        console.log(`${chalk.magenta(ele)}`);
    }
}
let todos = [];
async function createTodo(arr) {
    await rainbow(`\nWelcome to Noorani's Todo-App\n\n`, 3000);
    while (true) {
        await karaoke(`~~~~~~~~~~~~~~~~~~~~~~~~~~`, 2900);
        let userinput = await inquirer.prompt({
            name: "select",
            type: "list",
            message: chalk.green("Select an operation:"),
            choices: ["Add", "Update", "View", "Delete", "Exit"]
        });
        if (userinput.select === "Add") {
            let add = await inquirer.prompt([{
                    name: "todo",
                    type: "input",
                    message: chalk.green("Add item in Todo list:")
                }]);
            if (add.todo) {
                todos.push(add.todo);
                console.log(chalk.bgGrey.yellowBright.bold(`\nSuccecfully added In your Todo-List\n`));
                console.log(`${chalk.yellowBright(chalk.magentaBright(add.todo))}`);
            }
            else {
                console.log(chalk.redBright(`\nError! U need to add Some thing`));
            }
        }
        if (userinput.select === "Update") {
            if (todos.length === 0) {
                console.log(chalk.redBright(`\nYour Todo-List is empty`));
            }
            else {
                let update = await inquirer.prompt({
                    name: "todo",
                    type: "list",
                    message: chalk.green("Select item for update"),
                    choices: todos.map(ele => ele)
                });
                let add = await inquirer.prompt([{
                        name: "todo",
                        type: "input",
                        message: chalk.green("update item in Todo list:")
                    }]);
                if (add.todo) {
                    let updatedTodo = todos.filter(ele => ele != update.todo);
                    todos = [...updatedTodo, add.todo];
                    console.log(chalk.bgGrey.yellowBright.bold(`\nSuccecfully Updated \nYour list after Update\n`));
                    console.log(chalk.magenta(todos));
                }
                else {
                    console.log(chalk.redBright(`\nError! U need to add Some thing`));
                }
            }
        }
        if (userinput.select === "View") {
            if (todos.length === 0) {
                console.log(chalk.redBright(`\nYour Todo-List is empty`));
            }
            else {
                looping(todos);
            }
        }
        if (userinput.select === "Delete") {
            if (todos.length === 0) {
                console.log(chalk.redBright(`\nYour Todo-List is empty`));
            }
            else {
                let Delete = await inquirer.prompt({
                    name: "todo",
                    type: "list",
                    message: chalk.green("Select item for Delete"),
                    choices: todos.map(ele => ele)
                });
                let updateArr = todos.filter(val => val !== Delete.todo);
                todos = [...updateArr];
                console.log(chalk.bgGrey.redBright.bold(`\nSuccecfully Deleted \n`));
            }
        }
        if (userinput.select === "Exit") {
            await rainbow(`Thank you for using my Todo-app`, 3000);
            break;
        }
    }
}
createTodo(todos);
