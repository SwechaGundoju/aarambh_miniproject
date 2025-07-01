const messagesContainer = document.getElementById("chat-messages");
const inputField = document.getElementById("user-input");
const sendButton = document.getElementById("send-btn");

let mode = "normal";
let lastTopic = null;

const helpTopics = {
  main: {
    message: "Please choose a topic you'd like help with:",
    options: ["About Aarambh", "Cultural Festivals", "Traditional Artforms", "Website Navigation"]
  },
  "About Aarambh": {
    message: "Aarambh is a platform that showcases the rich cultural heritage and traditions of India through interactive content, art, festivals, and more."
  },
  "Cultural Festivals": {
    message: "India celebrates a wide range of festivals such as Diwali, Holi, Eid, Christmas, Navratri, and more. Would you like to learn about a specific festival?"
  },
  "Traditional Artforms": {
    message: "India is known for its classical dances like Bharatanatyam, Kathak, and folk arts like Madhubani and Warli painting. Interested in a specific artform?"
  },
  "Website Navigation": {
    message: "You can explore sections like Artforms, Festivals, Places to Visit, and even Shop traditional items. What would you like help with?"
  }
};

//  Append chat messages to container
function appendMessage(sender, text) {
  const messageElement = document.createElement("div");
  messageElement.classList.add("message", sender);
  messageElement.innerHTML = `<span>${text}</span>`;
  messagesContainer.appendChild(messageElement);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Display clickable options as buttons
function showOptions(options) {
  const buttonsHTML = options
    .map(option => `<button class="option-button" onclick="handleOptionClick('${option}')">${option}</button>`)
    .join(" ");
  appendMessage("bot", buttonsHTML);
}

//  Handle button click options from help menu
function handleOptionClick(option) {
  appendMessage("user", option);
  if (helpTopics[option]) {
    appendMessage("bot", helpTopics[option].message);
    lastTopic = option;
    mode = (["Cultural Festivals", "Traditional Artforms"].includes(option)) ? "helpSub" : "helpMain";
  } else {
    appendMessage("bot", "Sorry, I don't have information on that yet.");
  }
}

// Handle user input from textbox
function handleUserInput() {
  const input = inputField.value.trim();
  if (!input) return;
  appendMessage("user", input);
  inputField.value = "";

  const cleanedInput = input.replace(/[.,\/#!$%\^&\*;:{}=\-_~()]/g, "").trim();
  const normalizedInput = cleanedInput.toLowerCase();

  // Exit help mode
  if (["exit", "back", "home", "stop"].includes(normalizedInput)) {
    mode = "normal";
    lastTopic = null;
    appendMessage("bot", "You're back in normal mode! Type 'Help' if you need assistance again.");
    return;
  }

  // NORMAL mode commands
  if (mode === "normal") {
    if (["hi", "hello"].includes(normalizedInput)) {
      appendMessage("bot", "Hello! How can I assist you today?");
    } else if (["how are you", "how r u", "how are u", "how u r"].includes(normalizedInput)) {
      appendMessage("bot", "I'm just a bot, but I'm here to help you!");
    } else if (["ok", "okay", "cool"].includes(normalizedInput)) {
      appendMessage("bot", "Got it! Let me know if you need anything else.");
    } else if (["bye", "goodbye", "see you"].includes(normalizedInput)) {
      appendMessage("bot", "Goodbye! Have a great day 🌸");
    } else if (["thank you", "thanks", "thx", "thank u"].includes(normalizedInput)) {
      appendMessage("bot", "You're welcome! 😊");
    } else if (normalizedInput.includes("who created aarambh")) {
      appendMessage("bot", "Aarambh was created by Swecha and Niharika.");
    } else if (normalizedInput.includes("what is aarambh about") || normalizedInput.includes("aarambh about")) {
      appendMessage("bot", "Aarambh is a project showcasing the rich cultural heritage, traditions, and festivals of India.");
    } else if (normalizedInput === "help" || normalizedInput === "i need help") {
      mode = "helpMain";
      lastTopic = null;
      appendMessage("bot", helpTopics.main.message);
      showOptions(helpTopics.main.options);
    } else {
      appendMessage("bot", "Sorry, I don't have information on that yet! You can type 'Help' to see options or ask about Indian culture, festivals, artforms, or the Aarambh website.");
    }
    return;
  }

  // HELP MAIN mode
  if (mode === "helpMain") {
    const matchedTopic = Object.keys(helpTopics).find(
      topic => topic.toLowerCase() === normalizedInput
    );
    if (matchedTopic && matchedTopic !== "main") {
      lastTopic = matchedTopic;
      mode = (["Cultural Festivals", "Traditional Artforms"].includes(matchedTopic)) ? "helpSub" : "helpMain";
      appendMessage("bot", helpTopics[matchedTopic].message);
    } else {
      appendMessage("bot", "Please select a valid topic from the options.");
    }
    return;
  }

  // HELP SUB topics like festivals and artforms
  if (mode === "helpSub" && lastTopic) {
    if (lastTopic === "Cultural Festivals") {
      switch (normalizedInput) {
        case "diwali":
          appendMessage("bot", "Diwali is the Festival of Lights, celebrated with lamps, sweets, and fireworks.");
          break;
        case "holi":
          appendMessage("bot", "Holi is the Festival of Colors, celebrated with vibrant powders and joyful dancing.");
          break;
        case "eid":
          appendMessage("bot", "Eid is a significant Islamic festival marking the end of Ramadan, celebrated with prayers and feasting.");
          break;
        case "christmas":
          appendMessage("bot", "Christmas celebrates the birth of Jesus Christ, marked by decorations, gifts, and festive meals.");
          break;
        case "navratri":
          appendMessage("bot", "Navratri is a nine-night Hindu festival celebrating goddess Durga with dance and fasting.");
          break;
        default:
          appendMessage("bot", "This is a beautiful festival! We’ll be adding more details soon.");
      }
    } else if (lastTopic === "Traditional Artforms") {
      switch (normalizedInput) {
        case "bharatanatyam":
          appendMessage("bot", "Bharatanatyam is a classical Indian dance form from Tamil Nadu known for grace and expression.");
          break;
        case "kathak":
          appendMessage("bot", "Kathak is a North Indian classical dance noted for storytelling through rhythmic footwork.");
          break;
        case "madhubani":
          appendMessage("bot", "Madhubani painting is a folk art from Bihar, characterized by vibrant colors and intricate patterns.");
          break;
        case "warli":
          appendMessage("bot", "Warli painting is a tribal art from Maharashtra depicting daily life through simple white patterns.");
          break;
        default:
          appendMessage("bot", "That's a wonderful artform! We’ll be adding more content about it.");
      }
    } 
  }
}

//  Event Listeners
sendButton.addEventListener("click", handleUserInput);
inputField.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    handleUserInput();
  }
});

window.addEventListener("load", () => {
  appendMessage("bot", "Hi! I'm AarambhBot. Ask me anything or type 'Help' to see options.");
});

document.getElementById("back-main-btn").addEventListener("click", () => {
  window.location.href = "index.html";
});
