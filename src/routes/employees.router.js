const express = require('express');
const employees = require("../utils/employees.storage");
const {ReasonPhrases, StatusCodes, RESET_CONTENT} = require("http-status-codes");
const mongoosedb = require('../mongoose');

const router = express.Router();

router.post('/employees', mongoosedb.addedEmployee);
router.get('/employees', mongoosedb.getEmployee);
router.put('/employees/:first_name', mongoosedb.updateEmployee)
router.delete('/employees/:first_name', mongoosedb.deleteEmployee);

//Get all employees
//Ready
/*
router.get('/', (req, res) => {
    console.log(employees);
    res.status(StatusCodes.OK).json({
        message: ReasonPhrases.OK,
        data: employees
    })
})
*/


//Add employees
//Ready
/*
router.post('/', (req, res) => {
    //console.log(req.body);
    const new_first_name = req.body.first_name || req.body.firstName;     
    const new_last_name = req.body.last_name|| req.body.lastName;  ;
    const new_designation = req.body.designation;
    const new_tags = req.body.tags || req.body.tag;  
    const new_age = req.body.age;

    console.log(new_tags);

    employees.push(
        {
            first_name: new_first_name,
            last_name: new_last_name,
            designation: new_designation,
            tags: new_tags,
            age: new_age
        });

    res.status(StatusCodes.CREATED).json({message: ReasonPhrases.CREATED})
})
*/

//Add new tag for any employeed
//Ready
/*
router.post('/:first_name', (req,res) => {
    const nameParam = req.params.first_name;
    const newTag = req.body.tags || req.body.tag;
    console.log(Array.isArray(newTag));
    console.log(newTag.length);

    const employeeIndex = employees.findIndex((employees)=> employees.first_name === nameParam);

    if (employeeIndex!== -1){
        if(Array.isArray(newTag)){
            for(let x in newTag){
                employees[employeeIndex].tags.push(newTag[x]);
            }
        }
        else{
            employees[employeeIndex].tags.push(newTag);
        }
        res.status(StatusCodes.ACCEPTED).json({ message: ReasonPhrases.ACCEPTED, data: employees[employeeIndex]});
    }
    else{
        res.status(StatusCodes.NOT_FOUND).json({ message: ReasonPhrases.NOT_FOUND });
    }


})
*/

//Delete employees 
//Ready
/*
router.delete("/:first_name", (req,res) =>{
    const nameParam = req.params.first_name;
    const employeeIndex = employees.findIndex((employees) => employees.first_name === nameParam);
    if(employeeIndex!==-1){
        deletedEmployee = employees.splice(employeeIndex, 1);
        res.status(StatusCodes.OK).json({message: ReasonPhrases.OK, data: deletedEmployee[0]});
    }
    else{
        res.status(StatusCodes.NOT_FOUND).json({message: ReasonPhrases.NOT_FOUND});
    }

})
*/
//Update data
//Ready
router.put("/:firt_name", (req, res) =>{
    const nameParam = req.params.first_name;

    const newName = req.body.first_name;
    const newLastName = req.body.last_name;
    const newDesignation = req.body.designation;
    const newAge = req.body.age;

    const employeesIndex = employees.findIndex((employees) => employees.first_name === nameParam);
    if (employeesIndex!== -1){
        employees[employeesIndex] = {
            first_name: newName,
            last_name: newLastName,
            designation: newDesignation,
            tags: employees[employeesIndex].tags,
            age: newAge
        };
        res.status(StatusCodes.OK).json({message: ReasonPhrases.OK, data: cats[catIndex]});
    }
    else{
        res.status(StatusCodes.NOT_FOUND).json({message: ReasonPhrases.NOT_FOUND});
    }
})

//Delete employeed
//Ready
router.delete("/:first_name", (req,res) =>{
    const nameParam = req.params.first_name;
    const employeeIndex = employees.findIndex((employees) => employees.first_name === nameParam);

    if (employeeIndex !== -1){
        deletedEmployee = employees.splice(employeeIndex, 1);
        res.status(StatusCodes.OK).json({message: ReasonPhrases.OK, data: deletedEmployee[0]});
    }
    else{
        res.status(statusCodes.NOT_FOUND).json({message: ReasonPhrases.NOT_FOUND, data: 'TRY AGAIN'});
    }


})

//Get employeed by any tag.
//Ready
router.get('/:tags', (req, res)=>{
    const tagsParam = req.params.tags;
    const filterEmployes = [];

    for (let x in employees){
        if (employees[x].tags.find(tags => tags == tagsParam)){
            filterEmployes.push(employees[x]);
        }
    }
  
    console.log(filterEmployes);

    if(filterEmployes) {

        res.status(StatusCodes.OK).json({
            message: ReasonPhrases.OK,
            data: filterEmployes
        })
    }
    else{
        res.status(StatusCodes.NOT_FOUND).json({
            message: ReasonPhrases.NOT_FOUND,
        })
    }

})


module.exports = router;

//npm install --save mongodb
//npm install ---save mongoose