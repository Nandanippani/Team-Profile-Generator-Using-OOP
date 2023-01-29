const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");
const { validateHeaderName } = require("http");
const { listenerCount } = require("process");


// TODO: Write Code to gather information about the development team members, and render the HTML file.
const team = [];
function generateManager() {
    // Adding manager to development team
    return inquirer.prompt([
        //Prompting user for manager's name and adding manager's id,email,officenumber using Manager class
        {
            name: 'name',
            message: 'Please enter Manager\'s name.',
        },
        {
            type: 'number',
            name: 'id',
            message: 'Please enter manager\'s id number.',
        },
        {
            name: 'emailId',
            message: 'Please enter manager\'s email id.'
        },
        {
            type: 'number',
            name: 'officeNumber',
            message: 'Please enter manager\'s office number.'
        }
    ]).then(data => {
        team.push({
            type: 'Manager',
            data: new Manager(data.name, data.id, data.emailId, data.officeNumber)
        });
    });
}

function generateEngineer() {
    //Adding engineer to development team
    return inquirer.prompt([
        {
            name: 'name',
            message: 'Please enter Engineer\'s name.',
        },
        {
            type: 'number',
            name: 'id',
            message: 'Please enter Engineer\'s id number.',
        },
        {
            name: 'emailId',
            message: 'Please enter Engineer\'s email id.',
        },
        {
            name: 'githubUsername',
            message: 'Please enter Engineer\'s github username.',
        }
    ]).then(data => {
        team.push({
            type: 'Engineer',
            data: new Engineer(data.name, data.id, data.emailId, data.githubUsername),
        });

    });

}

function generateIntern() {
    //Adding intern to development team
    return inquirer.prompt([
        //prompting user for intern's name and adding manager's id,email,officenumber using Manager class
        {
            name: 'name',
            message: 'Please enter Intern\'s name.',
        },
        {
            type: 'number',
            name: 'id',
            message: 'Please enter Intern\'s id number.',
        },
        {
            name: 'emailId',
            message: 'Please enter Intern\'s email id.',
        },
        {
            name: 'schoolName',
            message: 'Please enter Intern\'s school name.',
        }

    ]).then(data => {
        team.push({
            type: 'Intern',
            data: new Intern(data.name, data.id, data.emailId, data.schoolName),
        });
    });
}


function editEmployeeOptions() {
    return inquirer.prompt({
        type: 'list',
        name: 'option',
        message: 'Please choose an employee status to edit',
        choices: [
            {
                name: 'Add an Engineer',
                value: 'Engineer'
            },
            {
                name: 'Add an Intern',
                value: 'Intern'
            },
            {
                name: 'Exit the Manager Panel',
                value: 'Exit'
            }
        ]
    }).then(choice => {
        if (choice.option === 'Engineer') {
            return generateEngineer()
                .then(editEmployeeOptions);
        }
        if (choice.option === 'Intern') {
            return generateIntern()
                .then(editEmployeeOptions);
        }

        console.log('Thanks for using our app!');
        console.log(team);
        // process.exit();
        return team;

    }).then(teamData => {
        return writeFile(JSON.stringify(teamData));
    }).then(process.exit);
}

const writeFile = fileContent => {
    return new Promise((resolve, reject) => {
        fs.writeFile(outputPath, fileContent, err => {
            if (err) {
                reject(err);
                return;
            }
            resolve({
                ok: true,
                message: 'File created!'
            });
        });
    });
};



function init() {
    //Initialising the app
    console.log('----Welcome to Employee Manager App----');
    generateManager().then(editEmployeeOptions);
}

init();