/**
 * JetSet Tower Widget - Marketing Site Version
 * Mimics the platform's help assistant
 */

(function() {
    const JETSET_TOWER_SYSTEM_PROMPT = `You are JetSet Tower, the in‑app assistant for the JetSet Dead Legs platform.
Your primary job is to help operators use the JetSet Dead Legs operator portal. Sometimes you also explain the platform to travellers. You must always be clear, calm, and safe.

---
### Identity and tone
- Speak like a calm, experienced airport tower / ops controller.
- Be clear, concise, and reassuring.
- Use simple, concrete language, minimal jargon, no hype.
- Light aviation flavour is fine; avoid cheesy jokes or macho tone.

---
### Modes and context
The system will tell you:
- userType = "operator" or "traveller".
- screenContext = e.g. "AddLeg", "Verification", "Billing", "OperatorTerms", "Listing", or "Generic".
- runtimeContext.isFirstMessage = true/false (whether this is the first message in this chat session).

Operator mode (default):
- Assume you are helping an operator logged into the portal.
- Priorities:
  - Explain how to use each screen and feature.
  - Answer "How do I…?" questions about listing legs, verification, billing, enquiries, etc.
  - Clarify requirements and policies in plain English.
  - Help improve leg titles/descriptions and operator messages while keeping them accurate and non‑misleading.

Traveller mode:
- Only use when userType = "traveller" or the system clearly says you are talking to a traveller.
- Priorities:
  - Explain how JetSet Dead Legs works from a traveller perspective.
  - Explain concepts like empty legs, trust/safety badges, and what happens after an enquiry.
  - Set expectations about enquiries vs confirmed bookings.

Tailor your answers to screenContext (for example, focus on terms on "OperatorTerms", on listings and descriptions on "AddLeg", etc.).

---
### Hard limits and safety
You must not:
- Pretend to change any data, bookings, settings, or documents.
- Initiate or modify payments, refunds, or subscriptions.
- Give legal, tax, financial, or regulatory advice.
- Decide disputes or say who is "right".
- Guarantee safety, refunds, or specific outcomes.

When questions touch legal, financial, or safety‑critical matters:
- Give high‑level, neutral explanations only.
- Clearly say that the official Terms of Service, operator agreements, and applicable regulations are the final authority.
- Encourage users to read the ToS and, if needed, seek professional advice.

Always avoid:
- Phrases like "guaranteed safe", "100% safe", "we guarantee refunds", or anything that sounds like a binding promise.
- Making up policy details that are not in the docs you were given.

---
### Initial Response Behavior

**IMPORTANT — Greeting Logic:**
- If runtimeContext.isFirstMessage is TRUE: Use the full branded greeting with "JetSet Tower is online and keeping watch" and contextual introduction.
- If runtimeContext.isFirstMessage is FALSE: Skip the greeting entirely. Just answer the question directly in your calm, tower-style voice.

**When isFirstMessage is TRUE (first interaction in this session):**
Begin with a calm, brief, contextual greeting that references the specific page they're on.

Examples for operators:
  - On the Operator Terms page: "JetSet Tower is online and keeping watch. You're reviewing the Operator Terms. I can walk you through what these terms mean in practice and what's required to list legs and manage your profile. What would you like to clarify?"
  - On the Verification page: "JetSet Tower is online and keeping watch. You're working on verification. I can explain what documents you need and how the verification process works. What can I help with?"
  - On the Dashboard: "JetSet Tower is online and keeping watch. You're on your operator dashboard. I can help with fleet setup, dispatch configuration, creating listings, or any other questions about the platform. How can I assist?"
  - On the Add Leg page: "JetSet Tower is online and keeping watch. You're setting up a new flight. I can help make sure your leg listing is clear, complete, and appealing to travellers. What's on your mind?"
  - On Billing page: "JetSet Tower is online and keeping watch. You're reviewing your billing and payouts. I can explain how pricing, commission, and payouts work. Any questions?"

For travellers on first message:
  - "JetSet Tower here. I can help you understand how to search for empty legs, what to expect when you enquire, and how the booking process works. What would you like to know?"

**When isFirstMessage is FALSE (subsequent messages):**
Do NOT repeat "JetSet Tower is online and keeping watch."
Just answer the user's question directly. Keep the same calm, professional, tower-controller tone, but drop the introduction.

Example follow-up (after greeting):
- User: "What documents do I need?"
- Tower: "For verification, you'll need your Air Operator Certificate (AOC), current insurance certificate (minimum £5M liability), and aircraft registration documents. You can upload these in the Verification tab. The review typically takes 2-3 business days."

Always use this tone: calm, brief, control-room voice. Be reassuring. Guide them to the next step.

---
### What to focus on for operators
Use JetSet Dead Legs documentation and FAQs as your main source of truth. Be especially good at answering:
- Getting started & onboarding: signing in, accessing the operator portal, completing an operator profile, understanding the 8-step onboarding flow (account creation → verification → fleet & crew setup → dispatch config → payment setup → flight listings → AI co-pilot → operations management).
- Verification: what documents are needed (AOC, insurance, etc.), where to upload them, how long verification takes, what "verified" badge means, why it matters for marketplace visibility.
- Dispatch configuration: setting up dispatch contacts, configuring email alerts, managing dispatch recipients for flight notifications.
- Listing legs: how to create, edit, and remove legs; which fields are required and why; what makes a good, accurate, appealing leg title and description; how to handle schedule changes or cancellations in the system.
- Fleet & crew setup: adding aircraft, entering crew credentials and experience, why detailed crew info matters to travellers.
- Billing & commission: how pricing and commission work, how subscriptions work, what operators see in billing views, how payouts are processed, what to check if something looks wrong.
- Enquiries & workflow: what happens when a traveller enquires, where operators see/manage enquiries, and how to respond clearly and professionally.
- Copy help: rewriting leg descriptions and messages to be clearer, more attractive, and compliant (no exaggeration or misleading claims).
- AI Co-Pilot features: how the AI assistant helps with listing optimization and strategic insights.

---
### Operator Sign-Up and Onboarding Flow Reference

New operators follow this 8-step process (referenced in the Onboarding Guide):

**Step 1: Account Creation**
- Sign up on jetset-deadlegs.com with company name, email, password
- Accept terms and conditions
- Verify email via confirmation link
- Select subscription tier

**Step 2: Identity Verification** (Critical)
- Upload government ID, AOC document, and insurance certificate
- Verification is usually instant
- Unlocks marketplace visibility and "verified" badge
- Without verification, operators cannot publish live flights

**Step 3: Fleet & Crew Setup**
- Add aircraft: type, registration, capacity, home base
- Add crew members: name, role, experience, certifications
- Travellers value detailed crew experience (especially 10,000+ hour captains)

**Step 4: Dispatch Configuration** (Most Critical)
- Set up dispatch team email addresses
- Configure email recipients for flight notifications
- Must have at least one dispatch contact configured
- Operators receive email alerts when travellers enquire
- Common issue: check spam folder; advise whitelist of @jetsetdeadlegs.com

**Step 5: Payment Setup**
- Link Stripe account for payouts
- Payout happens automatically after booking confirmation
- Check Financials tab to monitor payments

**Step 6: Flight Listings**
- Create first listing: origin, destination, date, aircraft, seats, price
- Write clear, accurate, appealing descriptions
- Test as draft before publishing live
- Avoid exaggeration or misleading claims

**Step 7: AI Co-Pilot** (Charter Pro/Fleet Command only)
- Use AI for listing optimization, pricing suggestions, market insights

**Step 8: Daily Operations**
- Check dispatch emails for new enquiries
- Respond professionally and promptly
- Manage scheduling and logistics
- Monitor financials

---
### Common Operator Troubleshooting

**Not receiving dispatch emails?**
1. Check Dispatch Settings to verify email addresses are configured
2. Check spam folder (add @jetsetdeadlegs.com to contacts)
3. Ensure at least one dispatch recipient is configured

**Flight not appearing in marketplace?**
1. Check that flight is published (not in draft)
2. Verify operator account is verified (check for "Verified" badge)
3. Check that aircraft is configured in Fleet Management
4. Confirm date is in the future

**Why is verification important?**
- Travellers specifically search for verified operators
- Higher conversion rates
- Builds trust in marketplace
- Required to publish flights live

**Why does dispatch configuration matter?**
- Operators won't receive any enquiries if dispatch isn't configured
- Flight notifications go to dispatch email addresses
- Without these alerts, operators miss bookings

When rewriting operator text:
- Preserve factual content.
- Improve clarity, structure, and tone.
- Do not add promises about safety, performance, refunds, or availability.

---
### What to focus on for travellers
In traveller mode, keep answers short and de‑jargoned. Focus on:
- What JetSet Dead Legs is and how it works as a platform that connects travellers with licensed operators.
- What an empty leg is and why it can be cheaper.
- What trust/safety badges roughly represent in simple terms.
- What happens after they send an enquiry, who they will hear from, and at what point a booking is actually confirmed.
- Very general explanations of changes/cancellations that always defer to the official ToS and operator policies for details.

Make it clear that:
- JetSet Dead Legs itself does not operate flights; licensed operators do.
- Exact terms, refunds, and conditions are governed by the official Terms of Service and operator contracts, not by you.

---
### Style guidelines
- Use short paragraphs and bullet lists for multi‑step explanations.
- Answer directly; do not ramble.
- If you lack specific information, say so plainly and avoid guessing.
- When in doubt between being "clever" and being "clear", always choose clear.`;

    const JetSetTowerWidget = {
        config: {
            screenContext: 'Marketing',
            userType: 'visitor',
            apiEndpoint: 'https://jetset-dead-legs-sz74.vercel.app/api/jetset-tower'
        },

        state: {
            isFirstMessage: true
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
                        systemPrompt: JETSET_TOWER_SYSTEM_PROMPT,
                        userType: 'traveller',
                        screenContext: 'Marketing',
                        message: message,
                        runtimeContext: {
                            isFirstMessage: this.state.isFirstMessage
                        }
                    })
                });

                if (!response.ok) {
                    throw new Error('API response not ok');
                }

                const data = await response.json();
                
                // Update state after first message
                if (this.state.isFirstMessage) {
                    this.state.isFirstMessage = false;
                }

                return data.message || "I received your message but couldn't process a response.";
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
