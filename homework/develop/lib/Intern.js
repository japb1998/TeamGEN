// TODO: Write code to define and export the Intern class.  HINT: This class should inherit from Employee.
const Employee = require('./Employee');


class Intern extends Employee{
constructor (name,id,email,school){
    
    super(name,id,email)
    this.school = school;
    this.role = "Intern"
}
getRole(){
    return this.role;
}
getSchool(){
    return this.school;
}
} ; 
// const javier = new Intern('foo',12,'japb','usb')
module.exports = Intern
// console.log(javier)