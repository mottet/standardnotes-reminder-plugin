# Deployment Guide

## GitHub Pages Setup

### Automatic Deployment

The repository is configured with GitHub Actions to automatically deploy to GitHub Pages when changes are pushed to the `main` branch.

**Workflow File:** `.github/workflows/deploy-pages.yml`

### Enabling GitHub Pages

1. Go to your repository **Settings**
2. Navigate to **Pages** (in the left sidebar)
3. Under **Source**, select **GitHub Actions**
4. Save the settings

Once enabled, every push to `main` will trigger the deployment workflow.

### Plugin URLs

After deployment, the plugin will be accessible at:

- **Plugin Interface:** `https://mottet.github.io/standardnotes-reminder-plugin/index.html`
- **Plugin Manifest:** `https://mottet.github.io/standardnotes-reminder-plugin/plugin.json`
- **Plugin Icon:** `https://mottet.github.io/standardnotes-reminder-plugin/icon.svg`

## Installing in StandardNotes

### Method 1: Using Plugin Manifest (Recommended)

1. Open StandardNotes
2. Go to **Extensions** (or **Account** → **Extensions**)
3. Scroll to **Import Extension**
4. Paste this URL:
   ```
   https://mottet.github.io/standardnotes-reminder-plugin/plugin.json
   ```
5. Click **Install**

### Method 2: Direct URL

1. Open StandardNotes
2. Go to **Extensions**
3. Click **Import Extension**
4. Paste this URL:
   ```
   https://mottet.github.io/standardnotes-reminder-plugin/index.html
   ```
5. Click **Install**

## Plugin Manifest Structure

The `plugin.json` file contains all the metadata StandardNotes needs to install and display your plugin:

```json
{
  "identifier": "org.standardnotes.reminder-plugin",
  "name": "Reminder Plugin",
  "content_type": "SN|Component",
  "area": "editor-stack",
  "version": "1.0.0",
  "description": "Add time-based reminders to your notes",
  "url": "https://mottet.github.io/standardnotes-reminder-plugin/index.html",
  "latest_url": "https://mottet.github.io/standardnotes-reminder-plugin/plugin.json",
  ...
}
```

### Key Fields:

- **identifier**: Unique ID for the plugin
- **name**: Display name in StandardNotes
- **url**: Main plugin interface URL
- **latest_url**: URL to check for updates
- **supported_types**: What note types the plugin works with
- **actions**: Actions available in StandardNotes

## Workflow Overview

```
┌─────────────────┐
│   Push to main  │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ GitHub Actions  │
│   Triggered     │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   Checkout      │
│   Repository    │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Setup Pages    │
│  Configuration  │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Upload Files   │
│   as Artifact   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Deploy to      │
│  GitHub Pages   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   Plugin Live   │
│  at GitHub.io   │
└─────────────────┘
```

## Updating the Plugin

To release a new version:

1. Make your changes to the plugin files
2. Update the version in `plugin.json`
3. Commit and push to `main`
4. GitHub Actions will automatically deploy
5. Users will get the update through StandardNotes

## Troubleshooting

### Workflow Not Running

- Check that GitHub Pages is enabled in repository settings
- Verify the workflow file is in `.github/workflows/`
- Check Actions tab for error messages

### Plugin Not Loading in StandardNotes

- Verify the URLs are accessible in a browser
- Check browser console for error messages
- Ensure CORS headers are properly set (GitHub Pages handles this automatically)

### Icon Not Showing

- Verify `icon.svg` is accessible at the correct URL
- Check the `thumbnail_url` in `plugin.json`
- Try using a PNG format if SVG doesn't work
