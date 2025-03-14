import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

const MAX_FILE_SIZE_MB = 50; // Ignore files larger than 50MB

export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('exportSearchResults.toCSV', async () => {
        // Ask user for search type
        const searchType = await vscode.window.showQuickPick(["File Name", "File Content"], { placeHolder: "Search by file name or content?" });

        if (!searchType) {
            vscode.window.showErrorMessage("Search type selection is required.");
            return;
        }

        // Ask for search query
        const searchQuery = await vscode.window.showInputBox({ prompt: "Enter search term (e.g., *.ts, 'MyClass', '#myId')" });

        if (!searchQuery) {
            vscode.window.showErrorMessage("Search term is required.");
            return;
        }

        let matchingFiles: vscode.Uri[] = [];

        if (searchType === "File Name") {
            // Search by file name (e.g., *.ts, *.js)
            matchingFiles = await vscode.workspace.findFiles(`**/${searchQuery}`);
        } else if (searchType === "File Content") {
            // Search by file content
            const allFiles = await vscode.workspace.findFiles(`**/*.*`); // Search all files
            for (const file of allFiles) {
                const stat = await vscode.workspace.fs.stat(file);
                if (stat.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
                    continue; // Skip large files
                }

                try {
                    const stream = fs.createReadStream(file.fsPath, { encoding: 'utf-8' });
                    let found = false;

                    for await (const chunk of stream) {
                        if (chunk.includes(searchQuery)) {
                            matchingFiles.push(file);
                            found = true;
                            break;
                        }
                    }

                    stream.close();
                } catch (error) {
                    console.warn(`Skipping file (read error): ${file.fsPath}`);
                }
            }
        }

        if (matchingFiles.length === 0) {
            vscode.window.showInformationMessage("No matching files found.");
            return;
        }

        // Prepare CSV data
        let csvData = "File Path\n";
        matchingFiles.forEach(file => {
            csvData += `${file.fsPath}\n`;
        });

        // Ask user where to save
        const fileUri = await vscode.window.showSaveDialog({
            filters: { 'CSV Files': ['csv'] },
            defaultUri: vscode.Uri.file(path.join(os.homedir(), 'search-results.csv'))
        });

        if (!fileUri) return;

        // Write CSV file
        fs.writeFile(fileUri.fsPath, csvData, (err) => {
            if (err) {
                vscode.window.showErrorMessage("Failed to save the file.");
            } else {
                vscode.window.showInformationMessage(`Search results exported to ${fileUri.fsPath}`);
            }
        });
    });

    context.subscriptions.push(disposable);
}

export function deactivate() {}
