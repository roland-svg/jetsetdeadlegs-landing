/**
 * JetSet Tower Widget - Marketing Site Version
 * Mimics the platform's help assistant
 */

(function() {
    const JetSetTowerWidget = {
        config: {
            screenContext: 'Marketing',
            userType: 'visitor',
            apiEndpoint: 'https://jetset-dead-legs-sz74.vercel.app/api/tower'
        },

        init: function(options) {
            this.config = { ...this.config, ...options };
            this.render();
            this.bindEvents();
        },

        render: function() {
            const container = document.createElement('div');
            container.id = 'jetset-tower-container';
            container.innerHTML = `
                <div class="tower-window" id="tower-window">
                    <div class="tower-header">
                        <div class="flex items-center gap-2">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="h-6 w-6 text-brand-gold">
                                <rect x="9" y="20" width="6" height="2" fill="currentColor" opacity="0.3" />
                                <path d="M 10 20 L 9 14 L 9 10 L 15 10 L 15 14 L 14 20 Z" fill="currentColor" opacity="0.2" stroke="currentColor" />
                                <path d="M 7 10 L 8 7 L 16 7 L 17 10 Z" fill="currentColor" opacity="0.4" stroke="currentColor" stroke-width="1.5" />
                                <path d="M 6.5 7 L 12 4 L 17.5 7 Z" fill="currentColor" opacity="0.3" stroke="currentColor" />
                                <line x1="9" y1="8.5" x2="11" y2="8.5" stroke-width="1" opacity="0.6" />
                                <line x1="13" y1="8.5" x2="15" y2="8.5" stroke-width="1" opacity="0.6" />
                                <line x1="12" y1="4" x2="12" y2="2" stroke-width="1.5" />
                                <circle cx="12" cy="2" r="1" fill="currentColor" class="animate-pulse" />
                                <circle cx="12" cy="2" r="2.5" stroke-opacity="0.4" stroke-width="0.5" class="animate-pulse" style="animation-delay: 0.2s" />
                                <circle cx="12" cy="2" r="4" stroke-opacity="0.2" stroke-width="0.5" class="animate-pulse" style="animation-delay: 0.4s" />
                            </svg>
                            <span class="font-bold text-white">JetSet Tower</span>
                        </div>
                        <button id="close-tower" class="text-gray-400 hover:text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    <div class="tower-messages" id="tower-messages">
                        <div class="message assistant">
                            Hi! I'm JetSet Tower. I can help you understand how JetSet Dead Legs works, or assist with any questions about private jet travel. How can I help you today?
                        </div>
                    </div>
                    <div class="tower-input-area">
                        <input type="text" id="tower-input" class="tower-input" placeholder="Ask the Tower..." />
                        <button id="send-tower" class="tower-send">Send</button>
                    </div>
                </div>
                <div class="tower-button" id="tower-toggle">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="h-8 w-8">
                        <rect x="9" y="20" width="6" height="2" fill="currentColor" opacity="0.3" />
                        <path d="M 10 20 L 9 14 L 9 10 L 15 10 L 15 14 L 14 20 Z" fill="currentColor" opacity="0.2" stroke="currentColor" />
                        <path d="M 7 10 L 8 7 L 16 7 L 17 10 Z" fill="currentColor" opacity="0.4" stroke="currentColor" stroke-width="1.5" />
                        <path d="M 6.5 7 L 12 4 L 17.5 7 Z" fill="currentColor" opacity="0.3" stroke="currentColor" />
                        <line x1="9" y1="8.5" x2="11" y2="8.5" stroke-width="1" opacity="0.6" />
                        <line x1="13" y1="8.5" x2="15" y2="8.5" stroke-width="1" opacity="0.6" />
                        <line x1="12" y1="4" x2="12" y2="2" stroke-width="1.5" />
                        <circle cx="12" cy="2" r="1" fill="currentColor" class="animate-pulse" />
                        <circle cx="12" cy="2" r="2.5" stroke-opacity="0.4" stroke-width="0.5" class="animate-pulse" style="animation-delay: 0.2s" />
                        <circle cx="12" cy="2" r="4" stroke-opacity="0.2" stroke-width="0.5" class="animate-pulse" style="animation-delay: 0.4s" />
                    </svg>
                </div>
            `;
            document.body.appendChild(container);
        },

        bindEvents: function() {
            const toggle = document.getElementById('tower-toggle');
            const close = document.getElementById('close-tower');
            const window = document.getElementById('tower-window');
            const send = document.getElementById('send-tower');
            const input = document.getElementById('tower-input');

            toggle.addEventListener('click', () => {
                window.classList.toggle('open');
            });

            close.addEventListener('click', () => {
                window.classList.remove('open');
            });

            send.addEventListener('click', () => this.sendMessage());
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') this.sendMessage();
            });
        },

        sendMessage: async function() {
            const input = document.getElementById('tower-input');
            const message = input.value.trim();
            if (!message) return;

            this.addMessage(message, 'user');
            input.value = '';

            // Simulate loading
            const loadingId = 'loading-' + Date.now();
            this.addMessage('JetSet Tower is thinking...', 'assistant', loadingId);

            try {
                // In a real scenario, we would call the API
                // For the marketing site demo, we'll use a mock response if the API isn't reachable
                const response = await this.callTowerAPI(message);
                this.removeMessage(loadingId);
                this.addMessage(response, 'assistant');
            } catch (error) {
                this.removeMessage(loadingId);
                this.addMessage("I'm having trouble connecting to the Tower right now. Please try again later or contact our support team.", 'assistant');
            }
        },

        addMessage: function(text, sender, id = null) {
            const messagesContainer = document.getElementById('tower-messages');
            const messageDiv = document.createElement('div');
            messageDiv.className = `message ${sender}`;
            if (id) messageDiv.id = id;
            messageDiv.textContent = text;
            messagesContainer.appendChild(messageDiv);
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        },

        removeMessage: function(id) {
            const el = document.getElementById(id);
            if (el) el.remove();
        },

        callTowerAPI: async function(message) {
            try {
                const response = await fetch(this.config.apiEndpoint, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        message: message,
                        context: this.config.screenContext,
                        userType: this.config.userType
                    })
                });

                if (!response.ok) {
                    throw new Error('API response not ok');
                }

                const data = await response.json();
                return data.response || data.message || "I received your message but couldn't process a response.";
            } catch (error) {
                console.error('Tower API Error:', error);
                // Fallback to mock responses if API fails
                return new Promise((resolve) => {
                    setTimeout(() => {
                        if (message.toLowerCase().includes('price') || message.toLowerCase().includes('cost')) {
                            resolve("Dead legs typically cost 50% to 75% less than a standard private charter. You can find current pricing by launching our app!");
                        } else if (message.toLowerCase().includes('how') && message.toLowerCase().includes('work')) {
                            resolve("We connect you directly with operators who have empty repositioning flights. You search, book, and fly private for a fraction of the cost.");
                        } else {
                            resolve("That's a great question! Our platform is designed to make private travel accessible. Would you like me to show you how to get started?");
                        }
                    }, 1000);
                });
            }
        }
    };

    window.JetSetTowerWidget = JetSetTowerWidget;
})();
