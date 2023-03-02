window.addEventListener('DOMContentLoaded', () => {

    // Form

    const forms = document.querySelectorAll('form');

    forms.forEach(item => {
        bindPostData(item);
    });

    const postData = async (url, data) => {
        const res = await fetch(url, {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: data
        });
        return await res.json();
    }

    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(form);
            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            postData('http://localhost:8080/activity', json)
                .then(data => {
                    console.log(data);
                }).finally(() => {
                form.reset();
            });
        });
    }

    // Activity
    const week = document.querySelector('.current_week'),
          prev = document.querySelector('.prev'),
          dayWeek = document.querySelector('.day_week'),
          next = document.querySelector('.next');


    class Activity {
        constructor(dayOfWeek, dayW, month, step, parentSelector) {
            this.dayOfWeek = dayOfWeek;
            this.dayW = dayW;
            this.month = month;
            this.step = step;
            this.parent = document.querySelector(parentSelector);
        }

        render() {
            const element = document.createElement('li');
            element.innerHTML = `${this.dayW} (${this.dayOfWeek} ${this.month}) - ${this.step} шагов`;
            this.parent.append(element);
        }
    }

    const getResource = async (url) => {
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }
        return await res.json();
    };

    const db = [];

    getResource('http://localhost:8080/activity')
        .then(data => {
            data.forEach(({day, numberOfSteps}) => {
                const obj = {
                    date: day,
                    steps: numberOfSteps
                }
                db.push(obj);
            });
            const weekArr = [];
            for (let i = 0; i < db.length; i += 7) {
                const part = db.slice(i, i + 7);
                weekArr.push(part);
            }
            return weekArr;
        })
        .then(weekArr => {
            let currentWeekNumber = weekArr.length - 1;

            currentWeek(weekArr[currentWeekNumber]);
            showCurrentActivity(weekArr[currentWeekNumber]);

            prev.addEventListener('click', () => {
                currentWeekNumber--;
                if (currentWeekNumber === -1) {
                    currentWeekNumber = weekArr.length -1;
                }

                const li = dayWeek.querySelectorAll('li');
                addActive(li);

                const active = document.querySelectorAll('.mark_remove');
                removeActive(active);

                currentWeek(weekArr[currentWeekNumber]);
                showCurrentActivity(weekArr[currentWeekNumber]);
            });

            next.addEventListener('click', () => {
                currentWeekNumber++;
                if (currentWeekNumber === weekArr.length) {
                    currentWeekNumber = 0;
                }

                const li = dayWeek.querySelectorAll('li');
                addActive(li);

                const active = document.querySelectorAll('.mark_remove');
                removeActive(active);

                currentWeek(weekArr[currentWeekNumber]);
                showCurrentActivity(weekArr[currentWeekNumber]);
            });
    });


    function currentWeek(array) {
        const curWeek = document.createElement('span');
        const dayStart = convertDate(array[0].date).getDate();
        const dayEnd = convertDate(array[array.length-1].date).getDate();
        const month = toMonth(convertDate(array[array.length-1].date).getMonth());
        curWeek.innerHTML = `${dayStart} - ${dayEnd} ${month}`;
        curWeek.classList.add('mark_remove');
        week.prepend(curWeek);
    }
    function showCurrentActivity(arr) {
        for (let i = 0; i < arr.length; i++) {
            const date = convertDate(arr[i].date);
            const day = date.getDate();
            const month = toMonth(date.getMonth());
            const dayW = getWeekDay(date);
            new Activity(day, dayW, month, arr[i].steps, '.day_week').render();
        }
    }
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
    function convertDate(date) {
        const split = date.split('-');
        const temp = split[2] + '-' + split[1] + '-' + split[0];
        return new Date(temp); // 15-12-2020  2020-12-15
    }
    function getWeekDay(date) {
        let days = ['Воскресение', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
        return days[date.getDay()];
    }
    function removeActive(selector) {
        selector.forEach(elem => {
            elem.remove();
        })
    }
    function addActive(selector) {
        selector.forEach(elem => {
            elem.classList.add('mark_remove');
        });
    }
})