const express = require('express');
const router = express.Router();
const employeeController = require('../../controllers/employeeController')
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');

router.route('/')
    //everyone can access the get route
    .get(employeeController.getAllEmployees)
    //only admins and editors can access the post 
    .post(verifyRoles(ROLES_LIST.Admin,ROLES_LIST.Editor), employeeController.createNewEmployees)
    .put( verifyRoles(ROLES_LIST.Admin,ROLES_LIST.Editor), employeeController.updateEmployees)
    //only admins can delete employees
    .delete( verifyRoles(ROLES_LIST.Admin) ,employeeController.deleteEmployees);

router.route('/:id')
    .get(employeeController.getEmployee);

module.exports = router;