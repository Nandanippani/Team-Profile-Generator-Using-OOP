// TODO: Write code to define and export the Employee class

class Employee {
    constructor(name, id, email) {
        this.employee_name = name;
        this.employee_id = id;
        this.employee_email = email;

    }

    getName() {
        return this.employee_name;
    }

    getId() {
        return this.employee_id;
    }

    getEmail() {
        return this.employee_email;
    }

    getRole() {
        return 'Employee';
    }
}


module.exports = Employee;