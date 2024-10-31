import * as vscode from 'vscode';
import { comments } from './commentManager';

export class CommentCodeLensProvider implements vscode.CodeLensProvider {
  
  private readonly _onDidChangeCodeLenses: vscode.EventEmitter<void> = new vscode.EventEmitter<void>();
  public readonly onDidChangeCodeLenses: vscode.Event<void> = this._onDidChangeCodeLenses.event;

  public refresh(): void {
    this._onDidChangeCodeLenses.fire();
  }

  public provideCodeLenses(
    document: vscode.TextDocument,
    token: vscode.CancellationToken
  ): vscode.ProviderResult<vscode.CodeLens[]> {
    const codeLenses: vscode.CodeLens[] = [];

    for (const line of Array.from({ length: document.lineCount }, (_, i) => i)) {
      const lineKey = `${line}`;
      if (comments.has(lineKey)) {
        const range = new vscode.Range(line, 0, line, 0);

        const editCommand: vscode.Command = {
          title: 'Edit Comment',
          command: 'myCommentExtension.updateComment',
          arguments: [line],
        };

        const removeCommand: vscode.Command = {
          title: 'Remove Comment',
          command: 'myCommentExtension.removeComment',
          arguments: [line],
        };

        codeLenses.push(new vscode.CodeLens(range, editCommand));
        codeLenses.push(new vscode.CodeLens(range, removeCommand));
      }
    }

    return codeLenses;
  }
}
