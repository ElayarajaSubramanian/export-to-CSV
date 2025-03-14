# Export Search Results to Sheet - VS Code Extension

**Export file search results from VS Code to a CSV spreadsheet!**  
This extension helps you save file paths from your VS Code search into a `.csv` file for easy reference and sharing.

## Features
- **Exports search results** (file paths) to a CSV file.
- **Supports wildcard patterns** (e.g., `*.ts`, `*.js`, `*.html`).
- **User-friendly save option** – Choose where to store the file.
- **Fast and efficient** – Works within your current workspace.

## How to Use
1. Open **VS Code**.
2. Press **`Ctrl+Shift+P`** (or **`Cmd+Shift+P`** on macOS).
3. Search for **"Export Search Results to CSV"** and select it.
4. Enter the file search pattern (e.g., `*.ts` to find all TypeScript files).
5. Choose where to save the CSV file.
6. Done! The file paths are saved in the CSV.

## Installation
### From VS Code Marketplace:
Coming soon...

### Manual Installation:
1. Download the `.vsix` file.
2. Open a terminal and run:
   ```sh
   code --install-extension export-to-sheet-0.0.1.vsix
3. Use "Export Search Results to CSV" from the command palette.

### Example of CSV Output:
File Path
C:/Users/YourName/project/src/index.ts
C:/Users/YourName/project/src/utils/helpers.ts
C:/Users/YourName/project/src/components/Button.tsx

### Configuration
This extension currently works with file name patterns but can be enhanced to include:

### Exporting matched content (coming soon).
Excel (.xlsx) support instead of CSV (planned).

Found a bug? Have a feature request? Open an issue.
Want to contribute? PRs are welcome! 

#### MIT License © 2025 Elayaraja Subramanian

