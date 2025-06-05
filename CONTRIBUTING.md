# Contributing to NTH GitHub Trending

First off, thank you for considering contributing to NTH GitHub Trending! It's people like you that make it a great tool for everyone. This document provides guidelines and steps for contributing.

## Code of Conduct

By participating in this project, you are expected to uphold our Code of Conduct, which is to be respectful and constructive in all interactions.

## How Can I Contribute?

### Reporting Bugs

This section guides you through submitting a bug report. Following these guidelines helps maintainers understand your report, reproduce the issue, and find related reports.

**Before Submitting a Bug Report**

- Check the documentation for a list of common questions and problems.
- Ensure the bug is not already reported by searching on GitHub under [Issues](https://github.com/yourusername/nth-github-trending/issues).
- If you're unable to find an open issue addressing the problem, open a new one.

**How Do I Submit A Good Bug Report?**

Bugs are tracked as [GitHub issues](https://github.com/yourusername/nth-github-trending/issues). Create an issue and provide the following information:

- **Use a clear and descriptive title** for the issue to identify the problem.
- **Describe the exact steps which reproduce the problem** in as much detail as possible.
- **Provide specific examples to demonstrate the steps**. This could include links to files or GitHub projects, or copy/pasteable code snippets.
- **Describe the behavior you observed after following the steps** and point out what exactly is the problem with that behavior.
- **Explain which behavior you expected to see instead and why.**
- **Include screenshots or animated GIFs** which clearly demonstrate the problem.
- **If the problem wasn't triggered by a specific action**, describe what you were doing before the problem happened.

### Suggesting Enhancements

This section guides you through submitting an enhancement suggestion, including completely new features and minor improvements to existing functionality.

**Before Submitting an Enhancement Suggestion**

- Check the documentation to ensure the enhancement doesn't already exist.
- Perform a search to see if the enhancement has already been suggested. If it has, add a comment to the existing issue instead of opening a new one.

**How Do I Submit A Good Enhancement Suggestion?**

Enhancement suggestions are tracked as [GitHub issues](https://github.com/yourusername/nth-github-trending/issues). Create an issue and provide the following information:

- **Use a clear and descriptive title** for the issue to identify the suggestion.
- **Provide a step-by-step description of the suggested enhancement** in as much detail as possible.
- **Provide specific examples to demonstrate the steps** or point to similar features in other apps.
- **Describe the current behavior** and **explain which behavior you expected to see instead** and why.
- **Include screenshots or animated GIFs** which help you demonstrate the steps or point out the part which the suggestion is related to.
- **Explain why this enhancement would be useful** to most users.
- **List some other applications where this enhancement exists**, if applicable.

### Pull Requests

The process described here has several goals:

- Maintain code quality
- Fix problems that are important to users
- Enable a sustainable system for maintainers to review contributions

Please follow these steps for your contribution:

1. Create your own fork of the code
2. Do the changes in your fork
3. If you like the change and think the project could use it:
   - Be sure you have followed the code style for the project.
   - Make sure your code is well-tested.
   - Send a pull request.

## Styleguides

### Git Commit Messages

- Use the present tense ("Add feature" not "Added feature")
- Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
- Limit the first line to 72 characters or less
- Reference issues and pull requests liberally after the first line
- Consider starting the commit message with an applicable emoji:
  - 🎨 `:art:` when improving the format/structure of the code
  - 🐎 `:racehorse:` when improving performance
  - 🚱 `:non-potable_water:` when plugging memory leaks
  - 📝 `:memo:` when writing docs
  - 🐛 `:bug:` when fixing a bug
  - 🔥 `:fire:` when removing code or files
  - 💚 `:green_heart:` when fixing the CI build
  - ✅ `:white_check_mark:` when adding tests
  - 🔒 `:lock:` when dealing with security

### JavaScript/TypeScript Styleguide

All JavaScript/TypeScript must adhere to [Prettier](https://prettier.io/) formatting and the ESLint configuration defined in the project.

- Use 2 spaces for indentation
- Use single quotes for strings
- Use ES6+ features
- Prefer arrow functions
- Use meaningful variable, function, and class names
- Add comments for complex logic
- Write descriptive documentation for components and functions

### CSS/Tailwind Styleguide

- Follow the class naming conventions specified by Tailwind
- Group related classes together
- Use utility classes provided by Tailwind when possible
- For custom CSS (if needed), follow BEM naming convention

## Project Structure

When contributing, please maintain the project structure:

```
src/
├── api/                # API integration
├── components/         # Reusable React components
│   └── ui/             # UI components
├── constants/          # Application constants
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
├── routes/             # Application routes
└── utils/              # Helper functions
```

## Development Environment

### Prerequisites

- Node.js (v18 or higher)
- npm, yarn, or bun

### Setup

1. Fork the repository
2. Clone your fork
3. Install dependencies: `npm install`
4. Start the development server: `npm run dev`

### Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run format` - Run Prettier
- `npm run check` - Run both ESLint and Prettier and fix issues

## Additional Notes

### Issue and Pull Request Labels

This section lists the labels we use to help us track and manage issues and pull requests.

- `bug` - Issues related to bugs in the code
- `documentation` - Issues related to documentation
- `enhancement` - Issues related to feature requests
- `good first issue` - Good for newcomers
- `help wanted` - Extra attention is needed
- `question` - Further information is requested

## Thank You!

Thank you for contributing to NTH GitHub Trending!
