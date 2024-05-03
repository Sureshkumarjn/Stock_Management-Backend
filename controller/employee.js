const Employee = require("../models/employee");
const Purchase = require("../models/purchase");
const Sales = require("../models/sales");
const excel = require("exceljs");

// Add Post
const addEmployee = (req, res) => {
  console.log("req: ", req.body.userId);
  const addEmployee = new Employee({
    userID: req.body.userId,
    empnumber: req.body.empnumber,
    empname: req.body.empname,
    date: req.body.date,
    empcategory: req.body.empcategory,
    quantity: req.body.quantity,
    status: req.body.status,
    empdate: req.body.empdate,
    empot: req.body.empot,
  });


  addEmployee
    .save()
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(402).send(err);
    });
};

//Active Employee

const putActive = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(
      id,
      { status },
      { new: true } // Return the updated document
    );

    if (!updatedEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.status(200).json(updatedEmployee);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get All Employees
const getAllEmployees = async (req, res) => {
  const findAllEmployees = await Employee.find({
    userID: req.params.userId,
  }).sort({ _id: -1 }); // -1 for descending;
  res.json(findAllEmployees);
};

// Delete Selected Employee
const deleteSelectedEmployee = async (req, res) => {
  const deleteEmployee = await Employee.deleteOne({ _id: req.params.id });
  const deletePurchaseEmployee = await Purchase.deleteOne({
    EmployeeID: req.params.id,
  });

  const deleteSaleEmployee = await Sales.deleteOne({ ProductID: req.params.id });
  res.json({ deleteEmployee, deletePurchaseEmployee, deleteSaleEmployee });
};

// Update Selected Employee
const updateSelectedEmployee = async (req, res) => {
  try {
    const updatedResult = await Employee.findByIdAndUpdate(
      { _id: req.body.employeeID },
      {
        empnumber: req.body.empnumber,
        empname: req.body.empname,
        date: req.body.date,
        empcategory: req.body.empcategory,
        quantity: req.body.quantity,
        status: req.body.status,
        empdate: req.body.empdate,
        empot: req.body.empot,
      },
      { new: true }
    );
    console.log(updatedResult);
    res.json(updatedResult);
  } catch (error) {
    console.log(error);
    res.status(402).send("Error");
  }
};

// Search Employee
const searchEmployee = async (req, res) => {
  const searchTerm = req.query.searchTerm;
  const employees = await Employee.find({
    name: { $regex: searchTerm, $options: "i" },
  });
  res.json(employees);
};

// Get All Employee
const getExport = async (req, res) => {
  try {
    const users = await Product.find().sort({ createdAt: 1 });

    const workbook = new excel.Workbook();
    const worksheet = workbook.addWorksheet("Users");

    worksheet.columns = [
      { header: "Supplier Name", key: "name", width: 20 },
      { header: "Date", key: "date", width: 20 },
      { header: "Category", key: "category", width: 20 },
      { header: "Quantity", key: "quantity", width: 20 },
      { header: "Units", key: "units", width: 20 },
      { header: "Stock", key: "stock", width: 20 },
      { header: "Current Stock", key: "cstock", width: 20 },
      { header: "Description Of Good", key: "description", width: 40 },
      { header: "Created At", key: "createdAt", width: 20 },
    ];

    users.forEach((user) => {
      worksheet.addRow({
        name: user.name,
        date: user.date,
        category: user.category,
        quantity: user.quantity,
        units: user.units,
        stock: user.stock,
        cstock: user.cstock,
        description: user.description,
        createdAt: user.createdAt.toLocaleDateString(),
      });
    });
    const timestamp = new Date().toISOString().replace(/:/g, "-"); // Generate timestamp for filename
    const fileName = `users_${timestamp}.xlsx`; // Construct filename with timestamp
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(`Content-Disposition`, `attachment; filename="${fileName}"`);
    await workbook.xlsx.write(res);
    res.end();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  addEmployee,
  getAllEmployees,
  deleteSelectedEmployee,
  updateSelectedEmployee,
  searchEmployee,
  getExport,
  putActive,
};
