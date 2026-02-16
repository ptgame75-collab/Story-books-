let speech = new SpeechSynthesisUtterance();
let synth = window.speechSynthesis;
let isPaused = false;

function speak(elementId) {
    let text = document.getElementById(elementId).innerText;
    
    if (isPaused) {
        synth.resume();
        isPaused = false;
    } else {
        synth.cancel(); // पुरानो आवाज रोक्न
        speech.text = text;
        speech.lang = 'ne-NP'; // नेपाली (नेपाल) इन्जिन प्रयोग
        speech.rate = 0.9; // तपाईँको स्क्रिनशटको 'Speech Rate' अनुसार
        speech.pitch = 1.0; // Pitch सेटिङ
        
        synth.speak(speech);
    }
    
    document.getElementById('playBtn').style.display = 'none';
    document.getElementById('pauseBtn').style.display = 'inline-block';
}

function pause() {
    synth.pause();
    isPaused = true;
    document.getElementById('playBtn').style.display = 'inline-block';
    document.getElementById('pauseBtn').style.display = 'none';
}

