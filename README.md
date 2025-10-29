# StandardNotes Reminder Plugin

A StandardNotes plugin that allows you to add reminders to your notes. Never forget important tasks or deadlines with customizable date and time reminders.

## Features

- 📅 Set reminders with specific date and time
- 📝 Add optional notes to your reminders
- ⚠️ Visual indicators for overdue and upcoming reminders
- 🔔 Browser notifications when reminders are due
- 💾 Automatic saving to StandardNotes or localStorage
- 📱 Responsive design for mobile and desktop

## Installation

### Option 1: Direct Installation
1. Host the plugin files on a web server or use GitHub Pages
2. In StandardNotes, go to Extensions
3. Import the plugin using the URL to your hosted `index.html`

### Option 2: Local Development
1. Clone this repository
2. Open `index.html` in a web browser to test locally
3. For StandardNotes integration, you'll need to host the files

## Usage

1. **Add a Reminder**:
   - Select a date and time for your reminder
   - Optionally add a note describing what the reminder is for
   - Click "Add Reminder" to save it

2. **View Reminders**:
   - All active reminders are displayed below the form
   - Overdue reminders are highlighted in red
   - Reminders due within 24 hours are highlighted in yellow
   - Future reminders are displayed with a standard appearance

3. **Delete a Reminder**:
   - Click the "Delete" button next to any reminder to remove it

4. **Notifications**:
   - When a reminder is due, you'll receive a browser notification
   - Grant notification permissions when prompted for the best experience

## Technical Details

### Files Structure
```
├── index.html      # Main plugin interface
├── main.js         # JavaScript functionality
├── styles.css      # Plugin styling
├── package.json    # Package metadata
└── README.md       # Documentation
```

### StandardNotes Integration

The plugin integrates with StandardNotes using the Component Manager API. It can:
- Save reminder data to the current note's content
- Fallback to localStorage when not in StandardNotes
- Work as a standalone web application

### Browser Compatibility

- Modern browsers with ES6 support
- Chrome, Firefox, Safari, Edge (latest versions)
- Notification API support for reminders

## Development

### Testing Locally
```bash
# Simply open index.html in a browser
open index.html
```

### No Build Required
This plugin uses vanilla JavaScript, HTML, and CSS. No build process is required.

## License

MIT License - see LICENSE file for details

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
