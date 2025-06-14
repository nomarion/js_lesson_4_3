'use strict';

const MIN_YEAR = 1900;
const MAX_YEAR = 2025;
const MIN_MAX_YEAR_ERROR_MESSAGE = `Год рождения должен быть от ${MIN_YEAR} до ${MAX_YEAR}`;
const QUESTION_YEAR_MESSAGE = 'Ваш год рождения?';
const QUESTION_CITY_MESSAGE = 'Укажите ваш город проживания?'
const QUESTION_SPORT_MESSAGE = 'Укажите ваш любимый вид спорта?'
const EXIT_YEAR_MESSAGE = 'Жалко год рождения указать? Ладно. Пока)'
const EXIT_CITY_MESSAGE = 'Жалко город указать? Ладно. Пока)'
const EXIT_SPORT_MESSAGE = 'Жалко вид спорта указать? Ладно. Пока)'
const NUMBER_ERROR = 'Укажите число!'
const CITY_VALIDATION_ERROR_MESSAGE = 'Укажите строку! Только кириллические символы! От 3 символов!'
const SPORT_VALIDATION_ERROR_MESSAGE = 'Укажите строку! От 2 символов!'

const SPORT_LIST_OBJECT = {'Футбол': 'Месси', 'Тенис': 'Шараповой', 'ММА': 'Макгрегором'};
const CAPITAL_ARRAY = ['Киев', 'Вашингтон', 'Лондон'];
const CITY_STRING_CHECK_REG = /^[А-Яа-яËё]{3,}$/;
const SPORT_STRING_CHECK_REG = /^[A-Za-zА-Яа-яËё]{2,}$/;
const CAPITAL_CITY_ANSWER_MESSAGE = (city) => `Ты живешь в столице, город ${city}`;
const CITY_ANSWER_MESSAGE = (city) => `Ты живешь в городе ${city}`
const AGE_ANSWER_MESSAGE = (age) => `Твой возраст: ${age}`
const SPORT_ANSWER_MESSAGE = (value) => `Круто! Хочешь стать ${value}`

const getUserProfile = () => {

    // Год
    let year = prompt(QUESTION_YEAR_MESSAGE);
    if (!exitCheck(year, EXIT_YEAR_MESSAGE)) {
        year = Number(year);
        if(yearValidator(year)) {
            // Год валидный, выводим окно
            alert(AGE_ANSWER_MESSAGE(new Date().getFullYear() - year));
        }
    }
    // Город
    let city = prompt(QUESTION_CITY_MESSAGE);
    if (!exitCheck(city, EXIT_CITY_MESSAGE)) {
        city = city.trim().charAt(0).toUpperCase() + city.slice(1);
        if(CITY_STRING_CHECK_REG.test(city)) {
            // Город валидный, проверяем на столицу
            if(CAPITAL_ARRAY.indexOf(city) > -1) {
                // Найдена столица
                alert(CAPITAL_CITY_ANSWER_MESSAGE(city));
            } else {
                // Обычный город
                alert(CITY_ANSWER_MESSAGE(city));
            }
        } else {
            alert(CITY_VALIDATION_ERROR_MESSAGE);
        }

    }
    // Спорт
    let sport = prompt(QUESTION_SPORT_MESSAGE);
    if (!exitCheck(sport, EXIT_SPORT_MESSAGE)) {
        sport = sport.trim().charAt(0).toUpperCase() + sport.slice(1);
        if(SPORT_STRING_CHECK_REG.test(sport)) {
            // Город валидный, проверяем на столицу
            if(sport in SPORT_LIST_OBJECT) {
                // Найден вид спорта
                alert(SPORT_ANSWER_MESSAGE(SPORT_LIST_OBJECT[sport]));
            }
            // не вывожу что указал юзер, в ДЗ не указано
        } else {
            alert(SPORT_VALIDATION_ERROR_MESSAGE);

        }
    }
};

// Валидация года рождения
const yearValidator = (year) => {
    if (Number.isInteger(year)) {
        if (year >= MIN_YEAR && year <= MAX_YEAR) {
            return true;
        }
        alert(MIN_MAX_YEAR_ERROR_MESSAGE)
        return false;
    }
    alert(NUMBER_ERROR);
    return false;
}

const exitCheck = (item, message) => {
    if (item === null) {
        alert(message);
        return true;
    }
    return false;
}

getUserProfile();
