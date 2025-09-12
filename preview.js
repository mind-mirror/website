// Full MindMirror app replica for website preview
class MindMirrorPreview {
    constructor() {
        this.currentView = 'prompt';
        this.demoUser = this.generateDemoUser();
        this.demoData = this.generateDemoData();
        this.currentEntry = {
            responseType: 'text',
            textContent: '',
            selectedEmoji: '😊',
            selectedMood: null
        };
        this.init();
    }

    generateDemoUser() {
        const names = ['Alex', 'Jordan', 'Casey', 'Riley', 'Sage', 'Quinn', 'Avery', 'Blake'];
        const avatars = ['🌟', '🌸', '🦋', '🌙', '☀️', '🌊', '🍃', '✨'];
        
        return {
            name: names[Math.floor(Math.random() * names.length)],
            avatar: avatars[Math.floor(Math.random() * avatars.length)],
            favoriteColor: '#667eea'
        };
    }

    generateDemoData() {
        const prompts = [
            "What made you smile today?",
            "What's one small thing you're grateful for right now?",
            "What's something you're looking forward to?",
            "How are you feeling right now, and why?",
            "What's one thing you learned recently?"
        ];
        
        const reflections = [
            "Today was a good day for learning new things. I discovered something interesting about myself.",
            "I felt grateful for the small moments of joy that happened throughout my day.",
            "Challenges helped me grow stronger today. I'm proud of how I handled difficult situations.",
            "I'm learning to appreciate the quiet moments and find peace in simple things.",
            "Taking time to reflect really helps my mindset and gives me clarity."
        ];

        const moods = ['joyful', 'grateful', 'calm', 'focused', 'tired'];
        const emojis = ['😊', '😌', '🙏', '💪', '🤔', '😴', '✨', '❤️', '🌟'];

        return {
            todaysPrompt: prompts[Math.floor(Math.random() * prompts.length)],
            recentReflections: reflections.slice(0, 3),
            streak: Math.floor(Math.random() * 15) + 1,
            totalReflections: Math.floor(Math.random() * 50) + 10,
            weeklyMoods: Array.from({length: 7}, () => moods[Math.floor(Math.random() * moods.length)]),
            recentEmojis: Array.from({length: 5}, () => emojis[Math.floor(Math.random() * emojis.length)])
        };
    }

    init() {
        const previewContainer = document.getElementById('app-preview');
        if (previewContainer) {
            this.renderApp(previewContainer);
        }
    }

    renderApp(container) {
        container.innerHTML = `
            <div class="mindmirror-app">
                ${this.renderNavigation()}
                <main class="app-content">
                    ${this.renderCurrentView()}
                </main>
            </div>
        `;

        this.addAppStyles();
        this.setupEventListeners();
    }

    renderNavigation() {
        return `
            <nav class="app-nav">
                <ul class="nav-tabs">
                    <li class="nav-tab ${this.currentView === 'prompt' ? 'active' : ''}" data-view="prompt">
                        <span class="material-icons">wb_sunny</span> Today
                    </li>
                    <li class="nav-tab ${this.currentView === 'timeline' ? 'active' : ''}" data-view="timeline">
                        <span class="material-icons">event</span> Timeline
                    </li>
                    <li class="nav-tab ${this.currentView === 'wellbeing' ? 'active' : ''}" data-view="wellbeing">
                        <span class="material-icons">psychology</span> Wellbeing
                    </li>
                    <li class="nav-tab ${this.currentView === 'profile' ? 'active' : ''}" data-view="profile">
                        <span class="material-icons">account_circle</span> My Profile
                    </li>
                </ul>
            </nav>
        `;
    }

    renderCurrentView() {
        switch(this.currentView) {
            case 'prompt':
                return this.renderPromptView();
            case 'timeline':
                return this.renderTimelineView();
            case 'wellbeing':
                return this.renderWellbeingView();
            case 'profile':
                return this.renderProfileView();
            default:
                return this.renderPromptView();
        }
    }

