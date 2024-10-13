const Employee = require('../models/employeeModel');

// Get all employees
exports.getAllEmployees = async (req, res) => {
    try {
        const employees = await Employee.find();
        res.status(200).json(employees);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching employees', error });
    }
};

// Create a new employee
exports.createEmployee = async (req, res) => {
    const { first_name, last_name, email, position, salary, date_of_joining, department } = req.body;

    const newEmployee = new Employee({
        first_name,
        last_name,
        email,
        position,
        salary,
        date_of_joining,
        department,
        created_at: new Date(),
        updated_at: new Date()
    });

    try {
        const savedEmployee = await newEmployee.save();
        res.status(201).json({ message: 'Employee created successfully.', employee_id: savedEmployee._id });
    } catch (error) {
        res.status(500).json({ message: 'Error creating employee', error });
    }
};

// Get employee by ID
exports.getEmployeeById = async (req, res) => {
    const { eid } = req.params;
    try {
        const employee = await Employee.findById(eid);
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.status(200).json(employee);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching employee', error });
    }
};

// Update employee
exports.updateEmployee = async (req, res) => {
    const { eid } = req.params;
    try {
        const updatedEmployee = await Employee.findByIdAndUpdate(eid, { ...req.body, updated_at: new Date() }, { new: true });
        if (!updatedEmployee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.status(200).json({ message: 'Employee details updated successfully.', updatedEmployee });
    } catch (error) {
        res.status(500).json({ message: 'Error updating employee', error });
    }
};

// Delete employee
exports.deleteEmployee = async (req, res) => {
    const { eid } = req.query;
    try {
        const deletedEmployee = await Employee.findByIdAndDelete(eid);
        if (!deletedEmployee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.status(201).json({ message: 'Employee deleted successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting employee', error });
    }
};
