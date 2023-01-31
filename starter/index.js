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
            type: 'input',
            name: 'id',
            message: 'Please enter manager\'s id number.',
            validate: numberInput => {
                if (isNaN(numberInput)) {
                    return 'please enter a number';
                }
                return true;
            }
        },
        {
            type: 'input',
            name: 'email',
            message: 'Please enter manager\'s email id.',
            validate: isValidEmail
        },
        {
            type: 'input',
            name: 'officeNumber',
            message: 'Please enter manager\'s office number.',
            validate: numberInput => {
                if (isNaN(numberInput)) {
                    return 'please enter a number';
                }
                return true;
            }
        }
    ]).then(data => {
        team.push(
            new Manager(data.name, data.id, data.email, data.officeNumber)
        );
    });
}

function generateEngineer() {
    //Adding engineer to development team
    return inquirer.prompt([
        //Prompting user for name,id,email and github username.
        {
            name: 'name',
            message: 'Please enter Engineer\'s name.',
        },
        {
            type: 'input',
            name: 'id',
            message: 'Please enter Engineer\'s id number.',
            validate: numberInput => {
                if (isNaN(numberInput)) {
                    return 'please enter a number';
                }
                return true;
            }
        },
        {
            name: 'emailId',
            message: 'Please enter Engineer\'s email id.',
            validate: isValidEmail
        },
        {
            name: 'githubUsername',
            message: 'Please enter Engineer\'s github username.',
        }
    ]).then(data => {
        team.push(
            new Engineer(data.name, data.id, data.emailId, data.githubUsername),
        );

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
            type: 'input',
            name: 'id',
            message: 'Please enter Intern\'s id number.',
            validate: numberInput => {
                //validating the number for id
                if (isNaN(numberInput)) {
                    return 'please enter a number';
                }
                return true;
            }
        },
        {
            name: 'emailId',
            message: 'Please enter Intern\'s email id.',
            validate: isValidEmail
        },
        {
            name: 'schoolName',
            message: 'Please enter Intern\'s school name.',
        }

    ]).then(data => {
        team.push(
            new Intern(data.name, data.id, data.emailId, data.schoolName),
        );
    });
}

function isValidEmail(email) {
    // Function for validation of email of employees
    valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
    if (valid) {
        return true;
    } else {
        return 'Please enter a valid email';
    }

}

function editEmployeeOptions() {
    //Creating options to choose between Manager, engineer and intern
    return inquirer.prompt({
        //Prompting user for options
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
        // process.exit();
        return team;

    }).then(teamData => {
        // console.log(teamData);
        return render(teamData);
        //rendering data into html format using page-template js file
    }).then(htmlData => {
        return writeFile(htmlData);
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
                //Generating  team.html file
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