    renderPromptView() {
        return `
            <div class="app-card">
                <h2 class="prompt-text">${this.demoData.todaysPrompt}</h2>
                <p class="prompt-date">${new Date().toLocaleDateString()}</p>
                
                <div class="response-types">
                    <div class="response-type ${this.currentEntry.responseType === 'text' ? 'active' : ''}" data-type="text">
                        <i class="fas fa-comment"></i>
                        <span>Text</span>
                    </div>
                    <div class="response-type ${this.currentEntry.responseType === 'emoji' ? 'active' : ''}" data-type="emoji">
                        <i class="fas fa-face-smile"></i>
                        <span>Emoji</span>
                    </div>
                </div>
                
                <div class="response-input">
                    ${this.currentEntry.responseType === 'text' ? 
                        `<textarea class="text-response" placeholder="Write your reflection here..." readonly>This is a demo - try the real app to save your reflections!</textarea>` :
                        `<div class="emoji-grid">
                            ${['😊', '😌', '🙏', '💪', '🤔', '😴', '😓', '😔', '😰', '✨', '❤️', '🌟', '🌈', '🌱', '🌊', '🔥', '🍃', '🧘♀️', '🤗', '🙌'].map(emoji => `
                                <div class="emoji-item ${this.currentEntry.selectedEmoji === emoji ? 'selected' : ''}" data-emoji="${emoji}">
                                    ${emoji}
                                </div>
                            `).join('')}
                        </div>`
                    }
                </div>
                
                <div class="mood-selector">
                    <h3>How are you feeling?</h3>
                    <div class="mood-tags">
                        ${[
                            { id: 'joyful', name: 'Joyful', emoji: '😊', color: 'rgba(255, 200, 100, 0.7)' },
                            { id: 'grateful', name: 'Grateful', emoji: '🙏', color: 'rgba(100, 200, 150, 0.7)' },
                            { id: 'calm', name: 'Calm', emoji: '😌', color: 'rgba(100, 180, 255, 0.7)' },
                            { id: 'focused', name: 'Focused', emoji: '🧠', color: 'rgba(130, 150, 200, 0.7)' },
                            { id: 'tired', name: 'Tired', emoji: '😴', color: 'rgba(180, 180, 200, 0.7)' },
                            { id: 'stressed', name: 'Stressed', emoji: '😰', color: 'rgba(255, 150, 150, 0.7)' }
                        ].map(mood => `
                            <div class="mood-tag ${this.currentEntry.selectedMood === mood.id ? 'selected' : ''}" 
                                 data-mood="${mood.id}" 
                                 style="background-color: ${mood.color}40;">
                                ${mood.emoji}
                                <span>${mood.name}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <button class="app-btn primary" onclick="previewApp.showDemoMessage()">
                    <i class="fas fa-check"></i> Save Reflection
                </button>
            </div>
        `;
    }

    renderTimelineView() {
        return `
            <div class="app-card">
                <div class="view-header">
                    <h2>Timeline</h2>
                    <button class="app-btn secondary">
                        📥 Export
                    </button>
                </div>
                
                <div class="search-filters">
                    <input type="text" placeholder="Search entries..." class="search-input" readonly>
                    <select class="filter-select">
                        <option>All Moods</option>
                        <option>Joyful</option>
                        <option>Grateful</option>
                        <option>Calm</option>
                    </select>
                </div>
                
                <div class="timeline">
                    ${this.demoData.recentReflections.map((reflection, index) => {
                        const date = new Date();
                        date.setDate(date.getDate() - index);
                        const day = date.getDate();
                        const weekday = date.toLocaleDateString('en-US', { weekday: 'short' });
                        const mood = this.demoData.weeklyMoods[index] || 'calm';
                        
                        return `
                            <div class="timeline-entry">
                                <div class="timeline-date">
                                    <div class="timeline-day">${day}</div>
                                    <div class="timeline-weekday">${weekday}</div>
                                </div>
                                <div class="timeline-content">
                                    <div class="timeline-prompt">${this.demoData.todaysPrompt}</div>
                                    <div class="timeline-reflection">
                                        ${reflection.length > 100 ? reflection.substring(0, 100) + '...' : reflection}
                                    </div>
                                    <div class="timeline-mood">
                                        <i class="fas fa-face-smile"></i> ${mood.charAt(0).toUpperCase() + mood.slice(1)}
                                    </div>
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>
        `;
    }

    renderWellbeingView() {
        return `
            <div class="app-card">
                <h2>Mental Wellbeing Resources</h2>
                
                <div class="wellbeing-actions">
                    <button class="wellbeing-btn" style="background: rgba(80, 180, 170, 0.8);">
                        📊
                        <span>Mood Tracker</span>
                    </button>
                    <button class="wellbeing-btn" style="background: rgba(255, 200, 100, 0.5);">
                        ❤️
                        <span>Gratitude Journal</span>
                    </button>
                    <button class="wellbeing-btn" style="background: rgba(100, 130, 200, 0.8);">
                        🌬️
                        <span>Breathing Exercise</span>
                    </button>
                </div>
                
                <div class="wellbeing-resources">
                    ${[
                        { title: "Understanding Mental Health", icon: "fa-brain", content: "Mental health includes our emotional, psychological, and social well-being." },
                        { title: "Mindfulness Practices", icon: "fa-leaf", content: "Mindfulness is the practice of purposely focusing your attention on the present moment." },
                        { title: "Stress Management", icon: "fa-heart-pulse", content: "Stress management strategies include regular physical activity and relaxation techniques." }
                    ].map(resource => `
                        <div class="resource-card">
                            <div class="resource-header">
                                <i class="fas ${resource.icon}"></i>
                                <h3>${resource.title}</h3>
                            </div>
                            <p>${resource.content}</p>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    renderProfileView() {
        return `
            <div class="app-card">
                <h2>My Profile</h2>
                
                <div class="profile-sections">
                    ${[
                        { name: 'Affirmations', icon: 'fa-heart', color: 'rgba(255, 200, 100, 0.5)', desc: 'Daily positive thoughts' },
                        { name: 'Analytics', icon: 'fa-chart-line', color: 'rgba(100, 130, 200, 0.8)', desc: 'Track your progress' },
                        { name: 'Goals & Habits', icon: 'fa-bullseye', color: 'rgba(80, 180, 170, 0.8)', desc: 'Personal development' },
                        { name: 'Settings', icon: 'fa-gear', color: 'rgba(100, 100, 100, 0.6)', desc: 'App preferences & themes' }
                    ].map(section => `
                        <div class="profile-section" style="background: ${section.color}20; border: 1px solid ${section.color}40;">
                            <div class="section-header">
                                <i class="fas ${section.icon}" style="color: ${section.color};"></i>
                                <div>
                                    <h3>${section.name}</h3>
                                    <p>${section.desc}</p>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
                
                <div class="profile-summary">
                    <div class="profile-avatar">
                        <span style="font-size: 2rem;">${this.demoUser.avatar}</span>
                    </div>
                    <h3>Hello, ${this.demoUser.name}!</h3>
                    <p>Your personal space for reflection and growth</p>
                    
                    <div class="profile-stats">
                        <div class="stat">
                            <div class="stat-number">${this.demoData.streak}</div>
                            <div class="stat-label">Day Streak</div>
                        </div>
                        <div class="stat">
                            <div class="stat-number">${this.demoData.totalReflections}</div>
                            <div class="stat-label">Reflections</div>
                        </div>
                        <div class="stat">
                            <div class="stat-number">5</div>
                            <div class="stat-label">Achievements</div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    setupEventListeners() {
        // Navigation tabs
        document.querySelectorAll('.nav-tab').forEach(tab => {
            tab.addEventListener('click', () => {
                document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                this.currentView = tab.dataset.view;
                this.renderCurrentView();
                document.querySelector('.app-content').innerHTML = this.renderCurrentView();
                this.setupEventListeners();
            });
        });

        // Response type selection
        document.querySelectorAll('.response-type').forEach(type => {
            type.addEventListener('click', () => {
                document.querySelectorAll('.response-type').forEach(t => t.classList.remove('active'));
                type.classList.add('active');
                this.currentEntry.responseType = type.dataset.type;
                document.querySelector('.response-input').innerHTML = 
                    this.currentEntry.responseType === 'text' ? 
                        `<textarea class="text-response" placeholder="Write your reflection here..." readonly>This is a demo - try the real app to save your reflections!</textarea>` :
                        `<div class="emoji-grid">
                            ${['😊', '😌', '🙏', '💪', '🤔', '😴', '😓', '😔', '😰', '✨', '❤️', '🌟', '🌈', '🌱', '🌊', '🔥', '🍃', '🧘♀️', '🤗', '🙌'].map(emoji => `
                                <div class="emoji-item ${this.currentEntry.selectedEmoji === emoji ? 'selected' : ''}" data-emoji="${emoji}">
                                    ${emoji}
                                </div>
                            `).join('')}
                        </div>`;
                this.setupEmojiListeners();
            });
        });

        // Emoji selection
        this.setupEmojiListeners();

        // Mood selection
        document.querySelectorAll('.mood-tag').forEach(tag => {
            tag.addEventListener('click', () => {
                const moodId = tag.dataset.mood;
                document.querySelectorAll('.mood-tag').forEach(t => t.classList.remove('selected'));
                if (this.currentEntry.selectedMood !== moodId) {
                    tag.classList.add('selected');
                    this.currentEntry.selectedMood = moodId;
                } else {
                    this.currentEntry.selectedMood = null;
                }
            });
        });
    }

    setupEmojiListeners() {
        document.querySelectorAll('.emoji-item').forEach(item => {
            item.addEventListener('click', () => {
                document.querySelectorAll('.emoji-item').forEach(i => i.classList.remove('selected'));
                item.classList.add('selected');
                this.currentEntry.selectedEmoji = item.dataset.emoji;
            });
        });
    }

    showDemoMessage() {
        alert('🌟 This is just a demo! Download the full MindMirror app to save your reflections and unlock all features.');
    }

    addAppStyles() {
        if (document.getElementById('mindmirror-app-styles')) return;

        const styles = document.createElement('style');
        styles.id = 'mindmirror-app-styles';
        styles.textContent = `
            .mindmirror-app {
                background: #0a0f1f;
                background-image: 
                    radial-gradient(circle at 20% 20%, rgba(100, 130, 200, 0.1) 0%, transparent 40%),
                    radial-gradient(circle at 80% 50%, rgba(80, 180, 170, 0.1) 0%, transparent 40%),
                    radial-gradient(circle at 40% 80%, rgba(255, 200, 100, 0.1) 0%, transparent 40%);
                border-radius: 15px;
                overflow: hidden;
                min-height: 500px;
                display: flex;
                flex-direction: column;
                font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                color: rgba(240, 240, 240, 0.9);
            }

            .app-nav {
                background: rgba(30, 40, 60, 0.25);
                backdrop-filter: blur(12px);
                -webkit-backdrop-filter: blur(12px);
                box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
                padding: 0;
                border-radius: 0 0 16px 16px;
                margin: 0 10px;
                border: 1px solid rgba(255, 255, 255, 0.1);
                overflow: hidden;
            }

            .nav-tabs {
                display: flex;
                list-style: none;
                width: 100%;
                padding: 5px;
                margin: 0;
            }

            .nav-tab {
                padding: 15px 20px;
                cursor: pointer;
                flex: 1;
                text-align: center;
                border-radius: 16px;
                transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
                margin: 0 5px;
                font-weight: 500;
                position: relative;
                overflow: hidden;
                font-size: 0.9rem;
            }

            .nav-tab:hover {
                transform: translateY(-2px);
                background-color: rgba(255, 255, 255, 0.1);
            }

            .nav-tab.active {
                background-color: rgba(100, 130, 200, 0.8);
                color: white;
                transform: translateY(-2px);
                box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
            }

            .nav-tab i {
                margin-right: 8px;
                font-size: 1.2em;
                transition: all 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            }

            .app-content {
                flex: 1;
                padding: 20px;
                max-width: 800px;
                margin: 0 auto;
                width: 100%;
            }

            .app-card {
                background: rgba(30, 40, 60, 0.25);
                backdrop-filter: blur(12px);
                -webkit-backdrop-filter: blur(12px);
                border-radius: 16px;
                box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
                padding: 25px;
                margin-bottom: 20px;
                transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
                border: 1px solid rgba(255, 255, 255, 0.1);
                position: relative;
                overflow: hidden;
            }

            .prompt-text {
                font-size: 1.8rem;
                font-weight: 600;
                margin-bottom: 15px;
                line-height: 1.4;
                color: rgba(240, 240, 240, 0.9);
                transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            }

            .prompt-date {
                color: rgba(200, 200, 200, 0.7);
                font-size: 0.9rem;
                margin-bottom: 25px;
                transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            }

            .response-types {
                display: flex;
                justify-content: space-between;
                margin-bottom: 25px;
                background: rgba(255, 255, 255, 0.1);
                backdrop-filter: blur(12px);
                -webkit-backdrop-filter: blur(12px);
                border-radius: 16px;
                padding: 10px;
                border: 1px solid rgba(255, 255, 255, 0.1);
            }

            .response-type {
                display: flex;
                flex-direction: column;
                align-items: center;
                cursor: pointer;
                padding: 15px;
                border-radius: 16px;
                transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
                flex: 1;
                margin: 0 5px;
                position: relative;
                overflow: hidden;
            }

            .response-type:hover {
                transform: translateY(-3px);
                background-color: rgba(255, 255, 255, 0.1);
            }

            .response-type.active {
                background-color: rgba(80, 180, 170, 0.8);
                color: white;
                transform: translateY(-3px);
                box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
            }

            .response-type i {
                font-size: 1.8rem;
                margin-bottom: 8px;
                transition: all 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            }

            .text-response {
                width: 100%;
                min-height: 150px;
                padding: 15px;
                border: 1px solid rgba(255, 255, 255, 0.1);
                border-radius: 16px;
                background: rgba(30, 40, 60, 0.25);
                backdrop-filter: blur(12px);
                -webkit-backdrop-filter: blur(12px);
                color: rgba(240, 240, 240, 0.9);
                font-family: inherit;
                resize: vertical;
                margin-bottom: 25px;
                font-size: 1rem;
                transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            }

            .text-response:focus {
                outline: none;
                box-shadow: 0 0 0 3px rgba(100, 130, 200, 0.2);
                transform: translateY(-2px);
            }

            .emoji-grid {
                display: grid;
                grid-template-columns: repeat(5, 1fr);
                gap: 15px;
                margin-bottom: 25px;
            }

            .emoji-item {
                font-size: 2.5rem;
                text-align: center;
                cursor: pointer;
                padding: 15px;
                border-radius: 16px;
                transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
                background: rgba(30, 40, 60, 0.25);
                backdrop-filter: blur(12px);
                -webkit-backdrop-filter: blur(12px);
                border: 1px solid rgba(255, 255, 255, 0.1);
            }

            .emoji-item:hover {
                background: rgba(255, 255, 255, 0.2);
                transform: scale(1.1);
            }

            .emoji-item.selected {
                background: rgba(255, 200, 100, 0.5);
                transform: scale(1.1);
                box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
                border: 1px solid rgba(255, 255, 255, 0.5);
            }

            .mood-selector h3 {
                margin-bottom: 15px;
                color: rgba(240, 240, 240, 0.9);
            }

            .mood-tags {
                display: flex;
                flex-wrap: wrap;
                gap: 10px;
                margin-bottom: 25px;
            }

            .mood-tag {
                padding: 10px 15px;
                border-radius: 30px;
                cursor: pointer;
                font-size: 0.95rem;
                display: flex;
                align-items: center;
                transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
                font-weight: 500;
                background: rgba(30, 40, 60, 0.25);
                backdrop-filter: blur(12px);
                -webkit-backdrop-filter: blur(12px);
                border: 1px solid rgba(255, 255, 255, 0.1);
            }

            .mood-tag:hover {
                transform: translateY(-3px);
                background: rgba(255, 255, 255, 0.2);
            }

            .mood-tag.selected {
                transform: translateY(-3px);
                box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
                border: 2px solid rgba(100, 130, 200, 0.8);
            }

            .mood-tag i {
                margin-right: 8px;
                font-size: 1.2em;
                transition: all 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            }

            .app-btn {
                padding: 15px 25px;
                border: none;
                border-radius: 30px;
                cursor: pointer;
                font-size: 1.1rem;
                font-weight: 600;
                transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
                width: 100%;
                box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
                position: relative;
                overflow: hidden;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 8px;
            }

            .app-btn.primary {
                background: rgba(100, 130, 200, 0.8);
                color: white;
            }

            .app-btn.secondary {
                background: rgba(80, 180, 170, 0.8);
                color: white;
            }

            .app-btn:hover {
                transform: translateY(-3px);
                box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
                opacity: 0.9;
            }

            .view-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 20px;
            }

            .view-header h2 {
                margin: 0;
                color: rgba(240, 240, 240, 0.9);
            }

            .search-filters {
                display: flex;
                gap: 10px;
                margin-bottom: 20px;
                flex-wrap: wrap;
            }

            .search-input, .filter-select {
                flex: 1;
                min-width: 200px;
                padding: 8px;
                border: 1px solid rgba(255, 255, 255, 0.1);
                border-radius: 8px;
                background: rgba(30, 40, 60, 0.25);
                color: rgba(240, 240, 240, 0.9);
            }

            .timeline {
                display: flex;
                flex-direction: column;
                gap: 15px;
            }

            .timeline-entry {
                display: flex;
                cursor: pointer;
                transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            }

            .timeline-entry:hover {
                transform: translateX(10px);
            }

            .timeline-date {
                min-width: 70px;
                text-align: center;
                padding-right: 15px;
                display: flex;
                flex-direction: column;
                justify-content: center;
            }

            .timeline-day {
                font-size: 2rem;
                font-weight: 600;
                color: rgba(240, 240, 240, 0.9);
                line-height: 1;
                transition: all 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            }

            .timeline-weekday {
                font-size: 0.9rem;
                color: rgba(200, 200, 200, 0.7);
                font-weight: 500;
            }

            .timeline-content {
                flex: 1;
                background: rgba(30, 40, 60, 0.25);
                backdrop-filter: blur(12px);
                -webkit-backdrop-filter: blur(12px);
                border-radius: 16px;
                padding: 20px;
                box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
                border: 1px solid rgba(255, 255, 255, 0.1);
                transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            }

            .timeline-prompt {
                font-weight: 500;
                margin-bottom: 10px;
                color: rgba(240, 240, 240, 0.9);
            }

            .timeline-reflection {
                margin: 15px 0;
                color: rgba(200, 200, 200, 0.7);
                line-height: 1.6;
            }

            .timeline-mood {
                display: inline-block;
                padding: 5px 12px;
                border-radius: 20px;
                font-size: 0.9rem;
                background-color: rgba(100, 130, 200, 0.2);
                font-weight: 500;
                color: rgba(240, 240, 240, 0.9);
            }

            .wellbeing-actions {
                display: flex;
                gap: 10px;
                margin-bottom: 25px;
                flex-wrap: wrap;
            }

            .wellbeing-btn {
                flex: 1;
                min-width: 150px;
                padding: 15px 20px;
                border: none;
                border-radius: 15px;
                cursor: pointer;
                color: white;
                font-weight: 500;
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 8px;
                transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            }

            .wellbeing-btn:hover {
                transform: translateY(-3px);
                box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
            }

            .wellbeing-btn i {
                font-size: 1.5rem;
            }

            .wellbeing-resources {
                display: flex;
                flex-direction: column;
                gap: 15px;
            }

            .resource-card {
                background: rgba(255, 255, 255, 0.1);
                border-radius: 16px;
                padding: 20px;
                border: 1px solid rgba(255, 255, 255, 0.1);
            }

            .resource-header {
                display: flex;
                align-items: center;
                margin-bottom: 10px;
            }

            .resource-header .resource-icon {
                font-size: 1.5rem;
                margin-right: 15px;
                color: rgba(100, 130, 200, 0.8);
            }

            .resource-header i {
                font-size: 1.5rem;
                margin-right: 15px;
                color: rgba(100, 130, 200, 0.8);
            }

            .resource-header h3 {
                font-weight: 500;
                font-size: 1.2rem;
                margin: 0;
                color: rgba(240, 240, 240, 0.9);
            }

            .resource-card p {
                color: rgba(200, 200, 200, 0.7);
                line-height: 1.6;
                margin: 0;
            }

            .profile-sections {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                gap: 20px;
                margin-bottom: 30px;
            }

            .profile-section {
                padding: 20px;
                border-radius: 16px;
                cursor: pointer;
                transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            }

            .profile-section:hover {
                transform: translateY(-5px);
                box-shadow: 0 15px 30px rgba(31, 38, 135, 0.15);
            }

            .section-header {
                display: flex;
                align-items: center;
                margin-bottom: 15px;
            }

            .section-header i {
                font-size: 2rem;
                margin-right: 15px;
            }

            .section-header h3 {
                margin: 0;
                color: rgba(240, 240, 240, 0.9);
            }

            .section-header p {
                margin: 0;
                color: rgba(200, 200, 200, 0.7);
                font-size: 0.9rem;
            }

            .profile-summary {
                text-align: center;
                padding: 30px 20px;
                background: linear-gradient(135deg, rgba(100, 130, 200, 0.2), rgba(100, 130, 200, 0.1));
                border-radius: 16px;
                border: 1px solid rgba(100, 130, 200, 0.4);
            }

            .profile-avatar {
                margin-bottom: 15px;
            }

            .profile-summary h3 {
                margin-bottom: 10px;
                color: rgba(240, 240, 240, 0.9);
            }

            .profile-summary p {
                color: rgba(200, 200, 200, 0.7);
                margin-bottom: 20px;
            }

            .profile-stats {
                display: flex;
                justify-content: center;
                gap: 20px;
                font-size: 0.9rem;
            }

            .stat {
                text-align: center;
            }

            .stat-number {
                font-weight: 600;
                color: rgba(100, 130, 200, 0.8);
                font-size: 1.2rem;
            }

            .stat-label {
                color: rgba(200, 200, 200, 0.7);
            }

            @media (max-width: 768px) {
                .nav-tab {
                    padding: 12px 8px;
                    font-size: 0.8rem;
                }
                
                .nav-tab span {
                    display: none;
                }
                
                .emoji-grid {
                    grid-template-columns: repeat(4, 1fr);
                }
                
                .wellbeing-actions {
                    flex-direction: column;
                }
                
                .profile-sections {
                    grid-template-columns: 1fr;
                }
                
                .profile-stats {
                    flex-direction: column;
                    gap: 10px;
                }
            }
        `;
        document.head.appendChild(styles);
    }
}

// Initialize the preview when the page loads
let previewApp;
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        previewApp = new MindMirrorPreview();
    }, 500);
});