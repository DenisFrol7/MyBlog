window.addEventListener('DOMContentLoaded', ()=> {
    const game = document.querySelector('.game');

    class Game {
        constructor(name, status, genre, platform, library, parentSelector, ...id) {
            this.name = name;
            this.status = status;
            this.genre = genre;
            this.platform = platform;
            //this.release = release;
            //this.playDate = playDate;
            this.library = library;
            //this.achievementsUnlock = achievementsUnlock;
            //this.achievementsCount = achievementsCount;
            //this.gameScore = gameScore;
            //this.gameScoreCount = gameScoreCount;
            this.parent = document.querySelector(parentSelector);
            this.id = id;
        }

        render() {
            const element = document.createElement('tr');
            element.innerHTML = `
                <td><a href="http://localhost/game/${this.id}">${this.name}</a></td>
                <td>${this.genre}</td>
                <td>${this.platform}</td>
                <td>${this.library}</td>
                <td class="table-success">${this.status}</td>`;
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

    getResource('http://localhost:8080/game')
        .then(data => {
            data.forEach(({name, status, genre, platform, library, id}) => {
                new Game(name, status, genre, platform, library, game, id).render();
            })
        });
})