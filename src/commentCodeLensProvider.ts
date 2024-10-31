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
    const uri = document.uri;

    comments.forEach((_, key) => {
      const [commentUriString, lineString] = key.split('::');
      if (commentUriString === uri.toString()) {
        const lineNum = parseInt(lineString, 10);
        const range = new vscode.Range(lineNum, 0, lineNum, 0);

        const editCommand: vscode.Command = {
          title: 'Edit Comment',
          command: 'myCommentExtension.updateComment',
          arguments: [lineNum],
        };

        const removeCommand: vscode.Command = {
          title: 'Remove Comment',
          command: 'myCommentExtension.removeComment',
          arguments: [lineNum],
        };

        codeLenses.push(new vscode.CodeLens(range, editCommand));
        codeLenses.push(new vscode.CodeLens(range, removeCommand));
      }
    });

    return codeLenses;
  }
}
