// StandardNotes Component Manager Integration
class StandardNotesPlugin {
    constructor() {
        this.reminders = [];
        this.componentManager = null;
        this.note = null;
        this.initialize();
    }

    initialize() {
        // Initialize the StandardNotes component manager
        this.setupComponentManager();
        
        // Load reminders from storage
        this.loadReminders();
        
        // Setup event listeners
        this.setupEventListeners();
        
        // Start checking for due reminders
        this.startReminderChecker();
        
        // Render initial state
        this.renderReminders();
    }

    setupComponentManager() {
        // StandardNotes component manager integration
        if (window.ComponentManager) {
            this.componentManager = new ComponentManager({
                coalescedSaving: true,
                coalescedSavingDelay: 400
            }, (component) => {
                // Component manager ready callback
                this.onComponentManagerReady(component);
            });
        }
    }

    onComponentManagerReady(component) {
        // Get the current note
        this.note = component;
        
        // Load reminders specific to this note from the note's content
        if (this.note && this.note.content) {
            try {
                const content = JSON.parse(this.note.content);
                if (content.reminders) {
                    this.reminders = content.reminders;
                    this.renderReminders();
                }
            } catch (e) {
                // Content is not JSON or doesn't have reminders
                console.log('No existing reminders found in note');
            }
        }
    }

    saveRemindersToNote() {
        // Save reminders to the note's content
        if (this.componentManager && this.note) {
            const content = {
                reminders: this.reminders,
                lastUpdated: new Date().toISOString()
            };
            
            this.componentManager.saveItem({
                ...this.note,
                content: JSON.stringify(content)
            });
        } else {
            // Fallback to localStorage if component manager is not available
            this.saveToLocalStorage();
        }
    }

    saveToLocalStorage() {
        try {
            localStorage.setItem('standardnotes-reminders', JSON.stringify(this.reminders));
        } catch (e) {
            console.error('Failed to save reminders to localStorage:', e);
        }
    }

    loadReminders() {
        // Try to load from localStorage as fallback
        try {
            const stored = localStorage.getItem('standardnotes-reminders');
            if (stored) {
                this.reminders = JSON.parse(stored);
            }
        } catch (e) {
            console.error('Failed to load reminders from localStorage:', e);
            this.reminders = [];
        }
    }

    setupEventListeners() {
        const form = document.getElementById('reminderForm');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.addReminder();
            });
        }
    }

    addReminder() {
        const dateInput = document.getElementById('reminderDate');
        const noteInput = document.getElementById('reminderNote');
        
        if (!dateInput.value) {
            alert('Please select a date and time for the reminder');
            return;
        }

        const reminder = {
            id: Date.now().toString(),
            datetime: dateInput.value,
            note: noteInput.value,
            createdAt: new Date().toISOString(),
            notified: false
        };

        this.reminders.push(reminder);
        this.saveRemindersToNote();
        this.renderReminders();
        
        // Reset form
        dateInput.value = '';
        noteInput.value = '';
    }

    deleteReminder(id) {
        this.reminders = this.reminders.filter(r => r.id !== id);
        this.saveRemindersToNote();
        this.renderReminders();
    }

    renderReminders() {
        const container = document.getElementById('remindersList');
        if (!container) return;

        if (this.reminders.length === 0) {
            container.innerHTML = '<p class="empty-state">No reminders set. Add one above!</p>';
            return;
        }

        // Sort reminders by datetime
        const sortedReminders = [...this.reminders].sort((a, b) => {
            return new Date(a.datetime) - new Date(b.datetime);
        });

        container.innerHTML = sortedReminders.map(reminder => {
            const reminderDate = new Date(reminder.datetime);
            const now = new Date();
            const isPastDue = reminderDate < now;
            const isUpcoming = !isPastDue && (reminderDate - now) < 24 * 60 * 60 * 1000; // Within 24 hours

            let statusClass = '';
            let statusText = '';
            
            if (isPastDue) {
                statusClass = 'past-due';
                statusText = '<span class="reminder-status overdue">⚠️ Overdue</span>';
            } else if (isUpcoming) {
                statusClass = 'upcoming';
                statusText = '<span class="reminder-status due-soon">⏰ Due soon</span>';
            } else {
                statusText = '<span class="reminder-status">📅 Scheduled</span>';
            }

            const formattedDate = this.formatDateTime(reminderDate);

            return `
                <div class="reminder-item ${statusClass}">
                    <div class="reminder-content">
                        <div class="reminder-datetime">${formattedDate}</div>
                        ${reminder.note ? `<div class="reminder-note">${this.escapeHtml(reminder.note)}</div>` : ''}
                        ${statusText}
                    </div>
                    <div class="reminder-actions">
                        <button class="btn btn-danger" onclick="plugin.deleteReminder('${reminder.id}')">Delete</button>
                    </div>
                </div>
            `;
        }).join('');
    }

    formatDateTime(date) {
        const options = {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };
        return date.toLocaleDateString('en-US', options);
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    startReminderChecker() {
        // Check for due reminders every minute
        setInterval(() => {
            this.checkDueReminders();
        }, 60000); // Check every minute
        
        // Also check immediately
        this.checkDueReminders();
    }

    checkDueReminders() {
        const now = new Date();
        let hasChanges = false;

        this.reminders.forEach(reminder => {
            const reminderDate = new Date(reminder.datetime);
            
            // If reminder is due and hasn't been notified yet
            if (reminderDate <= now && !reminder.notified) {
                this.notifyReminder(reminder);
                reminder.notified = true;
                hasChanges = true;
            }
        });

        if (hasChanges) {
            this.saveRemindersToNote();
            this.renderReminders();
        }
    }

    notifyReminder(reminder) {
        // Create a notification
        const message = reminder.note 
            ? `Reminder: ${reminder.note}` 
            : 'You have a reminder due!';
        
        // Try to use browser notifications if available
        if ('Notification' in window && Notification.permission === 'granted') {
            new Notification('StandardNotes Reminder', {
                body: message,
                icon: '🔔'
            });
        } else if ('Notification' in window && Notification.permission !== 'denied') {
            Notification.requestPermission().then(permission => {
                if (permission === 'granted') {
                    new Notification('StandardNotes Reminder', {
                        body: message,
                        icon: '🔔'
                    });
                }
            });
        } else {
            // Fallback to alert
            alert(message);
        }
    }
}

// Initialize the plugin
let plugin;
document.addEventListener('DOMContentLoaded', () => {
    plugin = new StandardNotesPlugin();
    
    // Request notification permission on load
    if ('Notification' in window && Notification.permission === 'default') {
        Notification.requestPermission();
    }
});
