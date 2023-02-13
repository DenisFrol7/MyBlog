'use strict';
window.addEventListener('DOMContentLoaded', () => {
    // Timer
    const deadline = new Date(2023,2,8);
    function getTimeRemaining(endtime) {
        let days, hours, minutes, seconds;
        const t = Date.parse(endtime) - Date.parse(new Date());

        if (t <= 0) {
            days = 0;
            hours = 0;
            minutes = 0;
            seconds = 0;
        } else {
            days = Math.floor(t / (1000 * 60 * 60 * 24)),
                hours = Math.floor((t / (1000 * 60 * 60) % 24)),
                minutes = Math.floor((t / 1000 / 60) % 60),
                seconds = Math.floor((t / 1000) % 60);
        }

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }
    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }
    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);

        updateClock();
        function updateClock() {
            const t = getTimeRemaining(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }

    setClock('.timer', deadline);

    // Activity

    class Activity {
        constructor(dayOfWeek, month, step, parentSelector, ...classes) {
            this.dayOfWeek = dayOfWeek;
            this.month = month;
            this.step = step;
            this.parent = document.querySelector(parentSelector);
            this.classes = classes;
        }

        render() {
            const element = document.createElement('li');

            element.innerHTML = `
                    ${this.dayOfWeek} ${this.month}: ${this.step} шагов
            `;
            this.parent.prepend(element);
        }
    }

    const date = new Date();
    const startActivity = new Date(2022,0,16);
    function getWeekDay(date) {
        let days = ['Воскресение', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
        return days[date.getDay()];
    }

    //console.log(getWeekDay(date));

    function toMonth(number) {
        switch (number) {
            case 0: return "января";
            case 1: return "февраля";
            case 2: return "марта";
            case 3: return "апреля";
            case 4: return "мая";
            case 5: return "июня";
            case 6: return "июля";
            case 7: return "августа";
            case 8: return "сентября";
            case 9: return "октября";
            case 10: return "ноября";
            case 11: return "декабря";
        }
    }

    const getResource = async (url) => {
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }

        return await res.json();
    };

    getResource('http://localhost:8080/activity')
        .then(data => {
            data.forEach(({day, numberOfSteps}) => {
                const date = new Date(day);
                const month = toMonth(date.getMonth());
                const dayOfWeek = date.getDate();
                console.log(getWeekDay(date));
                new Activity(dayOfWeek, month, numberOfSteps, '.activity').render();
            });
        });

    // fetch('http://localhost:8080/activity')
    //     .then(response => response.json())
    //     .then(json => console.log(json));
});