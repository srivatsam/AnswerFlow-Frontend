let bot_key = "";
let bot_name = "";
let chatId = "";
let response = "";
const DILIMETER = "44eabd710f0f455ea12c17564663d175";
const ChatAPI = `https://answerflowai.com/flask`;
function toggleChat() {
  const chatbotContainer = $("#chatbot-container");
  chatbotContainer.slideToggle();
}
function loadChatbot(containerId) {
  const container = document.getElementById(containerId);
  bot_key = container.dataset.answerflowbotkey;
  bot_name = container.dataset.answerflowbotname;

  if (!container) {
    console.error(`Container with id '${containerId}' not found.`);
    return;
  }

  // Add the HTML structure
  container.innerHTML = `
      <button id="chatbot-icon" onclick="toggleChat()">
        <img src="https://answerflowai.com/favicon.png" alt="logo png" width="40" height="40" />
      </button>
      <div id="chatbot-container"   style="
      justify-content: center;
      gap: 20px;
    ">
          <div id="chat-header">
            <div id="chat-header-inner">
              <img src="https://answerflowai.com/favicon.png" alt="logo png" width="30" height="30" />
              <h2>${bot_name}</h2>
              </div>
              <span id="close-icon" onclick="toggleChat()">
                <img src="https://answerflowai.com/close.png" alt="logo png" width="24" height="24" />
              </span>
          </div>
          <div id="bot-heading">
              <img src="https://answerflowai.com/favicon.png" alt="logo png" width="50" height="50" />
              <h2>${bot_name}</h2>
              
              <p>bowered by answerflow.com</p>
          </div>
          <div id="chat-messages"></div>
          <div id="input-div">
            <input type="text" id="user-input" placeholder="Type your message">
            <span id="send-button" onclick="sendMessage()"><img src="https://answerflowai.com/send.png" alt="send image" width="24" height="24" /></span>
          </div>
      </div>
  `;

  // Add the CSS styles
  const styleElement = document.createElement("style");
  styleElement.textContent = `
  #chatbot-icon {
    position: fixed;
    bottom: 40px;
    right: 50px;
    padding: 10px;
    background-color: #131313;
    border: none;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    box-shadow: 0px 3px 7px 2px #5252524d;
    transition: background-color 0.5s ease-in-out;
  }

  #chatbot-container {
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 340px;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0px 0px 15px 6px rgba(0, 0, 0, 0.1);
    background-color: #fff;
    font-family: "Arial", sans-serif;
    display: none; /* Change here to set the initial state to closed */
    animation: slideIn 0.7s ease-in-out;
    flex-direction: column;
    gap: 10px;
  }
  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateX(20px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  #chat-header {
    background-color: #131313;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #fff;
    padding-block: 12px;
    padding-inline: 18px;
    text-align: center;
  }#chat-header h2{
    margin:0px
  }
  #chat-header span{
    cursor: pointer;
  }
  #chat-header-inner{
    display: flex;
    align-items: center;
    gap:10px
  }
  #chat-header-inner img{
    border-radius: 50%;
    padding: 5px;
    background-color: #fff;
  }
  #chat-messages {
    padding-block: 10px;
    padding-inline: 20px;
    height: 260px;
    overflow-y: auto;
    display: flex;
    gap:10px;
    flex-direction: column;
  }

  #input-div{
    justify-content: space-between;
    gap: 10px;
    display: flex;
    padding-block: 10px;
    padding-inline: 20px;
    align-items: center;
    background-color: #f2f2f2;
  }
  #user-input {
    width: 100%;
    background-color: #fff;
    border: none;
    outline: none;
    padding: 8px;
    border-radius: 5px;
    padding: 14px 20px;
    font-size: 16px;
    color: black;
  }

  #send-button {
    cursor: pointer;
  }
#bot-heading{
  padding-block: 10px;
    align-items: center;
    justify-content: center;
    display: flex;
    flex-direction: column;
    gap: 5px;
}#bot-heading img{
  padding: 10px;
  background-color: #131313;
  border-radius: 50%;
  margin:0px
}
#bot-heading h2{
  margin:0px;
}
#bot-heading p{
  color: gray;
  margin:0px;
}

  `;
  document.head.appendChild(styleElement);

  // Add the JavaScript code
  const scriptElement = document.createElement("script");
  scriptElement.src = "https://code.jquery.com/jquery-3.6.4.min.js";
  document.body.appendChild(scriptElement);
}
loadChatbot("answerflowbotkey");

function appendMessage(sender, message) {
  const chatMessages = $("#chat-messages");
  if (sender == "Bot") {
    chatMessages.append(`<div 
  style="
  display: flex;
  align-items: start;
  gap: 6px;
">
    <img src="https://answerflowai.com/${sender}.png" alt="logo png" width="20" height="20" />
    <p style="
    padding-block: 10px;
    padding-block: 10px;
    background-color: #e5e5e5;
    padding-inline: 20px;
    border-radius: 6px;
    margin:0px;
  " >${message}</p> 
</div>`);
  }
  if (sender == "User") {
    chatMessages.append(`<div 
      style="
        justify-content: end;
        display: flex;
        flex-direction: row-reverse;
        align-items: start;
        gap: 6px;
    ">
      <img src="https://answerflowai.com/${sender}.png" alt="user png" width="20" height="20" />
      <p style="
      padding-block: 10px;
      padding-block: 10px;
      background-color: #6693f0;
      padding-inline: 20px;
      border-radius: 6px;
      margin:0px;
    " >${message}</p> 
  </div>`);
  }

  chatMessages.scrollTop(chatMessages[0].scrollHeight);
}

function sendMessage() {
  const chatbotContainer = $("#chatbot-container");
  if (chatbotContainer.is(":visible")) {
    const userMessage = $("#user-input").val();
    if (userMessage.trim() === "") return;
    appendMessage("User", userMessage);

    let isResponseDone = false; // Flag to track if the response is done

    fetch(`${ChatAPI}/chat/${bot_key}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        question: userMessage,
        streaming: true,
        chat_id: chatId,
      }),
    })
      .then((stream) => {
        const reader = stream.body.getReader();
        const textDecoder = new TextDecoder("utf-8");
        const readChunk = () => {
          reader.read().then(({ done, value }) => {
            if (done) {
              console.log("End of stream");
              appendMessage("Bot", response);
              return;
            }
            let val = textDecoder.decode(value);
            let values = val.split(DILIMETER);
            if (values.length === 1) {
              response += values[0];
            } else if (values.length > 1) {
              const responseData = JSON.parse(values[1].trim());
              chatId = responseData.chat_id;
            }
            readChunk();
          });
        };
        readChunk();
      })
      .catch((error) => {
        console.error("Error:", error);
        appendMessage("Bot", "Error fetching response.");
      });
  }
}
