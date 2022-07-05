const mongoose = require('mongoose');
const urlConnection = "mongodb+srv://anibalcastro:Web02@cluster0.e82klf0.mongodb.net/Workshops?retryWrites=true&w=majority"
const Employes = require('./models/employees.model');



mongoose.connect(urlConnection)
.then(() => {
    console.log('Connected to DB'); 
})
.catch((error) => {
    console.log('Connection failed!', error);
})

//Add employee
const addEmployee = async (req, res) => {
    const addedEmployee = new Employes({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        designation: req.body.designation,
        tags: req.body.tags,
        age: req.body.age
    });
    const result = await addedEmployee.save();

    res.json(result);
}

//Get employee
const getEmployee = async (req, res) => {
    const employee = await Employes.find().exec();
    res.json(employee);
}

//Delete employee
const deleteEmployee = async (req, res) => {
    const param = req.params.first_name;
    const employeeD = await Employes.deleteOne({first_name: param });

    res.json(employeeD);
}

//Update employee
const updateEmployee = async (req, res) => {
    const filter = {first_name: req.params.first_name}
    const update = {
        last_name: req.body.last_name,
        designation: req.body.designation,
        tags: req.body.tags,
        age: req.body.age
    }

    const employe = await Employes.findOneAndUpdate(filter, update);
    const upEmplo = await Employes.findOne(filter).exec();

    res.json({Resultado : employe, Modificacion: upEmplo});
}



exports.addedEmployee = addEmployee;
exports.getEmployee = getEmployee;
exports.updateEmployee = updateEmployee;
exports.deleteEmployee = deleteEmployee;