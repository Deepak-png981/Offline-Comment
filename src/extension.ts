import * as vscode from 'vscode';
import { addComment, updateComment, removeComment, initialize } from './commentManager';
import { CommentCodeLensProvider } from './commentCodeLensProvider';

export function activate(context: vscode.ExtensionContext) {
  
  const codeLensProvider = new CommentCodeLensProvider();

  
  initialize(context, codeLensProvider);

  
  context.subscriptions.push(
    vscode.commands.registerCommand('myCommentExtension.addComment', addComment),
    vscode.commands.registerCommand('myCommentExtension.updateComment', updateComment),
    vscode.commands.registerCommand('myCommentExtension.removeComment', removeComment)
  );

  
  context.subscriptions.push(
    vscode.languages.registerCodeLensProvider({ scheme: 'file', language: '*' }, codeLensProvider)
  );
}

export function deactivate() {}
