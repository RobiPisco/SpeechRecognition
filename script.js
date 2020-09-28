// SPEECH RECOGNITION API
// https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition

const msgEl = document.getElementById('msg');

const randomNum = getRandomNumber();

console.log('Number: ', randomNum);

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition = new window.SpeechRecognition();

// Start Recognition
recognition.start();

// Capture User Speak
function onSpeak(e) {
    const msg = e.results[0][0].transcript;

    writeMessage(msg);
    checkNumber(msg);
}

// Write what user speaks
function writeMessage(msg) {
    msgEl.innerHTML = `
        <div>You said: </div>
        <span class="box">${msg}</span>
    `;
}

// check message against number
function checkNumber(msg) {
    const num = +msg; // adding + sign will convert into a number

    // Is valid number?
    if(Number.isNaN(num)) {
        msgEl.innerHTML += '<div>That is not a valid number</div>';
        return;
    }

    // Check in range
    if(num > 100 || num < 1) {
        msgEl.innerHTML += '<div>Number must be between 1 and 100</div>';
        return;
    }

    // Check Number
    if(num === randomNum) {     // if hit the right number this fire
        document.body.innerHTML = `
            <h2>Congratulations! You got it! <br><br>
                It was ${num}
            </h2>
            <button class="play-again" id="play-again">Play Again</button>
        `;
    } else if(num > randomNum) { 
            // if num is to low this fire
        msgEl.innerHTML += '<div>GO LOWER</div>'
    } else {
            // if num is to high this fire
        msgEl.innerHTML += '<div>GO HIGHER</div>'
    }
}

// Generate Random Number
function getRandomNumber() {
    return Math.floor(Math.random() * 100) + 1;
}

// Speak result
recognition.addEventListener('result', onSpeak);

// End SR service
recognition.addEventListener('end', () => recognition.start());

document.body.addEventListener('click', (e) => {
    if(e.target.id == 'play-again') {
        window.location.reload();
    }
});