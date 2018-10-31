/**
 * Suggestions:
 * - Highlight the word when you type characters correctly
 */

 // UI Vars
const DOMstrings = {
    timeRange: document.querySelector('#msg_num'),
    displayedWord: document.querySelector('.game__word'),
    input: document.querySelector('.game__input'),
    timeLeft: document.querySelector('.time'),
    score: document.querySelector('.score'),
    finishMsg: document.querySelector('.game__finish')
};

// Generating Random Words and the guessed Word
const randomString = 'Lorem ipsum dolor sit amet consectetur adipisicing elit Quas facilis totam nam iure id laborum suscipit Omnis consequuntur amet dolorum unde nesciunt deserunt ipsum expedita ab ipsam veniam Vero dignissimos ipsum rerum nisi rem consectetur minima ipsa aut quos maxime hic laudantium eveniet ab nam aliquid quisquam doloribus quibusdam suscipit quod veniam atque voluptatibus repudiandae aspernatur delectus Quas unde ea dolore quia tenetur molestiae cum Quos qui error deleniti alias dolorem incidunt eligendi minima iste libero quod non repellendus reprehenderit';
const randomWords = randomString.split(' ');

function selectRandom() {
    return randomWords[Math.floor(Math.random() * randomWords.length + 1)];
}

let remainingTime = 5;
let userScore = 0;

DOMstrings.timeLeft.textContent = remainingTime;
DOMstrings.score.textContent = userScore;
DOMstrings.displayedWord.innerHTML = `<span class="matching"></span>${selectRandom()}`;

// Event Listener for keypress
DOMstrings.input.addEventListener('focus', e => {
    let startGame = setInterval(runTime, 1000);
    function runTime() {
        remainingTime--;
        DOMstrings.timeLeft.textContent = remainingTime;

        // When time is up
        if (remainingTime === 0) {
            clearInterval(startGame);
            DOMstrings.finishMsg.textContent = 'Game Over!';
            DOMstrings.finishMsg.style.color = 'rgb(207, 20, 20)';

            if (DOMstrings.input.value !== '') {
                console.log('input is no longer empty now');
            }
        }

        if (DOMstrings.input.value === DOMstrings.displayedWord.textContent) {
            console.log('Yay! You made it.');
            DOMstrings.displayedWord.textContent = selectRandom();
            DOMstrings.finishMsg.textContent = 'Correct Word!';
            DOMstrings.finishMsg.style.color = '#2ecc71';
            DOMstrings.input.value = '';
            remainingTime = 5;
            userScore++;
            DOMstrings.score.textContent = userScore;
        }
    }
});

DOMstrings.input.addEventListener('keyup', e => {
    // Try looping through the word that's displayed, and then check if it is included in the passed in word. If it is, then style the part that matches
    let word = DOMstrings.displayedWord.textContent;
    let matching = [];
    for (let i = 0; i < word.length; i++) {
        if (DOMstrings.input.value.includes(word[i]) && !matching.includes(word[i])) {
            matching.push(word[i]);
            //document.querySelector('.matching').textContent = matching.join('') + word.slice(i);
            ;

        }
    }
})
