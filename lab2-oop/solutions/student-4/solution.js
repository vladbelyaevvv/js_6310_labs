'use strict'

// ===== ЗАДАНИЕ 1: Базовый класс Vehicle =====
class Vehicle {
    // Создайте базовый класс Vehicle.
    // В конструкторе принимайте и сохраняйте в this свойства: 
    // make (марка), model (модель), year (год выпуска).
    constructor(make, model, year) {
        Vehicle.vehicleCount++;
        this.make = make;
        this.model = model;
        this.year = year;
    }

    // Добавьте метод displayInfo(), который выводит в консоль информацию 
    // о транспортном средстве в формате: "Марка: [make], Модель: [model], Год: [year]".
    displayInfo() {
        console.log(`Марка: ${this.make}, Модель: ${this.model}, Год: ${this.year}`);
    }

    // Добавьте геттер age, который возвращает возраст транспортного средства 
    // (текущий год минус год выпуска). Используйте new Date().getFullYear().
    get age() {
        let yearNow = new Date().getFullYear();
        return yearNow - this.year;
    }

    // Добавьте сеттер для года выпуска с проверкой: год не может быть больше текущего.
    set year(newYear) {
        const yearNow = new Date().getFullYear();
        if(newYear > yearNow){
            console.error("Год выпуска не может быть больше текущего");
            return;
        }
        this._year = newYear;
    }

    get year() {
        return this._year;
    }

    // Добавьте статический метод compareAge(vehicle1, vehicle2), 
    // который возвращает разницу в возрасте между двумя транспортными средствами.
    static compareAge(vehicle1, vehicle2) {
        return vehicle1.age - vehicle2.age;
    }

    static vehicleCount = 0;


    static getTotalVehicles(){
        return Vehicle.vehicleCount;
    }
}

// ===== ЗАДАНИЕ 2: Класс Car (наследуется от Vehicle) =====
class Car extends Vehicle {
    // Создайте дочерний класс Car, который наследуется от Vehicle.
    // Добавьте новое свойство numDoors (количество дверей).
    constructor(make, model, year, numDoors) {
        super(make, model, year);
        if (!Number.isInteger(numDoors) || numDoors <= 0) {
            console.error("numDoors должен быть положительным целым числом");
            numDoors = 4; // дефолт
        }
        this.numDoors = numDoors;
    }

    // Переопределите метод displayInfo() так, чтобы он также выводил количество дверей. 
    // Используйте super.displayInfo() для вызова метода родителя.
    displayInfo() {
        super.displayInfo();
        console.log(`Количество дверей ${this.numDoors}`);
    }

    // Добавьте метод honk(), который выводит "Beep beep!".
    honk() {
        console.log("Beep beep!");
    }
}

// ===== ЗАДАНИЕ 3: Класс ElectricCar (наследуется от Car) =====
class ElectricCar extends Car {
    // Создайте дочерний класс ElectricCar, который наследуется от Car.
    // Добавьте новое свойство batteryCapacity (емкость батареи в кВт·ч).
    constructor(make, model, year, numDoors, batteryCapacity) {
        super(make, model, year, numDoors);
        if (typeof batteryCapacity !== "number" || !Number.isFinite(batteryCapacity) || batteryCapacity <= 0) {
            throw new TypeError("batteryCapacity должен быть положительным числом");
        }
        this.batteryCapacity = batteryCapacity;
    }

    // Переопределите метод displayInfo() для вывода дополнительной информации о батарее.
    displayInfo() {
        super.displayInfo();
        console.log(`Емкость батареи: ${this.batteryCapacity}`);
    }

    // Добавьте метод calculateRange(), который рассчитывает примерный запас хода 
    // (предположим, что 1 кВт·ч = 6 км).
    calculateRange() {
        return this.batteryCapacity*6;
    }
}


// ===== ЗАДАНИЕ 4: Каррирование =====

// Создайте функцию createVehicleFactory, которая возвращает функцию 
// для создания транспортных средств определенного типа (каррирование).
const createVehicleFactory = (vehicleType) => (...args) => {
    return new vehicleType(...args); // Замените {} на варажение
};


// ===== ЗАДАНИЕ 5: Статические методы и свойства =====

// Добавьте статическое свойство vehicleCount в класс Vehicle 
// для подсчета количества созданных транспортных средств.
// Модифицируйте конструктор Vehicle для увеличения счетчика
// (добавьте в начало конструктора: Vehicle.vehicleCount++);
// Создайте статический метод getTotalVehicles(), 
// который возвращает общее количество созданных транспортных средств.


// Автоматические тесты
function runTests() {
    console.log('Запуск тестов...');

    // Расширьте тесты для полного покрытия задания.
    
    // Проверка наследования
    const vehicle = new Vehicle('Toyota', 'Camry', 2015);
    vehicle.displayInfo();
    console.log(`Возраст: ${vehicle.age} лет` + "\n");

    const oldYear = vehicle.year;
    vehicle.year = new Date().getFullYear() + 1; // будущий
    console.assert(vehicle.year === oldYear, "Сеттер year не должен принимать будущий год");
    
    const car = new Car('Honda', 'Civic', 2018, 4);
    car.displayInfo();
    car.honk();
    console.log(Vehicle.compareAge(vehicle, car) + "\n");
    console.assert(Vehicle.compareAge(vehicle, car) === (vehicle.age - car.age), "Тест функции compareAge");

    const d1 = Vehicle.compareAge(vehicle, car);
    const d2 = Vehicle.compareAge(car, vehicle);
    console.assert(d1 === -d2, "compareAge должен быть антисимметричным");
    
    const electricCar = new ElectricCar('Tesla', 'Model 3', 2020, 4, 75);
    electricCar.displayInfo();
    console.log(`Запас хода: ${electricCar.calculateRange()} км` + "\n");
    

    // Проверка возраста
    const testVehicle = new Vehicle('Test', 'Model', 2010);
    console.assert(testVehicle.age === (new Date().getFullYear() - 2010), 'Тест возраста провален');

    
    const createCarFactory = createVehicleFactory(Car);
    const myNewCar = createCarFactory('BMW', 'X5', 2022, 4);
    console.log('Создан новый автомобиль:');
    myNewCar.displayInfo();
    
    console.log('Всего создано транспортных средств:', Vehicle.getTotalVehicles());

    const beforeCount = Vehicle.getTotalVehicles();
    const oneMore = new Car('VW', 'Golf', 2019, 4); // создаём ещё одно ТС
    const afterCount = Vehicle.getTotalVehicles();
    console.assert(afterCount === beforeCount + 1, "vehicleCount должен увеличиваться при создании нового ТС");
    console.log('Всего создано транспортных средств (после добавления):', Vehicle.getTotalVehicles());
    

    const badDoors = new Car('Test', 'Doors', 2017, -1); // станет 4 по дефолту
    console.assert(badDoors.numDoors === 4, "numDoors должен быть положительным; ставим дефолт 4");

    console.log('Все тесты пройдены! ✅');
}

runTests();
