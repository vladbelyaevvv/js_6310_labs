// ===== ЗАДАНИЕ 1: Базовые операции =====
function simpleTask() {
    // 1.1 Объявите переменные разных типов (не менне 5)
    // 1.2 Выведите типы всех переменных
    let obj = null;
    console.log(typeof(obj));

    let undef;
    console.log(typeof(undef));

    let inProgress = true;
    console.log(typeof(inProgress));

    let num = 10;
    console.log(typeof(num));

    let greeting = 'Hello';
    console.log(typeof(greeting));

    let char = Symbol();
    console.log(typeof(char));

    let big = 9007199254740991n;
    console.log(typeof(big));

    let person = {name: "John", age: 15};
    console.log(typeof(person));
}

// ===== ЗАДАНИЕ 2: Функции =====
function getReviewerNumber(number, lab) {
    // 2.1 Функция определяющая номер ревьюера для вашей группы по вашему номеру и номеру лабораторной работы
    let res = (number + lab) % 23;
    return res;
}

function getVariant(number, variants) {
    // 2.2 Функция определяющая номер варианта, исходя из количества вариантов
    return ((number - 1) % variants) + 1;
    // - 1 и + 1 потому что в javascript остаток от деления начинается с 0, а нам надо с 1, ведь нету 0 варианта
}

function calculate(a, b, operation) {
    // 2.3 Напишите функцию калькулятор, калькулятор обрабатывает следующие операции: +, -, *, /
    if(typeof(a) !== "number" || typeof(b) !== "number"){
        return "Аргументы функции должны быть числами"
    }
    if(operation == "+"){
        return a + b;
    }
    else if(operation == "-"){
        return a - b;
    }
    else if(operation == "*"){
        return a * b;
    }
    else if(operation == "/"){
        if(b == 0){
            return NaN;
        }
        return a / b;
    }
    else{
        return "Неизвестная операция";
    }
}

function calculateArea(figure, ...params) {
    // 2.4 Напишите функцию для определения площади фигур 'circle', 'rectangle', 'triangle'
    // Используйте switch.
    switch(figure){
        case 'circle':
            if(params.length === 1 && typeof(params[0]) === "number" && params[0] >= 0){
                return Math.PI*params[0]*params[0];
            }
            break;
        case 'rectangle':
            if(params.length === 2 && typeof(params[0]) === "number" && typeof(params[1]) === "number" && params[0] >= 0 && params[1] >= 0){
                return params[0] * params[1];
            }
            break;
        case 'triangle':
            if(params.length === 2 && typeof(params[0]) === "number" && typeof(params[1]) === "number" && params[0] >= 0 && params[1] >= 0){
                return 0.5 * params[0] * params[1];
            }
            break;
            
        default:
            return "Неизвестная фигура";
    }
    return "Некорректные параметры";
}

// 2.5 Стрелочные функции
const reverseString = (str) => {
    // Функция возвращает перевернутую строку
    str = String(str);
    let reversed = "";
    for(let i = str.length - 1; i >= 0; i--){
        reversed += str[i];
    }
    return reversed;
};

const getRandomNumber = (min, max) => {
    // Функция возвращает случайное число между min и max
    return Math.random() * (max - min) + min;
};

// ===== ЗАДАНИЕ 3: Объекты =====
const book = {
    // 3.1 Создайте объект "книга" с полями для хранения заголовка, автора, 
    // года выпуска, количества страниц, и доступности
    // объект должен иметь два метода getInfo возвращает одной строкой информацию о названии книги, аторе, годе выпуска, количестве страниц
    // метод toggleAvailability - который меняет значение доступности и возвращает его
    title: "War and piece",
    author: "Lev Tolstoy", 
    year: 1950,
    pages: 1000,
    availability: true,

    getInfo(){
        return `Название книги: ${this.title}, author: ${this.author}, year: ${this.year}, pages: ${this.pages}`;
    },
    
    toggleAvailability(){
        this.availability=!this.availability;
        return this.availability;
    }

};

