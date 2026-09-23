
      (function() {
        // ===== CONFIGURATION =====
        const CONFIG = {
          phoneNumber: "254715360360", // Replace with your WhatsApp number (international format, no +)
          welcomeMessage: "Hello Sheria360! I need assistance.",
          autoOpenDelay: 1500, // milliseconds before auto-opening on page load
          autoOpenOncePerSession: true, // set to false to open every page load
          agentName: "Sheria360",
          avatarText: "SA", // initials or short text for avatar
          statusText: "Typically replies within 1 hour",
          businessHours: "8am - 6pm", // optional
          // You can add more customization here
        };

        // ===== DOM ELEMENTS =====
        const floatBtn = document.getElementById('wa-float-btn');
        const chatPopup = document.getElementById('wa-chat-popup');
        const closeBtn = document.getElementById('wa-close-btn');
        const inputField = document.getElementById('wa-input');
        const sendBtn = document.getElementById('wa-send-btn');

        // ===== OPEN/CLOSE FUNCTIONS =====
        function openChat() {
          chatPopup.classList.add('open');
          floatBtn.style.display = 'none'; // hide float button while chat is open
          inputField.focus();
        }

        function closeChat() {
          chatPopup.classList.remove('open');
          floatBtn.style.display = 'flex';
        }

        // ===== EVENT LISTENERS =====
        floatBtn.addEventListener('click', openChat);
        closeBtn.addEventListener('click', closeChat);

        // Send message via WhatsApp
        function sendMessage() {
          const message = inputField.value.trim() || CONFIG.welcomeMessage;
          const url = `https://wa.me/${CONFIG.phoneNumber}?text=${encodeURIComponent(message)}`;
          window.open(url, '_blank');
          inputField.value = '';
        }

        sendBtn.addEventListener('click', sendMessage);
        inputField.addEventListener('keypress', function(e) {
          if (e.key === 'Enter') sendMessage();
        });

        // ===== AUTO-OPEN LOGIC =====
        function autoOpen() {
          if (CONFIG.autoOpenOncePerSession) {
            // Check if already auto-opened in this session
            if (!sessionStorage.getItem('wa_auto_opened')) {
              setTimeout(() => {
                openChat();
                sessionStorage.setItem('wa_auto_opened', 'true');
              }, CONFIG.autoOpenDelay);
            }
          } else {
            setTimeout(openChat, CONFIG.autoOpenDelay);
          }
        }

        // Initialize auto-open
        autoOpen();

        // ===== OPTIONAL: Set status/business hours =====
        // You can dynamically update the status text based on current time
        function updateStatus() {
          const now = new Date();
          const hours = now.getHours();
          const minutes = now.getMinutes();
          const currentTime = hours * 100 + minutes;
          // Simple schedule check (adjust as needed)
          const inHours = (currentTime >= 800 && currentTime <= 1800); // 8am-6pm
          const statusEl = document.querySelector('.wa-chat-status');
          if (statusEl) {
            statusEl.textContent = inHours 
              ? `Online now · ${CONFIG.businessHours}` 
              : `Offline · ${CONFIG.businessHours}`;
          }
        }
        updateStatus();
      })();
    