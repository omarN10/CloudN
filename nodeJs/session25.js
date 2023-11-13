//objects

let obj = {};

obj.name = "Object name";
obj.info = "testing";
obj.printInfo = function () {
  console.log(this.name, this.info);
  //   console.log(this.name + this.info);
};

// obj.printInfo();

// console.log(obj["name"]);
// obj["printInfo()"];
//bracket notation and dot notation in objects
/* 
let property = "info";
obj[property] = "new testing";
console.log(obj[property]); */

//constructor function

function Car(manu, model, capacity, tech, power, torque, color) {
  this.manufacturer = manu;
  this.model = model;
  this.capacity = capacity;
  this.tech = tech;
  this.power = power;
  this.torque = torque;
  this.color = color;
  this.printInfo = function () {
    var info =
      this.manufacturer +
      " " +
      this.model +
      " " +
      this.capacity +
      " " +
      this.tech +
      "\n" +
      this.power +
      " " +
      this.torque +
      " " +
      this.color +
      " " ;
      console.log(info);
  };
}
let honda = new Car("Honda", "Civic", 2000, "Natural", 158, 138, "red");
// honda.printInfo();
// console.log(honda.model);
// console.log(typeof(Car));