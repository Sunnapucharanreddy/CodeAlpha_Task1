toixxcxzlet string = "";
const buttons = document.querySelectorAll('.button');
const input = document.querySelector('.input');
const toggleBtn = document.getElementById("toggleMode");
const voiceBtn = document.getElementById("voiceBtn");

buttons.forEach(button => {
  button.addEventListener('click', (e) => {
    const value = e.target.innerText;

    if (value === '=') {
      try {
        string = eval(string).toString();
      } catch {
        string = "Error";
      }
    } else if (value === 'C') {
      string = "";
    } else {
      string += value;
    }

    input.value = string;
  });
});
// Dark Mode Toggle
toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  toggleBtn.textContent = document.body.classList.contains("dark")
    ? "☀️ Light Mode"
    : "🌙 Dark Mode";
});


// Voice Input using Web Speech API
if ('webkitSpeechRecognition' in window) {
  const recognition = new webkitSpeechRecognition();
  recognition.lang = 'en-US';
  recognition.continuous = false;
  recognition.interimResults = false;

  voiceBtn.addEventListener('click', () => {
    recognition.start();
    voiceBtn.textContent = "🎙️ Listening...";
  });

  recognition.onresult = (event) => {
    const speechToText = event.results[0][0].transcript.toLowerCase();
    voiceBtn.textContent = "🎤 Speak";

    const converted = speechToText
      .replace(/plus/gi, "+")
      .replace(/minus/gi, "-")
      .replace(/times|into/gi, "*")
      .replace(/divide|divided by|by/gi, "/")
      .replace(/equals|equal/gi, "=")
      .replace(/zero/gi, "0")
      .replace(/one/gi, "1")
      .replace(/two/gi, "2")
      .replace(/three/gi, "3")
      .replace(/four/gi, "4")
      .replace(/five/gi, "5")
      .replace(/six/gi, "6")
      .replace(/seven/gi, "7")
      .replace(/eight/gi, "8")
      .replace(/nine/gi, "9");

    try {
      string = converted.includes('=') ? eval(converted.replace('=', '')).toString() : eval(converted).toString();
    } catch {
      string = "Error";
    }

    input.value = string;
  };

  recognition.onerror = () => {
    voiceBtn.textContent = "🎤 Speak";
    alert("Voice recognition failed. Please try again.");
  };
} else {
  voiceBtn.disabled = true;
  voiceBtn.textContent = "🎤 Not Supported";
}