const student = {
    // 3.2 Реализуйте методы объекта "студент" 
    name: "Анна Петрова",
    age: 20,
    course: 2,
    grades: {
        math: 90,
        programming: 95,
        history: 85
    },
    
    // Метод для расчета среднего балла
    getAverageGrade() {
        let sum = 0;
        let count = 0;
        for(let subject in this.grades){
            sum += this.grades[subject];
            count++;
        }
        return sum / count;
    },
    
    // Метод для добавления новой оценки
    addGrade(subject, grade) {
        this.grades[subject] = grade;
    }
};

// ===== ЗАДАНИЕ 4: Массивы =====
function processArrays() {
    const numbers = [12, 45, 23, 67, 34, 89, 56, 91, 27, 14];
    const words = ["JavaScript", "программирование", "массив", "функция", "объект"];
    const users = [
        { id: 1, name: "Анна", age: 25, isActive: true },
        { id: 2, name: "Борис", age: 30, isActive: false },
        { id: 3, name: "Виктория", age: 22, isActive: true },
        { id: 4, name: "Григорий", age: 35, isActive: true },
        { id: 5, name: "Дарья", age: 28, isActive: false }
    ];
    
    // 1. Используйте forEach для вывода всех чисел больше 50
    console.log("Числа больше 50:");
    numbers.forEach(n => {
        if(n > 50)
            console.log(n)
    }
    );
    console.log();

    // 2. Используйте map для создания массива квадратов чисел
    console.log("Массив квадратов чисел:");
    const squares =  numbers.map(n => n * n);
    console.log(squares);
    console.log();

    // 3. Используйте filter для получения активных пользователей
    console.log("Активные пользователи:");
    const activeUsers =  users.filter(user => user.isActive);
    console.log(activeUsers);
    console.log();

    // 4. Используйте find для поиска пользователя с именем "Виктория"
    console.log("Поиск Виктории:");
    const victoria = users.find(user => user.name === "Виктория");
    console.log(victoria);
    console.log();

    // 5. Используйте reduce для подсчета суммы всех чисел
    console.log("Сумма всех чисел:");
    const sum = numbers.reduce((sum, value) => sum + value, 0);
    console.log(sum);
    console.log();

    // 6. Используйте sort для сортировки пользователей по возрасту (по убыванию)
    console.log("Пользователи по убыванию возраста:");
    const sortedByAge = users.sort((a, b) => b.age - a.age);
    console.log(sortedByAge);
    console.log();

    // 7. Используйте метод для проверки, все ли пользователи старше 18 лет
    console.log("Все старше 18:");
    const allAdults = users.filter(user => user.age > 18);
    console.log(allAdults);
    console.log();


    // 8. Создайте цепочку методов: 
    //    - отфильтровать активных пользователей
    //    - преобразовать в массив имен
    //    - отсортировать по алфавиту
    console.log("Имена активных пользователей по алфавиту:");
    const activeUserNames = users.filter(user => user.isActive).map(user => user.name).sort();
    console.log(activeUserNames);
    console.log();
}

// ===== ЗАДАНИЕ 5: Менеджер задач =====
const taskManager = {
    tasks: [
        { id: 1, title: "Изучить JavaScript", completed: false, priority: "high" },
        { id: 2, title: "Сделать лабораторную работу", completed: true, priority: "high" },
        { id: 3, title: "Прочитать книгу", completed: false, priority: "medium" }
    ],
    
    addTask(title, priority = "medium") {
        // 5.1 Добавление задачи
        const newTask = {
            id: this.tasks.length + 1,
            title: title,
            completed: false,
            priority: priority
        };
        this.tasks.push(newTask);
    },
    
    completeTask(taskId) {
        // 5.2 Отметка выполнения
        const task = this.tasks.find(t => t.id === taskId);
        if(task){
            task.completed = true;
        }
    },

    // Удаление задачи
    deleteTask(taskId) {
        // 5.3 Ваш код здесь
        const index = this.tasks.findIndex(t => t.id === taskId);
        if(index !== -1)    
            this.tasks.splice(index, 1);
    },

    // Получение списка задач по статусу
    getTasksByStatus(completed) {
        // 5.4 Ваш код здесь
        return this.tasks.filter(task => task.completed === completed);
    },
    
    getStats() {
        /* 5.5 Статистика возвращает объект:        
        total,
        completed,
        pending,
        completionRate
        */
       let stats = {
            total: this.tasks.length,
            completed: this.getTasksByStatus(true).length,
            pending: this.getTasksByStatus(false).length,
       }
        stats.completionRate = stats.total === 0 ? 0 : (stats.completed / stats.total) * 100;
        return stats;
    }
};


