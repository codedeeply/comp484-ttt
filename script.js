const testWrapper = document.querySelector(".test-wrapper");
const testArea = document.querySelector("#test-area");
const originText = document.querySelector("#origin-text p").innerHTML;
const resetButton = document.querySelector("#reset");
const theTimer = document.querySelector(".timer");
var wordCountDisplay = document.querySelector("#wordcount");
var wpmDisplay = document.querySelector("#wpm");
var typingErrorDisplay = document.querySelector("#errors");
var accuracyDisplay = document.querySelector("#accuracy");

var timer = [0, 0, 0, 0];
var interval;
var wordsPerMinCalc;
var typingError = 0;
var accuracy;
var wordCount = 0;
var timerRunning = !1;

// Wordcounter
function getWordCount() {
    var separate;
    for (var i = 0; i < originText.length; i++) {
        separate = originText.split(" ");
        break
    }
    wordCount = separate.length;
    return wordCount;
}

// Add leading zero to numbers 9 or below (purely for aesthetics):
function leadingZero(time) {
	if (time <= 9) {
		time = "0" + time;
	}
	return time;
}

// Run a standard minute/second/hundredths timer:
// Timer math adapted from Stack Overflow:
// https://stackoverflow.com/questions/10804042/calculate-time-difference-with-javascript
function runTimer() {
	var currentTime = leadingZero(timer[0]) + ":" + leadingZero(timer[1]) + ":" + leadingZero(timer[2]);
    theTimer.innerHTML = currentTime;
    timer[3]++;
    timer[0] = Math.floor(timer[3] / 100 / 60);
    timer[1] = Math.floor(timer[3] / 100 - timer[0] * 60);
    timer[2] = Math.floor(timer[3] - timer[1] * 100 - timer[0] * 6000)
}


// Match the text entered with the provided text on the page:
function spellCheck() {
	getWordCount();
    var textEntered = testArea.value;
    var originTextMatch = originText.substring(0, textEntered.length);
    if (textEntered == originText) {
        clearInterval(interval);
        testWrapper.style.borderColor = "#008000";
        if (timer[0] >= 1) {
            var completeTime = timer[0] + timer[1] / 60;
            wordsPerMinCalc = Math.round(wordCount / completeTime)
        } else {
            var accurateMeasure = timer[1] / 60;
            wordsPerMinCalc = Math.round(wordCount / accurateMeasure)
        }
        wpmDisplay.innerHTML = wordsPerMinCalc;
        accuracy = Math.round((wordCount - typingError) / wordCount * 100);
        if (accuracy < 0) {
        	accuracy = 0;
        }
        accuracyDisplay.innerHTML = accuracy + "%"
    } else {
        if (textEntered == originTextMatch) {
            testWrapper.style.borderColor = "#65CCf3"
        } else {
            typingError++;
            typingErrorDisplay.innerHTML = typingError;
            testWrapper.style.borderColor = "#8B0000"
        }
    }
}

// Start the timer:
function start() {
	var textEnteredLength = testArea.value.length;
    wordCountDisplay.innerHTML = wordCount;
    if (textEnteredLength === 0 && !timerRunning) {
        timerRunning = !0;
        interval = setInterval(runTimer, 10)
    }
}

// Reset everything:
function reset() {
    clearInterval(interval);
    interval = null;
    timer = [0, 0, 0, 0];
    timerRunning = !1;
    wordsPerMinCalc = 0;
    typingError = 0;
    accuracy = 0;
    testArea.value = "";
    theTimer.innerHTML = "00:00:00";
    testWrapper.style.borderColor = "grey";
    wpmDisplay.innerHTML = "---";
    typingErrorDisplay.innerHTML = "---";
    accuracyDisplay.innerHTML = "---";
    wordCountDisplay.innerHTML = "---"
}

// Event listeners for keyboard input and the reset button:
testArea.addEventListener("keypress", start, !1);
testArea.addEventListener("keyup", spellCheck, !1);
resetButton.addEventListener("click", reset, !1);