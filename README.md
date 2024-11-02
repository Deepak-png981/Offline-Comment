# Offline Comment
![Offline Comment](./Images/image.png)

## Introduction

The **Offline Comment** extension allows developers to add, edit, and remove inline comments directly within the code editor. These comments appear alongside your code without modifying the actual source files. It's a handy tool for annotating code during development, code reviews, or when sharing code snippets.

## Why does it exist

Developers often add temporary comments directly into code files during development or code reviews. However, these comments can pollute the git status, leading to accidental commits and pushes of these comments into the repository. This clutters the version history and can also introduce unintended changes into pull requests.

This extension resolves this issue by allowing you to add inline comments that aren't part of the actual source files. By keeping comments separate from the codebase, it prevents accidental inclusion of comments in commits, ensuring a cleaner git status and a more streamlined workflow.

## Features

- **Add Inline Comments**: Insert comments on any line of your code.
- **Edit Comments**: Change existing comments.
- **Remove Comments**: Delete comments that are no longer needed.
- **File-Specific Comments**: Comments are associated with specific files and line numbers.
- **Colorful Annotations**: Each comment displays with an assigned color.
- **CodeLens Integration**: Provides convenient access to edit or remove comments directly from the editor.
- **Keyboard Shortcuts**: Quickly add, edit, or remove comments using keyboard shortcuts for efficient workflows.

## Usage

### Keyboard Shortcuts

| Action           | Windows/Linux Shortcut | macOS Shortcut |
|------------------|------------------------|----------------|
| Add Comment      | `Ctrl+O`               | `Cmd+O`       |
| Update Comment   | `Ctrl+U`               | `Cmd+U`       |
| Remove Comment   | `Ctrl+R`               | `Cmd+R`       |

These keyboard shortcuts make it easy to manage comments directly without right-clicking, streamlining your workflow.

### Adding a Comment
1. Open a file in VS Code where you want to add comments.
2. Place the cursor on the line where you wish to add a comment.
3. Right-click on the line and click `Add Comment`.
4. Enter your comment in the input box that appears and press Enter.

Alternatively, use the keyboard shortcut `Ctrl+O` (or `Cmd+O` on macOS) to quickly add a comment on the current line.

### Editing a Comment

#### Using CodeLens
- Above the line with a comment, click the **Edit Comment** action.
- Change your comment in the input box and press Enter.

#### Using Command Palette
- Place the cursor on the line with the comment.
- Open the Command Palette and select **Update Comment**.
- Edit your comment and press Enter.

Alternatively, use the keyboard shortcut `Ctrl+U` (or `Cmd+U` on macOS) to edit the comment on the current line.

### Removing a Comment

#### Using CodeLens
- Click on the **Remove Comment** action above the commented line.
- The system removes the comment promptly.

#### Using Command Palette
- Place the cursor on the line with the comment.
- Open the Command Palette and select **Remove Comment**.
- The system deletes the comment from that line.

Alternatively, use the keyboard shortcut `Ctrl+R` (or `Cmd+R` on macOS) to remove the comment on the current line.

### Commands
The extension provides the following commands accessible via the Command Palette:

- **Add Comment**: Adds a comment to the current line.
- **Update Comment**: Edits the comment on the current line.
- **Remove Comment**: Removes the comment from the current line.


## Contributing

Contributions are welcome. Please feel free to submit issues or pull requests for enhancements or fixes.
