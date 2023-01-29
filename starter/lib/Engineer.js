// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.

const Employee = require("./Employee");

class Engineer extends Employee {
    constructor(name, id, email, githubUname) {
        super(name, id, email);
        this.github = githubUname;
    }

    getGithub() {
        console.log(this.github);
    }

    getRole() {
        return this;
    }
}

module.exports = Engineer;