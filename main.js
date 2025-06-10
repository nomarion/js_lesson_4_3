import {ExitException} from "./exit-exception.js";

'use strict';

const MIN_YEAR = 1900;
const MAX_YEAR = 2025;
const MIN_MAX_YEAR_TEXT = `Год рождения должен быть от ${MIN_YEAR} до ${MAX_YEAR}`;
const CITY = ['Киев', 'Вашингтон', 'Лондон'];
const ANSWER_YEAR = 'Ваш год рождения?';
const ANSWER_CITY = 'Укажите ваш город проживания?'
const ANSWER_SPORT = 'Укажите ваш любимый вид спорта?'
const EXIT_YEAR = 'Жалко год рождения указать? Ладно. Пока)'
const EXIT_CITY = 'Жалко город указать? Ладно. Пока)'
const EXIT_SPORT = 'Жалко вид спорта указать? Ладно. Пока)'
const NUMBER_ERROR = 'Укажите число!'
const STRING_ERROR = 'Укажите строку! Только кириллические символы!'
const EXISTS_CITY = 'Ты живешь в столице: '
const NOT_EXISTS_CITY = 'Ты живешь в: '
const AGE = 'Твой возраст: '
const SPORT_ANSWER = 'Круто! Хочешь стать '
const sportMap = new Map();

/*
---------
| Не ругайте, выполняю логику только когда переданы все данные от юзера, а не после каждого нажатия ОК.
| Если критично, могу переделать =)
| Дополнительные задания включены.
---------
*/

const handler = () => {
    sportMap.set('Футбол', 'Месси');
    sportMap.set('Тенис', 'Шараповой');
    sportMap.set('ММА', 'Макгрегором');

    const year = getYearAndValidator();
    const city = inputStringValidator(ANSWER_CITY, EXIT_CITY);
    const sport = inputStringValidator(ANSWER_SPORT, EXIT_SPORT);

    if (year && city && sport) {
        // Формируем строку по спортику, если он есть в мапе
        const sportUpper = sport.charAt(0).toUpperCase() + sport.slice(1);
        let sportString = '';
        if (sportMap.has(sportUpper)) {
            sportString = '\n' + SPORT_ANSWER + sportMap.get(sportUpper) + '?';
        }
        // Проверка на столицу
        const cityUpper = city.charAt(0).toUpperCase() + city.slice(1);
        if (CITY.indexOf(cityUpper) > -1) {
            alert(EXISTS_CITY + cityUpper + '\n' + AGE + (new Date().getFullYear() - year) + sportString);
            return;
        }
        alert(NOT_EXISTS_CITY + cityUpper + '\n' + AGE + (new Date().getFullYear() - year) + sportString);
    }
};

// Получение и валидация года рождения
const getYearAndValidator = () => {
    const year = prompt(ANSWER_YEAR);
    if (!exitCheck(year, EXIT_YEAR)) {
        const yearInt = parseInt(year);
        if (typeof yearInt === 'number' && !isNaN(yearInt)) {
            if (yearInt >= MIN_YEAR && yearInt <= MAX_YEAR) {
                return yearInt;
            }
            alert(MIN_MAX_YEAR_TEXT)
            return getYearAndValidator();
        }
        alert(NUMBER_ERROR);
        return getYearAndValidator();
    }
    return false;
}

// Получение строкового значения от пользователя, валидация
const inputStringValidator = (value, message) => {
    const item = prompt(value);
    if (!exitCheck(item, message)) {
        if (item.trim() && stringCheck(item.trim())) {
            return item;
        }
        alert(STRING_ERROR);
        return inputStringValidator(value);
    }
    return false;
}

////////////////////////////////////// Utils

const exitCheck = (value, message) => {
    if (value === null) {
        alert(message);
        throw new ExitException(message);
    }
    return false;
}

const stringCheck = (value) => {
    return /[а-яА-ЯёË]/.test(value);

}

////////////////////////////////////// Run

handler();