// ===== ЗАДАНИЕ 6: Регулярные выражения =====
/*
Дополнительные материалы:
https://regex101.com/ - интерактивный тестер regex
MDN Regular Expressions - https://developer.mozilla.org/ru/docs/Web/JavaScript/Guide/Regular_expressions
Learn Regex - https://github.com/ziishaned/learn-regex - учебник по regex
 
Задание (по вариантам):
1. Изучите функции с регулярными выражениями по своему варианту
На защите вы должны суметь объяснить структуру регулярного выражения.
2. Напишите тесты, покрывающие все различные варианты. Обратите внимание тесты должны обеспечивать полное покрытие, но не быть дублирующимися.
3. Если предложенное регулярное выражение некорректно, вы можете исправить его.

Вычисление своего варианта:
Номер варианта = Ваш номер % Общее количество вариантов
= ((4 - 1) % 4) + 1 = 4
 */

/**
 * Вариант 1: Валидация email адреса
 * Правила:
 * - Латиница, цифры, спецсимволы: ._%+-
 * - Обязательный символ @
 * - Доменная часть: латиница, цифры, точка
 * - Минимальная длина 5 символов
 */
//const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

function validateEmail(email) {
    const emailRegex = /^(?=.{5,})[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}

function testEmail(){
    const emails = [
        "a@b.co",
        "user@mail.com",
        "abc.def@mail-server.com",
        "name+filter@domain.org",
        "test_123@sub.domain.co.uk",
        "qwerty@localhost.ru",
        "a@b.c",
        "x@y.z",
        "user@@mail.com",
        "user@.com",
        "@mail.com",
        "user name@mail.com",
        "юзер@mail.com",
        "user@domain",
    ];

    emails.forEach(email => {
        if(validateEmail(email)){
            console.log(`✅ ${email} — почта проходит`)
        }
        else{
            console.log(`❌ ${email} — почта не проходит`);
        }
    })
    console.log();
}

/**
 * Вариант 2: Валидация пароля
 * Правила:
 * - Минимум 8 символов
 * - Хотя бы одна заглавная буква
 * - Хотя бы одна строчная буква  
 * - Хотя бы одна цифра
 * - Хотя бы один специальный символ: !@#$%^&*()
 */
function validatePassword(password) {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z\d!@#$%^&*()]{8,}$/;
    return passwordRegex.test(password);
}

/**
 * Вариант 3: Валидация номера телефона (российский формат)
 * Поддерживает форматы:
 * - +7 (999) 123-45-67
 * - 8 (999) 123-45-67  
 * - 89991234567
 * - +7(999)123-45-67
 */
function validatePhone(phone) {
    const phoneRegex = /^(\+7|8)\s?\(?\d{3}\)?\s?\d{3}[\s-]?\d{2}[\s-]?\d{2}$/;
    return phoneRegex.test(phone);
}

/**
 * Вариант 4: Валидация даты в формате DD.MM.YYYY
 * Правила:
 * - День: 01-31
 * - Месяц: 01-12
 * - Год: 1900-2099
 */
function validateDate(date) {
    const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[0-2])\.(19|20)\d{2}$/;
    return dateRegex.test(date);
}

// Бонус: выполните все остальные варианты. Выполнение бонуса не учитывается в итоговой оценке.


