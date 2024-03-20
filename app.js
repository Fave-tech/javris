const btn = document.querySelector(".talk");
const content = document.querySelector(".content");

function speak(text) {
  const text_speak = new SpeechSynthesisUtterance(text);

  text_speak.rate = 1;
  text_speak.volume = 1;
  text_speak.pitch = 1;

  window.speechSynthesis.speak(text_speak);
}

function wishMe() {
  const hour = new Date().getHours();

  if (hour >= 0 && hour < 12) {
    speak("Good Morning Favour...");
  } else if (hour >= 12 && hour < 17) {
    speak("Good Afternoon Favour...");
  } else {
    speak("Good Evening Favour...");
  }
}

window.addEventListener("load", () => {
  speak("Initializing JARVIS..");
  wishMe();
});

const recognition = new (window.SpeechRecognition ||
  window.webkitSpeechRecognition)();

recognition.onresult = (event) => {
  const transcript = event.results[0][0].transcript;
  content.textContent = transcript;
  takeCommand(transcript.toLowerCase());
};

btn.addEventListener("click", () => {
  content.textContent = "Listening....";
  recognition.start();
});

function takeCommand(message) {
  if (message.includes("hey") || message.includes("hello")) {
    speak("Hello Ma, How May I Help You?");
  } else if (message.includes("open google")) {
    window.open("https://google.com", "_blank");
    speak("Opening Google...");
  } else if (message.includes("open youtube")) {
    window.open("https://youtube.com", "_blank");
    speak("Opening Youtube...");
  } else if (message.includes("open facebook")) {
    window.open("https://facebook.com", "_blank");
    speak("Opening Facebook...");
  } else if (
    message.includes("what is") ||
    message.includes("who is") ||
    message.includes("what are")
  ) {
    window.open(
      `https://www.google.com/search?q=${encodeURIComponent(message)}`,
      "_blank"
    );
    speak(`Searching for ${message} on the internet.`);
  } else if (message.includes("wikipedia")) {
    window.open(
      `https://en.wikipedia.org/wiki/${encodeURIComponent(
        message.replace("wikipedia", "").trim()
      )}`,
      "_blank"
    );
    speak(
      `Searching for ${message.replace("wikipedia", "").trim()} on Wikipedia.`
    );
  } else if (message.includes("time")) {
    const time = new Date().toLocaleString(undefined, {
      hour: "numeric",
      minute: "numeric",
    });
    speak(`The current time is ${time}.`);
  } else if (message.includes("date")) {
    const date = new Date().toLocaleString(undefined, {
      month: "short",
      day: "numeric",
    });
    speak(`Today's date is ${date}.`);
  } else if (message.includes("calculator")) {
    window.open("Calculator:///");
    speak("Opening Calculator.");
  } else {
    window.open(
      `https://www.google.com/search?q=${encodeURIComponent(message)}`,
      "_blank"
    );
    speak(`I found some information for ${message} on Google.`);
  }
}
