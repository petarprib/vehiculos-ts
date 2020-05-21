let car: Car;

function createCar() {
    let plate: string = (<HTMLInputElement>document.getElementById("plate")).value;
    let brand: string = (<HTMLInputElement>document.getElementById("brand")).value;
    let color: string = (<HTMLInputElement>document.getElementById("color")).value;
    let showPlate: HTMLElement = document.getElementById("show-plate");
    let showBrand: HTMLElement = document.getElementById("show-brand");
    let showColor: HTMLElement = document.getElementById("show-color");
    let plateError: HTMLElement = document.getElementById("plate-error");
    let brandError: HTMLElement = document.getElementById("brand-error");
    let colorError: HTMLElement = document.getElementById("color-error");
    let wheels: HTMLElement = document.getElementById("wheels");
    let validation: boolean[] = [];

    if (plate.length === 7 && !isNaN(plate.substring(0, 4)) && /^[a-zA-Z]+$/.test(plate.substring(4, 7))) {
        plateError.innerText = "";
        validation.push(true);
    } else {
        plateError.innerText = "The plate needs to have the following format: 1234ABC";
        validation.pop();
    }

    if (brand === "") {
        brandError.innerText = "This field is obligatory";
        validation.pop();
    } else {
        brandError.innerText = "";
        validation.push(true);
    }

    if (color === "") {
        colorError.innerText = "This field is obligatory";
        validation.pop();
    } else {
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
    let errors: number[] = [];

    for (let i = 1; i < 5; i++) {
        let diameter: number = parseFloat((<HTMLInputElement>document.getElementById(`w${i}-diameter`)).value);
        if (diameter < 0.4 || diameter > 2) {
            errors.push(i);
        }
    }

    if (!errors.length) {
        for (let i = 1; i < 5; i++) {
            let brand: string = (<HTMLInputElement>document.getElementById(`w${i}-brand`)).value;
            let diameter: number = parseFloat((<HTMLInputElement>document.getElementById(`w${i}-diameter`)).value);
            let showBrand: HTMLElement = document.getElementById(`show-w${i}-brand`);
            let showDiameter: HTMLElement = document.getElementById(`show-w${i}-diameter`);
            car.addWheel(new Wheel(brand, diameter));
            showBrand.innerText = car.wheels[i - 1].brand;
            showDiameter.innerText = car.wheels[i - 1].diameter.toString();
        }
    } else if (errors.length === 1) {
        alert(`The diameter of wheel ${errors[0]} is not correct`);
    } else {
        alert(`The diameters of wheels ${errors.join(", ")} are not correct`);
    }
}