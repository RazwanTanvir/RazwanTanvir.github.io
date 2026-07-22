document.addEventListener('DOMContentLoaded', () => {
    const nameText = "Razwan Ahmed Tanvir";
    const typeWriterElement = document.getElementById('typewriter-text');
    let i = 0;

    // Terminal typing effect for the header
    function typeWriter() {
        if (i < nameText.length) {
            typeWriterElement.innerHTML += nameText.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    }

    // Initialize typing
    setTimeout(typeWriter, 500);

    // Collapsible sections logic
    const headers = document.querySelectorAll('.collapsible-header');

    headers.forEach(header => {
        header.addEventListener('click', function() {
            const icon = this.querySelector('.toggle-icon');
            const content = this.nextElementSibling;

            if (content.classList.contains('active')) {
                content.classList.remove('active');
                icon.textContent = '[+]';
            } else {
                content.classList.add('active');
                icon.textContent = '[-]';
                
                // Trigger citation fetch animation only when Research tab is opened
                if (this.textContent.includes('Publications') && !this.dataset.fetched) {
                    fetchRealTimeCitations();
                    this.dataset.fetched = "true"; // Prevent re-fetching
                }
            }
        });
    });

    // Simulated Real-Time Citation Fetcher
    async function fetchRealTimeCitations() {
        const citationEl = document.getElementById('citation-count');
        citationEl.classList.add('processing');
        
        let glitchInterval = setInterval(() => {
            citationEl.textContent = Math.floor(Math.random() * 999).toString().padStart(3, '0');
        }, 50);

        try {
            /* 
            =============================================================
            BACKEND INTEGRATION POINT
            =============================================================
            Google Scholar blocks client-side scraping (CORS). 
            To make this truly real-time, spin up a Python/Node endpoint 
            using SerpApi or BeautifulSoup, and fetch from it here:
            
            const response = await fetch('https://your-api-endpoint.com/citations');
            const data = await response.json();
            const realCount = data.count;
            =============================================================
            */
            
            // Simulating network delay for the aesthetic
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Fallback to static count until backend is built
            const realCount = 52; 

            clearInterval(glitchInterval);
            citationEl.classList.remove('processing');
            citationEl.textContent = realCount;
            citationEl.style.color = '#39ff14'; // Portal green on success
            
        } catch (error) {
            clearInterval(glitchInterval);
            citationEl.classList.remove('processing');
            citationEl.textContent = "ERR_CONNECTION";
            citationEl.style.color = "red";
        }
    }

    // Anonymous Message Logic
    const sendBtn = document.getElementById('send-msg-btn');
    const msgInput = document.getElementById('anonymous-msg');
    const statusText = document.getElementById('transmission-status');

    sendBtn.addEventListener('click', async () => {
        const payload = msgInput.value.trim();
        
        if (!payload) {
            statusText.style.color = "#ff4136"; // Error red
            statusText.textContent = "ERR: Payload empty. Aborting.";
            return;
        }

        // Disable input while "sending"
        msgInput.disabled = true;
        sendBtn.disabled = true;
        statusText.style.color = "#ffd700"; // Processing yellow

        // Simulated transmission sequence
        statusText.textContent = "Encrypting payload...";
        await new Promise(r => setTimeout(r, 800));
        
        statusText.textContent = "Routing through C-137 dimensions...";
        await new Promise(r => setTimeout(r, 1000));
        
        // ACTUAL API CALL
        const formspreeEndpoint = "https://formspree.io/f/xykrpqen";

        try {
            const response = await fetch(formspreeEndpoint, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 
                    message: payload,
                    subject: "New Anonymous Transmission from Portfolio"
                })
            });

            if (response.ok) {
                // Success state
                statusText.style.color = "#39ff14"; // Success green
                statusText.textContent = "SUCCESS: Payload delivered anonymously.";
                msgInput.value = ""; // Clear the text box
            } else {
                throw new Error("Transmission blocked by galactic federation.");
            }
        } catch (error) {
            // Error state
            statusText.style.color = "#ff4136"; // Error red
            statusText.textContent = "ERR: Transmission failed. Try again later.";
        } finally {
            // Re-enable form
            msgInput.disabled = false;
            sendBtn.disabled = false;
            
            // Clear status message after 5 seconds
            setTimeout(() => {
                statusText.textContent = "";
            }, 5000);
        }
    });

    // ==========================================
    // PORTAL GUN THEME TOGGLE
    // ==========================================
    const portalBtn = document.getElementById('portal-gun-btn');
    const themes = ['', 'theme-blue-sky', 'theme-hollywoo'];
    let currentThemeIndex = 0;

    if (portalBtn) {
        portalBtn.addEventListener('click', () => {
            // Screen flash effect for the jump
            document.body.style.opacity = '0.5';
            setTimeout(() => { document.body.style.opacity = '1'; }, 150);

            // Cycle to the next dimension
            currentThemeIndex = (currentThemeIndex + 1) % themes.length;
            
            // Clear current theme classes and apply the new one
            document.body.className = '';
            if (themes[currentThemeIndex]) {
                document.body.classList.add(themes[currentThemeIndex]);
            }

            // Secret terminal log for DevTools snoopers
            const dimensions = ['C-137 (Default / Toxic Green)', 'Earth-616 (Blue Sky / Heisenberg)', 'Hollywoo (Pastel / 90s LA)'];
            console.log(`%c[PORTAL GUN FIRED] Jumped to dimension: ${dimensions[currentThemeIndex]}`, `color: var(--highlight); font-weight: bold; font-family: monospace;`);
        });
    }

    // Easter egg in the developer console
    console.log("%c Wubba Lubba Dub Dub! System Initialized.", "color: #39ff14; font-size: 16px; font-weight: bold;");
    console.log("Routing connection through dimensions...");
});