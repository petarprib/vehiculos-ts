"use strict";
var car;
function createCar() {
    var plate = document.getElementById("plate").value;
    var brand = document.getElementById("brand").value;
    var color = document.getElementById("color").value;
    var showPlate = document.getElementById("show-plate");
    var showBrand = document.getElementById("show-brand");
    var showColor = document.getElementById("show-color");
    var plateError = document.getElementById("plate-error");
    var brandError = document.getElementById("brand-error");
    var colorError = document.getElementById("color-error");
    var wheels = document.getElementById("wheels");
    var validation = [];
    if (plate.length === 7 && !isNaN(plate.substring(0, 4)) && /^[a-zA-Z]+$/.test(plate.substring(4, 7))) {
        plateError.innerText = "";
        validation.push(true);
    }
    else {
        plateError.innerText = "The plate needs to have the following format: 1234ABC";
        validation.pop();
    }
    if (brand === "") {
        brandError.innerText = "This field is obligatory";
        validation.pop();
    }
    else {
        brandError.innerText = "";
        validation.push(true);
    }
    if (color === "") {
        colorError.innerText = "This field is obligatory";
        validation.pop();
    }
    else {
        colorError.innerText = "";
        validation.push(true);
    }
    if (validation.length === 3) {
        car = new Car(plate, brand, color);
        wheels.classList.remove("d-none");
        showPlate.innerText = car.plate;
        showBrand.innerText = car.brand;
        showColor.innerText = car.color;
    }
}
function addWheels() {
    var errors = [];
    for (var i = 1; i < 5; i++) {
        var diameter = parseFloat(document.getElementById("w" + i + "-diameter").value);
        if (diameter < 0.4 || diameter > 2) {
            errors.push(i);
        }
    }
    if (!errors.length) {
        for (var i = 1; i < 5; i++) {
            var brand = document.getElementById("w" + i + "-brand").value;
            var diameter = parseFloat(document.getElementById("w" + i + "-diameter").value);
            var showBrand = document.getElementById("show-w" + i + "-brand");
            var showDiameter = document.getElementById("show-w" + i + "-diameter");
            car.addWheel(new Wheel(brand, diameter));
            showBrand.innerText = car.wheels[i - 1].brand;
            showDiameter.innerText = car.wheels[i - 1].diameter.toString();
        }
    }
    else if (errors.length === 1) {
        alert("The diameter of wheel " + errors[0] + " is not correct");
    }
    else {
        alert("The diameters of wheels " + errors.join(", ") + " are not correct");
    }
}
