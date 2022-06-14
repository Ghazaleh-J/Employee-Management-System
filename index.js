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
    type: 'list',
    choices
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
    console.log(results)
    console.log('----------- DEPARTMENTS -----------')
    setTimeout(start, 5000)
  })
}

const viewAllRoles = ()=> {
  db.query('SELECT * FROM role').then(results => {
    console.log('----------- Roles -----------')
    console.log(results)
    console.log('----------- Roles -----------')
    setTimeout(start, 5000)
  })
}

const viewAllEmployees = ()=> {
  db.query('SELECT * FROM employee').then(results => {
    console.log('----------- Employees -----------')
    console.log(results)
    console.log('----------- Employees -----------')
    setTimeout(start, 5000)
  })
}

const addDepartment = ()=> {
// before writing query, we need inquirer to gather info on new department


}


const addRole = ()=> {


}


const addEmployee = ()=> {
// before writing query, we need inquirer to gather info on new employee
// we need all the current role ids, to allow user to choose a role_id that is in the role table
// we need all the current employee ids, to choose a manager_id

db.query('SELECT id, title FROM role').then(results => {
  console.table(results);
  // Convert results to an array of choices for inquirer prompt

  const choices = results.map(role => {
    return {
      name: role.title,
      value: role.id
    }
  });
 
  console.log("CHOICES MADE FOR INQUIRER PROMPT ---", choices)

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
      type: 'list',
      choices
    },
    {
      name: 'manager',
      message: 'Who is the manager?'
    },
  
  ]

  inquirer.prompt(addEmployeePrompt)
  .then(results => {
    console.log("RESULTS ---", results)
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

