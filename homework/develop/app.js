const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
//employees array to be passed to the render function
let employees = [];
//array of functions to be used when iquirer is called
const managerQuestions = [{
        type: 'input',
        message: "what's the Employee name?",
        name: 'name',
    },
    {
        type: 'input',
        message: "What's the Employee ID?",
        name: 'ID',
        validate: function (value) {
            if (!isNaN(value)) {
                return true
            } else {
                return 'it needs to be a number'
            }
        }
    },
    {
        type: 'input',
        message: "What's the Employee E-mail?",
        name: 'email',
        validate: function (res) {
            const emailValid = (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
            if (res.match(emailValid)) {
                return true
            } else {
                return 'Invalid E-mail format'
            }
        }
    },
    {
        type: 'input',
        message: "What's the Employee Office number?",
        name: 'office',
        validate: function(res){
             if(res.match(/^[0-9a-zA-Z]+$/)){
                 return true
             } return 'Only numbers and letters allowed'
        }
    }, {
        type: 'confirm',
        message: 'ADD another employee',
        name: 'add',
        default: false,
    },
];
//array of questions for interns and engineers
const questions = [{
        type: 'list',
        message: "What's the employee position",
        name: 'position',
        choices: ['Intern', 'Engineer'],
    },
    {
        type: 'input',
        message: "what's the Employee name?",
        name: 'name',
    },
    {
        type: 'input',
        message: "What's the Employee ID?",
        name: 'id',
        validate: function (value) {
            if (!isNaN(value)) {
                return true
            } else {
                return 'it needs to be a number'
            }
        }
    },
    {
        type: 'input',
        message: "What's the Employee E-mail?",
        name: 'email',
        validate: function (res) {
            const emailValid = (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
            if (res.match(emailValid)) {
                return true
            } else {
                return 'Invalid E-mail format'
            }
        }
    },
    {
        type: 'input',
        message: "What's the Employee school?",
        name: 'school',
        when: function (res) {
            return res.position === 'Intern'
        }
    },
    {
        type: 'input',
        message: "What's the Employee Github?",
        name: 'github',
        when: function (res) {
            return res.position === "Engineer"
        }
    },
    {
        type: 'confirm',
        message: 'ADD another employee',
        name: 'add',
        default: false,
    },
];
//FUNCTION TO RENDER THE HTML FILE IF IT DOES NOT EXIST IT CREATES IT
const createHtml = () => {
    const newHtml = render(employees);
    if(fs.existsSync(OUTPUT_DIR)){
    fs.writeFile(outputPath, newHtml, (err) => {
        if (err) {
            throw err
        }}) } else{
        fs.mkdirSync('output');
        }
};
//FUNCTION TO BE FIRED ONLY WHEN WE WANT TO ADD MORE EMPLOYEES NOT INCLUDING THE MANAGER
const addEmployee = () => {
    inquirer.prompt(questions).then((res) => {
        if (res.position === 'Intern') {
            const newIntern = new Intern(res.name, res.id, res.email, res.school);
            employees.push(newIntern);
        } else if (res.position === 'Engineer') {
            const newEngineer = new Engineer(res.name, res.id, res.email, res.github);
            employees.push(newEngineer);
        }
        if (res.add) {
            addEmployee();
        } else {
            // console.log(employees);
            createHtml()
        }
    })
}

//FUNCTION ASK TO START OUR APP WITH INQUIRER PROMPTS
const ask = () => {
    inquirer.prompt(managerQuestions).then((res) => {
        const newManager = new Manager(res.name, res.id, res.email, res.office);
        employees.push(newManager);

        if (res.add) {
            addEmployee();
        } else {
            // console.log(employees)
            createHtml();
        }

    })


}
ask();

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```