const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');

// Employee routes
router.get('/', employeeController.getAllEmployees); // Get all employees
router.post('/', employeeController.createEmployee); // Create a new employee
router.get('/:eid', employeeController.getEmployeeById); // Get employee by ID
router.put('/:eid', employeeController.updateEmployee); // Update employee
router.delete('/', employeeController.deleteEmployee); // Delete employee

module.exports = router;