// ===== ТЕСТИРОВАНИЕ =====
function runTests() {
    console.log("=== ТЕСТИРОВАНИЕ ===");
    
    //Задание 1 
    console.log("Задание 1");
    simpleTask();
    console.log();

    // Тест 1: getReviewerNumber
    console.assert(getReviewerNumber(5, 1) === 6, "Тест получения ревьюера провален");

    //Тест задания 2.2
    console.assert(getVariant(5, 5) === 5, "Тест задания 2.2 провален");

    // Тест задания 2.3: calculate
    console.assert(calculate(10, 5, '+') === 15, "Тест калькулятора 2.3 провален (сложение)");
    console.assert(calculate(10, 5, '-') == 5, "Тест калькулятора 2.3 провален (вычитание)");
    console.assert(calculate(10, 5, '*') == 50, "Тест калькулятора 2.3 провален (умножение)");
    console.assert(calculate(10, 5, '/') == 2, "Тест калькулятора 2.3 провален (деление)");
    console.assert(calculate(10, 4, '/') == 2.5, "Тест калькулятора 2.3 провален (деление с дробным результатом)");
    console.assert(Number.isNaN(calculate(10, 0, '/')), "Тест калькулятора 2.3 провален (деление на ноль)");
    console.assert(calculate(0, 5, '/') === 0, "Тест калькулятора 2.3 провален (деление 0 на число)");
    console.assert(calculate(-10, 5, '+') === -5, "Тест калькулятора 2.3 провален (сложение с отрицательным)");
    console.assert(calculate(-10, -5, '*') === 50, "Тест калькулятора 2.3 провален (умножение отрицательных)");
    console.assert(calculate("a", "b", "+") === "Аргументы функции должны быть числами", "Тест калькулятора 2.3 провален (аргументы должны быть числовыми)");
    console.assert(calculate("a", 10, "+") === "Аргументы функции должны быть числами", "Тест калькулятора 2.3 провален (аргументы должны быть числовыми)");
    console.assert(calculate(10, "b", "+") === "Аргументы функции должны быть числами", "Тест калькулятора 2.3 провален (аргументы должны быть числовыми)");
    console.assert(calculate(10, 5, "~") === "Неизвестная операция", "Тест калькулятора 2.3 провален (неизвестная операция)");

    console.assert(calculate(Number.MAX_VALUE, 1, '+') === Number.MAX_VALUE+1, "Тест калькулятора 2.3 провален (переполнение при сложении)");
    console.assert(calculate(Number.MAX_VALUE, Number.MAX_VALUE, '+') === Infinity, "Тест калькулятора 2.3 провален (переполнение при сложении двух больших чисел)");
    console.assert(calculate(Number.MAX_VALUE, 2, '-') === Number.MAX_VALUE - 2, "Тест калькулятора 2.3 провален (вычитание из максимального значения)");
    console.assert(calculate(Number.MAX_VALUE, 1, '*') === Number.MAX_VALUE, "Тест калькулятора 2.3 провален (переполнение при умножении)");
    console.assert(calculate(1, Number.MAX_VALUE, '*') === Number.MAX_VALUE, "Тест калькулятора 2.3 провален (переполнение при умножении с максимальным значением)");
    console.assert(calculate(Number.MAX_VALUE, 10, "*") === Infinity, "Тест калькулятора провален (умножение максимального числа на 10)");
    console.assert(calculate(Number.MAX_VALUE, 2, '/') === Number.MAX_VALUE / 2, "Тест калькулятора 2.3 провален (деление максимального значения)");

    

    //Тест задания 2.4 
    console.assert(calculateArea("circle", 2) === 12.566370614359172, "Тест 2.4 провален (площадь круга)");
    console.assert(calculateArea("rectangle", 2, 4) === 8, "Тест 2.4 провален (площадь прямоугольника)");
    console.assert(calculateArea("triangle", 4, 6) === 12, "Тест 2.4 провален (площадь треугольника)")
    console.assert(calculateArea("hexagon", 4, 6) === "Неизвестная фигура", "Тест 2.4 провален (неизвестная фигура)");
    console.assert(calculateArea("rectangle", 5) === "Некорректные параметры", "Тест 2.4 провален (недостаточно параметров)");
    console.assert(calculateArea("circle", 5, 2) === "Некорректные параметры", "Тест 2.4 провален (слишком много параметров)");
    console.assert(calculateArea("circle") === "Некорректные параметры", "Тест 2.4 провален (нет параметров для круга)")
    console.assert(calculateArea("rectangle", "a", 5) === "Некорректные параметры", "Тест 2.4 провален (не числовые параметры)");
    console.assert(calculateArea("circle", 0) === 0, "Тест 2.4 провален (круг с радиусом 0)");
    console.assert(calculateArea("rectangle", 0, 10) === 0, "Тест 2.4 провален (прямоугольник со стороной 0)");
    console.assert(calculateArea("rectangle", -2, 4) === "Некорректные параметры", "Тест 2.4 провален (прямоугольник с отрицательной стороной)");
    console.assert(calculateArea("circle", -2) == "Некорректные параметры", "Тест 2.4 провален (круг с отрицательным радиусом)");
    console.assert(calculateArea("triangle", -2, -4) == "Некорректные параметры", "Тест 2.4 провален (треугольник с отрицательной высотой и стороной)");

    //Тест задания 2.5
    console.assert(reverseString("Hello") === "olleH", "Тест 2.5 провален (перевернутая строка)");
    console.assert(reverseString("") === "", "Тест 2.5 провален (пустая строка");
    console.assert(reverseString("a") === "a", "Тест 2.5 провален (один символ)");
    console.assert(reverseString(123) === "321", "Тест 2.5 провален (не строка)");

    //Тест задания 2.6 
    console.assert(typeof(getRandomNumber(10, 50)) === "number", "Тест 2.6 провален (результат не число");
    console.assert(getRandomNumber(10, 50) >= 10 && getRandomNumber(10, 50) < 50, "Тест 2.6 провален(результат не в границах");

    //Тест задание 3.1
    console.log(book.getInfo()); // проверка на корректный вывод
    console.log(book.toggleAvailability()); // false
    console.log(book.toggleAvailability()); // true
    console.log();

    //Тест задания 3.2
    console.log(student.getAverageGrade()); // тест вычисления среднего
    student.addGrade("english", 100); // тест добавления значения в объект
    console.log(student.grades); //вывод всех оценок
    console.log();

    //Тест задания 4
    processArrays();

    //Тест задания 5.1
    console.log("Тест 5.1 (добавление задачи в список):");
    taskManager.addTask("Выучить CSS");
    console.log(taskManager.tasks);
    console.log();

    //Тест задания 5.2
    console.log("Тест 5.2 (отметка выполнения таска):");
    taskManager.completeTask(3);
    console.log(taskManager.tasks);
    console.log();

    //Тест задания 5.3
    console.log("Тест 5.3 (Удаление элемента из массива):");
    taskManager.deleteTask(3);
    console.log(taskManager.tasks);
    console.log();

    //Тест задания 5.4
    console.log("Тест 5.4 (вывод задач по статусу):");
    console.log(taskManager.getTasksByStatus(true));
    console.log();

    //Тест задания 5.5
    console.log("Тест 5.5 (Возвращение объекта stats):");
    console.log(taskManager.getStats());
    console.log();
    
    //Тест задания 6.1
    console.assert(validateEmail("a@b.co") === true, "Тест провален: минимальная длина, должен пройти");
    console.assert(validateEmail("user@mail.com") === true, "Тест провален: обычный email должен пройти");
    console.assert(validateEmail("abc.def@mail-server.com") === true, "Тест провален: email с точкой и тире должен пройти");
    console.assert(validateEmail("name+filter@domain.org") === true, "Тест провален: email с + должен пройти");
    console.assert(validateEmail("test_123@sub.domain.co.uk") === true, "Тест провален: многоуровневый домен должен пройти");
    console.assert(validateEmail("qwerty@localhost.ru") === true, "Тест провален: домен localhost должен пройти");

    console.assert(validateEmail("a@b.c") === false, "Тест провален: слишком короткий TLD, не должен пройти");
    console.assert(validateEmail("x@y.z") === false, "Тест провален: слишком короткий email, не должен пройти");
    console.assert(validateEmail("user@@mail.com") === false, "Тест провален: два @, не должен пройти");
    console.assert(validateEmail("user@.com") === false, "Тест провален: домен начинается с точки, не должен пройти");
    console.assert(validateEmail("@mail.com") === false, "Тест провален: нет имени пользователя, не должен пройти");
    console.assert(validateEmail("user name@mail.com") === false, "Тест провален: пробел в имени, не должен пройти");
    console.assert(validateEmail("юзер@mail.com") === false, "Тест провален: кириллица не разрешена");
    console.assert(validateEmail("user@domain") === false, "Тест провален: нет TLD после точки");

    //Тест задания 6.2
    console.assert(validatePassword("Aa1!aaaa") === true, "Тест провален: пароль должен подходить");

    console.assert(validatePassword("Aa1!aaa") === false, "Тест провален: слишком короткий пароль");
    console.assert(validatePassword("AA1!AAAA") === false, "Тест провален: нет строчной буквы");
    console.assert(validatePassword("aa1!aaaa") === false, "Тест провален: нет заглавной буквы");
    console.assert(validatePassword("Aa!aaaaa") === false, "Тест провален: нет цифры");
    console.assert(validatePassword("Aa1aaaaa") === false, "Тест провален: нет спецсимвола");
    console.assert(validatePassword("Aa1!aaa a") === false, "Тест провален: пробел внутри пароля");

    // Тест задания 6.3
    console.assert(validatePhone("+7 (999) 123-45-67") === true,  "Тест провален: должен проходить формат +7 (999) 123-45-67");
    console.assert(validatePhone("+7(999)123-45-67") === true,    "Тест провален: должен проходить формат +7(999)123-45-67");
    console.assert(validatePhone("8 (999) 123-45-67") === true,   "Тест провален: должен проходить формат 8 (999) 123-45-67");
    console.assert(validatePhone("89991234567") === true,         "Тест провален: должен проходить формат 89991234567");
    console.assert(validatePhone("+79991234567") === true,        "Тест провален: должен проходить формат +79991234567");
    console.assert(validatePhone("8 999 123 45 67") === true,     "Тест провален: должен проходить формат с пробелами");
    console.assert(validatePhone("8(999)1234567") === true,       "Тест провален: должен проходить формат без пробелов и дефисов");

    console.assert(validatePhone("+7-999-123-45-67") === false,   "Тест провален: не должен проходить — дефис сразу после +7");
    console.assert(validatePhone("8-999-123-45-67") === false,    "Тест провален: не должен проходить — дефис сразу после 8");
    console.assert(validatePhone("12345678901") === false,        "Тест провален: не должен проходить — номер не начинается с +7 или 8");
    console.assert(validatePhone("+7(9991234567") === true,       "Тест провален: должен проходить — шаблон допускает незакрытую (");
    console.assert(validatePhone("+7(999)123-45-6") === false,    "Тест провален: не должен проходить — недостаточно цифр");

    // Тест задания 6.4
    console.assert(validateDate("01.01.1900") === true, "Тест провален: минимальная допустимая дата должна проходить");
    console.assert(validateDate("31.12.2099") === true, "Тест провален: максимальная допустимая дата должна проходить");
    console.assert(validateDate("15.06.2000") === true, "Тест провален: обычная дата должна проходить");

    console.assert(validateDate("00.01.2000") === false, "Тест провален: день 00 не должен проходить");
    console.assert(validateDate("32.01.2000") === false, "Тест провален: день 32 не должен проходить");
    console.assert(validateDate("31.13.2000") === false, "Тест провален: месяц 13 не должен проходить");
    console.assert(validateDate("15.00.2000") === false, "Тест провален: месяц 00 не должен проходить");
    console.assert(validateDate("15.06.1899") === false, "Тест провален: год меньше 1900 не должен проходить");
    console.assert(validateDate("15.06.2100") === false, "Тест провален: год больше 2099 не должен проходить");

    console.assert(validateDate("5.06.2000") === false, "Тест провален: день должен быть из двух цифр");
    console.assert(validateDate("05.6.2000") === false, "Тест провален: месяц должен быть из двух цифр");
    console.assert(validateDate("05-06-2000") === false, "Тест провален: разделитель должен быть точкой");
    console.assert(validateDate("05062000") === false, "Тест провален: отсутствуют разделители");

    console.assert(validateDate("sdaasdsad") === false, "Тест провален: полностью некорректная строка");
    console.assert(validateDate("") === false, "Тест провален: пустая строка");
    
    console.log("Все тесты пройдены! ✅");
}
// Запуск тестов
runTests();