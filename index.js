// const connection = require('./connection');
const inquirer = require('inquirer');
const db = require('./db/connection')


const starterPrompt = {
    type: 'list',
    name: 'action',
    message: 'Hello, welcome to the employee management system, What would you like to do?',
    choices: [
      'View all departments', 
      'View all roles', 
      'View all employees', 
      'Add a department', 
      'Add a role', 
      'Add an employee', 
      'Update an employee role'
    ]
}

const addDepartmentPrompt = {
    name: 'department_name',
    message: 'What is the department name you want to add?',
  }

const addRolePrompt = [

  {
    name: 'role_name',
    message: 'What role you want to add?'
  },
  {
    name: 'role_salary',
    message: 'What is the salary for this role?'
  },
  {
    name: 'role_department',
    message: 'What is the department for this role?'
  }

]

const addEmployeePrompt = [

  {
    name: 'first_name',
    message: 'What is the first name?'
  },
  {
    name: 'last_name',
    message: 'What is the last name?'
  },
  {
    name: 'role_id',
    message: `What is the employee's title?`,
  },
  {
    name: 'manager',
    message: 'Who is the manager?'
  },

]



const viewAllDepartments = ()=> {
  // make a call to the db & show all departments
  db.query('SELECT * FROM department').then(results => {
    console.log('----------- DEPARTMENTS -----------')
    console.table(results)
    console.log('----------- DEPARTMENTS -----------')
    setTimeout(start, 5000)
  })
}

const viewAllRoles = ()=> {
  db.query('SELECT * FROM role').then(results => {
    console.log('----------- Roles -----------')
    console.table(results)
    console.log('----------- Roles -----------')
    setTimeout(start, 5000)
  })
}

const viewAllEmployees = ()=> {
  db.query('SELECT * FROM employee').then(results => {
    console.log('----------- Employees -----------')
    console.table(results)
    console.log('----------- Employees -----------')
    setTimeout(start, 5000)
  })
}

const addDepartment = ()=> {
// before writing query, we need inquirer to gather info on new department
inquirer.prompt(addDepartmentPrompt)
.then(results => {
  console.log(results);
  db.query('INSERT INTO department SET ?', {name: results.department_name}).then(results => {
    console.log("THE DEPARTMENT HAS BEEN ADDED TO THE DATABASE")
    setTimeout(start, 5000)
  })
})
}


const addRole = ()=> {
  // TODO: .MAP FOR DEPARTMENT
  inquirer.prompt(addRolePrompt)
.then(results => {
  console.log(results);
  db.query('INSERT INTO role SET ?', {title: results.role_name, salary: results.role_salary, department_id: results.role_department}).then(results => {
    console.log("THE ROLE HAS BEEN ADDED TO THE DATABASE")
    setTimeout(start, 5000)
  })
})
}


const addEmployee = ()=> {
// before writing query, we need inquirer to gather info on new employee
// we need all the current role ids, to allow user to choose a role_id that is in the role table
// we need all the current employee ids, to choose a manager_id
 // Convert results to an array of choices for inquirer prompt

// TODO: have to work on this
// .MAP FOR THE EMPLOYEES WHERE THE MANAGER ID IS NULL
// .MAP FOR THE ROLE



  inquirer.prompt(addEmployeePrompt)
  .then(results => {
    console.log("RESULTS ---", results);
    db.query('INSERT INTO employee SET ?', {first_name: results.first_name, last_name: results.last_name, role_id: results.role_id, manager_id: results.manager}).then(results => {
      console.log("THE NEW EMPLOYEE HAS BEEN ADDED TO THE DATABASE")
      setTimeout(start, 5000)
    })
  })
}





const updateEmployee = ()=> {

  db.query('SELECT * FROM employee').then(results => {
    console.log(results);

    const employeeArray = results.map(employee => {
      return {name: employee.first_name +' '+ employee.last_name, value: employee.id}
    })
    db.query('SELECT * FROM role').then(results => {
      console.log(results)

      const roleArray = results.map(role => {
        return {name: role.title, value: role.id}
      })
      inquirer.prompt([
        {
          name: 'selectedEmployee',
          message: 'Which employee would you like to update?',
          type: 'list',
          choices: employeeArray
        },
        {
          name: 'selectedRole',
          message: "What is the employee's new title?",
          type: 'list',
          choices: roleArray
        }
      ]).then(results => {
        console.log(results)
        db.query('UPDATE employee SET role_id =? WHERE id=?',[results.selectedRole, results.selectedEmployee]).then(results => {
          console.log('UPDATED')
          setTimeout(start, 5000)
        })
      })
    })
  })
}



function start(){
  inquirer.prompt(starterPrompt)
  .then((answers) => {
    switch (answers.action) {
      case 'View all departments':
        return viewAllDepartments();
         case 'View all roles':
          return viewAllRoles();
           case 'View all employees':
            return viewAllEmployees();
             case 'Add a department':
              return addDepartment();
               case 'Add a role':
                return addRole();
                 case 'Add an employee':
                  return addEmployee(); 
                   case 'Update an employee role':
                    return updateEmployee();   
    }
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });
}

start();

