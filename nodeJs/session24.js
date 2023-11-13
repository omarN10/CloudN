//objects

function create_car(manufacturer, model, capacity, tech, power, torque, color) {
  let car = {
    manufacturer: manufacturer,
    model: model,
    motor_capacity: capacity,
    motor_tech: tech,
    motor_power: power,
    motor_torque: torque,
    color: color,

    print_info: function () {
      let info =
        this.manufacturer +
        " " +
        this.model +
        "\n" +
        this.motor_capacity +
        " " +
        this.motor_tech +
        "\n" +
        this.motor_power +
        " " +
        this.motor_torque +
        "\n" +
        this.color +
        "\n" +
        "_________________";

      console.log(info);
    },
  };

  // car.print_info();
  return car;
}
// console.log(create_car("chevrolet","malibu",1500,"turbo", 163,250,"red"));
let malibu = create_car("Chevrolet", "malibu", 1500, "turbo", 163, 250, "red");
let avalon = create_car("Toyota", "avalon", 3200, "natural", 350, 450, "pearl");
let fusion = create_car("subaru", "impreza", 2000, "turbo", 200, 600, "blue");
malibu.print_info();
console.log("Break line");
console.log("________________");
// console.log(malibu.print_info);;
// avalon.print_info();
// fusion.print_info();
// console.log(malibu.print_info());
// console.log(malibu);
// console.log(car.manufacturer);
// car.print_info();

// print_info();

/* let manufacturer = "chevrolet";
let model = "malibu";
let motor_capacity = 1500;
let motor_tech = "turbo";
let motor_power = 163;
let motor_torque = 250;
let color = "red";

function print_info() {
    let info = manufacturer + " "+ model + "\n"
                +motor_capacity + " "+ motor_tech+ "\n"
                +motor_power + " "+motor_torque+ "\n"+ color
    console.log(info);
} */
//this is used for object scope
