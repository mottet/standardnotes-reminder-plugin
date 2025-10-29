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

### Install in StandardNotes (Recommended)

1. Open StandardNotes and go to **Extensions** (or **Account** → **Extensions**)
2. Scroll to **Import Extension**
3. Paste this URL:
   ```
   https://mottet.github.io/standardnotes-reminder-plugin/plugin.json
   ```
4. Click **Install**
5. The reminder plugin will now be available in your editor

### Alternative: Direct URL Installation

1. In StandardNotes, go to **Extensions**
2. Click **Import Extension**
3. Use this direct URL:
   ```
   https://mottet.github.io/standardnotes-reminder-plugin/index.html
   ```

### Local Development

1. Clone this repository
   ```bash
   git clone https://github.com/mottet/standardnotes-reminder-plugin.git
   cd standardnotes-reminder-plugin
   ```
2. Open `index.html` in a web browser to test locally
3. For StandardNotes integration, you'll need to host the files or use the GitHub Pages deployment

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
├── .github/
│   └── workflows/
│       └── deploy-pages.yml  # GitHub Pages deployment workflow
├── index.html      # Main plugin interface
├── main.js         # JavaScript functionality
├── styles.css      # Plugin styling
├── package.json    # Package metadata
├── plugin.json     # StandardNotes plugin manifest
├── icon.svg        # Plugin icon
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

### GitHub Pages Deployment

This plugin is automatically deployed to GitHub Pages when changes are pushed to the `main` branch. The workflow:
- Builds and deploys all files to GitHub Pages
- Makes the plugin accessible at: `https://mottet.github.io/standardnotes-reminder-plugin/`
- Updates the plugin manifest at: `https://mottet.github.io/standardnotes-reminder-plugin/plugin.json`

To enable GitHub Pages for your fork:
1. Go to repository **Settings** → **Pages**
2. Under **Source**, select **GitHub Actions**
3. Push to the `main` branch to trigger deployment

### Testing Locally
```bash
# Simply open index.html in a browser
open index.html

# Or use a local server
python3 -m http.server 8080
# Then open http://localhost:8080
```

### No Build Required
This plugin uses vanilla JavaScript, HTML, and CSS. No build process is required.

## License

MIT License - see LICENSE file for details

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
