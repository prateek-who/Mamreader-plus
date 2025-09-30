# Mamreader Plus

A userscript that enhances Goodreads pages by adding quick-access buttons to search authors, books, and series on [MyAnonaMouse (MAM)](https://www.myanonamouse.net/).

## Features

Mamreader Plus adds convenient search buttons directly on Goodreads pages:

- **Author pages** → Search Author and Search Books buttons
- **Book pages** → Search Book button  
- **Series pages** → Search Series button

Jump seamlessly from Goodreads to MAM with a single click!

## Installation

1. Install a userscript manager like [Tampermonkey](https://www.tampermonkey.net/) or [Violentmonkey](https://violentmonkey.github.io/)
2. Visit the [Mamreader Plus script page on GreasyFork](https://greasyfork.org/en/scripts/551053-mamreads-plus)
3. Click **Install** to add the script to your userscript manager

That's it! The buttons will now appear automatically when you browse Goodreads.

## Development

Mamreader Plus is built with **TypeScript** and **Vite**.

### Prerequisites

- Node.js (v14 or higher recommended)
- npm or yarn

### Setup

```bash
# Clone the repository
git clone https://github.com/prateek-who/Mamreader-plus.git
cd Mamreader-plus

# Install dependencies
npm install
```

### Build

```bash
npm run build
```

The compiled userscript will be generated at `dist/mamreads-plus.user.js`.

### Development Workflow

For live development with auto-reloading:

```bash
npm run dev
```

This command:
- Runs Vite in watch mode (recompiles on save)
- Serves the script at `http://localhost:5173/mamreads-plus.user.js`

To test your changes:
1. In Tampermonkey, create a new script or edit the existing one
2. Point the `@require` to `http://localhost:5173/mamreads-plus.user.js`
3. Save and reload Goodreads pages to see your changes instantly

### Project Structure

- `src/` - TypeScript source code
- `userscript.meta.js` - Userscript metadata template (version placeholder is auto-replaced during build)
- `dist/` - Compiled output (generated)

## Distribution

### Publishing Updates

1. Build the latest version: `npm run build`
2. Commit and push to your repository
3. Update the GreasyFork script listing to point to your hosted `.user.js` file

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License

## Support

If you encounter any issues or have suggestions, please [open an issue](https://github.com/prateek-who/Mamreader-plus/issues) on GitHub.
