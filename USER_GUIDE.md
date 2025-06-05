# NTH GitHub Trending - User Guide

This guide will help you get the most out of the NTH GitHub Trending application, which lets you discover trending repositories on GitHub.

## Table of Contents

1. [Getting Started](#getting-started)
2. [Basic Usage](#basic-usage)
3. [Filtering Repositories](#filtering-repositories)
4. [Adding a GitHub Token](#adding-a-github-token)
5. [Theme Toggle](#theme-toggle)
6. [View Modes](#view-modes)
7. [Tips and Tricks](#tips-and-tricks)
8. [Troubleshooting](#troubleshooting)

## Getting Started

To access NTH GitHub Trending, visit the application URL in your web browser. The app should load automatically and display the trending repositories from the past week.

## Basic Usage

When you open the application, you'll see a list of trending repositories from GitHub. Each repository card displays:

- Repository name and owner
- Description
- Stars count
- Forks count
- Programming language
- Created date
- Link to the GitHub repository

Scroll down to view more repositories. The application uses infinite scrolling, so more repositories will load as you reach the bottom of the page.

## Filtering Repositories

### Time Period Selection

You can filter repositories by different time periods:

1. Look for the time period dropdown in the top filter bar
2. Click on it to open the options
3. Select from:
   - Last day
   - Last week (default)
   - Last month
   - Last year

The repository list will immediately update to show trending repositories from the selected time period.

### Language Filtering

To filter repositories by programming language:

1. Click on the language dropdown in the top filter bar
2. Select a programming language from the list
   - Or select "All Languages" to remove the language filter

The repository list will update to show repositories in the selected programming language.

## Adding a GitHub Token

GitHub's API has rate limits that may restrict your usage. To avoid these limits, you can add your personal GitHub token:

1. Click on the "Add Token" button in the top right corner
2. In the modal that appears, enter your GitHub personal access token
   - If you don't have one, click the link to create a token on GitHub
3. Click "Save"

Your token will be securely stored in your browser's local storage and used for future API requests.

### Why Add a Token?

- Increased API rate limit (from 60 to 5,000 requests per hour)
- Access to private repositories (if your token has appropriate permissions)
- More reliable experience without hitting rate limits

## Theme Toggle

You can switch between light and dark themes:

1. Click on the sun/moon icon in the top right corner
2. The application will immediately switch themes
3. Your preference is remembered for future visits

## View Modes

The application offers different ways to view repositories:

### Card View

- Shows repositories in a grid layout
- Provides a visual overview of multiple repositories at once
- Great for quickly scanning repository information

### List View

- Shows repositories in a vertical list
- Displays more detailed information for each repository
- Better for reading repository descriptions

To switch between views:

1. Click on the grid/list toggle button in the top right corner
2. The view will change immediately

## Tips and Tricks

- **Bookmark Your Filters**: After setting up your preferred filters, bookmark the page to quickly access your customized view in the future.
- **Check Daily**: Popular repositories can change quickly. Check back daily to discover new trending projects.
- **Explore Different Languages**: Use the language filter to discover new projects in languages you're interested in learning.
- **Sort Options**: Use the sort options to organize repositories by different criteria.

## Troubleshooting

### API Rate Limit Exceeded

If you see a message about exceeding the API rate limit:

1. Add a GitHub token as described in the "Adding a GitHub Token" section
2. Wait until your rate limit resets (usually after an hour)
3. Try using the application during off-peak hours

### Repositories Not Loading

If repositories aren't loading:

1. Check your internet connection
2. Verify that you haven't exceeded GitHub's API rate limits
3. Try refreshing the page
4. Clear your browser cache and try again

### Other Issues

For other issues or to report a bug, please:

1. Check if the issue is already reported in our GitHub issues
2. If not, create a new issue with detailed steps to reproduce the problem

---

Thank you for using NTH GitHub Trending! We hope this guide helps you discover amazing projects on GitHub.
