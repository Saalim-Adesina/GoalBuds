document.addEventListener("DOMContentLoaded", () => {
    
    try {

        let question = document.querySelector("#question")
        let response = document.querySelector("#response")
        let landing_form = document.querySelector("#landing_form")
        let state = {questions: ["What is your dream goal?", "Why do you want to improve in this goal?", "Why are you looking for an accountability partners? "], current_question: 0, answers: []}
        question.textContent = state.questions[state.current_question]
    
        function updateState(state) { 
            if (state.current_question == state.questions.length - 1) {
                // go to accounts page if questions are complete
                window.location.href = "/html/account.html"
                // reset the count
                state.current_question = 0;
            } else {
                state.current_question++
            }
            state.answers.push(response)
        }
    
        landing_form.addEventListener("submit", event => {
            // stop the POST request and just proceeds to next question 
            event.preventDefault()
    
            // edits the state and moves on to next questions
            updateState(state);
            question.textContent = state.questions[state.current_question]
            
            // empties the input 
            response.value = "";
    
        })
    } catch (e) {
        console.log(e)
    }

    try {
        let account_form = document.querySelector("#account_form")
        let buddy_form = document.querySelector("#buddy_form")
        let username;
        let buddy;
        buddy_form.style.display = "none";
        
        account_form.addEventListener("submit", event => {
            event.preventDefault()
            account_form.style.display = "none";
            buddy_form.style.display = 'block';
            
            username = document.querySelector("input[title='username']").value
            localStorage.setItem("username", username) 
        })

        buddy_form.addEventListener("submit", event => {
            event.preventDefault();
            buddy = document.querySelector('input[name="buddy_options"]:checked').value
            localStorage.setItem("buddy", buddy)
            window.location.href = "/html/chat.html"
        })

    } catch (e) {
        console.log(e)
    }

    try {
        let buddy = localStorage.getItem("buddy")
        let username = localStorage.getItem("username")
        let goal = localStorage.getItem("goal")
        let buddy_h1 = document.querySelector("#buddy")
        let goal_h3 = document.querySelector("#goal")

        buddy_h1.textContent = 'Chat with ' + String(buddy)

        goal_h3.textContent = 'Your goal is: ' + String(goal)

        document.querySelector("#buddy_text").textContent = buddy
        document.querySelector("#username_text").textContent = username

        const johnSelectorBtn = document.querySelector('#john-selector')
        const janeSelectorBtn = document.querySelector('#jane-selector')
        const chatHeader = document.querySelector('.chat-header')
        const chatMessages = document.querySelector('.chat-messages')
        const chatInputForm = document.querySelector('.chat-input-form')
        const chatInput = document.querySelector('.chat-input')
        const clearChatBtn = document.querySelector('.clear-chat-button')

        const messages = JSON.parse(localStorage.getItem('messages')) || []

        const createChatMessageElement = (message) => `
        <div class="message ${message.sender === 'John' ? 'blue-bg' : 'gray-bg'}">
            <div class="message-sender">${message.sender}</div>
            <div class="message-text">${message.text}</div>
            <div class="message-timestamp">${message.timestamp}</div>
        </div>
        `

        window.onload = () => {
        messages.forEach((message) => {
            chatMessages.innerHTML += createChatMessageElement(message)
        })
        }

        let messageSender = 'John'

        const updateMessageSender = (name) => {
        messageSender = name
        chatHeader.innerText = `${messageSender} chatting...`
        chatInput.placeholder = `Type here, ${messageSender}...`

        if (name === 'John') {
            johnSelectorBtn.classList.add('active-person')
            janeSelectorBtn.classList.remove('active-person')
        }
        if (name === 'Jane') {
            janeSelectorBtn.classList.add('active-person')
            johnSelectorBtn.classList.remove('active-person')
        }

        /* auto-focus the input field */
        chatInput.focus()
        }

        johnSelectorBtn.onclick = () => updateMessageSender('John')
        janeSelectorBtn.onclick = () => updateMessageSender('Jane')

        const sendMessage = (e) => {
        e.preventDefault()

        const timestamp = new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
        const message = {
            sender: messageSender,
            text: chatInput.value,
            timestamp,
        }

        /* Save message to local storage */
        messages.push(message)
        localStorage.setItem('messages', JSON.stringify(messages))

        /* Add message to DOM */
        chatMessages.innerHTML += createChatMessageElement(message)

        /* Clear input field */
        chatInputForm.reset()

        /*  Scroll to bottom of chat messages */
        chatMessages.scrollTop = chatMessages.scrollHeight
        }

        chatInputForm.addEventListener('submit', sendMessage)

        clearChatBtn.addEventListener('click', () => {
        localStorage.clear()
        chatMessages.innerHTML = ''
        })
    } catch (e) {
        console.log(e)
    }
})