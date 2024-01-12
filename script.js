    let isDarkMode = false;

    function handleKeyPress(event) {
      if (event.key === 'Enter' && !event.shiftKey) {
        sendMessage();
        event.preventDefault();
      }
    }

    function showLoadingAnimation() {
      const chatDisplay = document.getElementById('chat-display');
      const loadingMessage = document.createElement('div');
      loadingMessage.classList.add('ai', 'loading');
      loadingMessage.innerText = 'Stm Journals Typing...';
      chatDisplay.appendChild(loadingMessage);
      chatDisplay.scrollTop = chatDisplay.scrollHeight;
    }

    function sendMessage() {
      const userInput = document.getElementById('user-input').value;
      const chatDisplay = document.getElementById('chat-display');

      // Display user message
      appendMessage('user', userInput);

      // Show loading animation
      showLoadingAnimation();

      // Send user message to the server
      fetch('https://stmjournalsopenai.onrender.com/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userInput }),
      })
        .then(response => response.json())
        .then(data => {
          const aiMessage = data.aiMessage;

          // Remove loading animation
          const loadingMessage = chatDisplay.querySelector('.ai.loading');
          if (loadingMessage) {
            loadingMessage.remove();
          }

          // Display AI response
          appendMessage('ai', aiMessage);
        })
        .catch(error => console.error('Error:', error));

      // Clear user input
      document.getElementById('user-input').value = '';
    }

    function appendMessage(role, content) {
      const chatDisplay = document.getElementById('chat-display');
      const message = document.createElement('div');
      message.classList.add(role);

      // Add user image
      if (role === 'user') {
        const userImage = document.createElement('img');
        userImage.src = 'https://cdn-icons-png.flaticon.com/512/149/149071.png'; // Replace with the actual path to the user image
        userImage.alt = 'User Image';
        userImage.classList.add('user-image');
        message.appendChild(userImage);
      }

      // Add AI image
      if (role === 'ai') {
        const aiImage = document.createElement('img');
        aiImage.src = 'https://storage.googleapis.com/journals-stmjournals-com-wp-media-to-gcp-offload/2022/09/logo_stm.png'; // Replace with the actual path to the AI image
        aiImage.alt = 'AI Image';
        aiImage.classList.add('ai-image');
        message.appendChild(aiImage);
      }

      const contentElement = document.createElement('div');
      contentElement.innerText = content;
      message.appendChild(contentElement);

      // Add a copy button to AI messages
      if (role === 'ai') {
        const copyBtn = document.createElement('span');
        copyBtn.classList.add('copy-btn', 'material-symbols-rounded');
        copyBtn.innerHTML = 'content_copy';
        copyBtn.onclick = function () {
          navigator.clipboard.writeText(content);
          copyBtn.innerHTML = 'done';
          setTimeout(() => {
            copyBtn.innerHTML = 'content_copy';
            alert('Copied content successfully!');
          }, 1000);
        };
        message.appendChild(copyBtn);
      }

      chatDisplay.appendChild(message);

      // Scroll to the bottom of the chat display
      chatDisplay.scrollTop = chatDisplay.scrollHeight;
    }

    function deleteAllChats() {
      const chatDisplay = document.getElementById('chat-display');
      chatDisplay.innerHTML = '';
    }

    function toggleTheme() {
      const body = document.body;
      isDarkMode = !isDarkMode;

      if (isDarkMode) {
        body.classList.add('dark-mode');
      } else {
        body.classList.remove('dark-mode');
      }
    }