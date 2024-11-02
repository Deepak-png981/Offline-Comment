import * as vscode from 'vscode';
import { CommentCodeLensProvider } from './commentCodeLensProvider';

export let comments = new Map<string, { text: string; color: string }>();
let commentDecorationType: vscode.TextEditorDecorationType;
let contextGlobal: vscode.ExtensionContext;
let codeLensProvider: CommentCodeLensProvider;

const getCommentKey = (uri: vscode.Uri, line: number): string => {
  return `${uri.toString()}::${line}`;
};

export const initialize = (context: vscode.ExtensionContext, provider: CommentCodeLensProvider) => {
  contextGlobal = context;
  codeLensProvider = provider;

  commentDecorationType = vscode.window.createTextEditorDecorationType({
    after: {
      margin: '0 0 0 1em',
    },
    isWholeLine: true,
  });

  context.subscriptions.push(
    vscode.window.onDidChangeActiveTextEditor((editor) => {
      if (editor) {
        updateDecorations();
      }
    })
  );

  context.subscriptions.push(
    vscode.workspace.onDidOpenTextDocument((document) => {
      const editor = vscode.window.activeTextEditor;
      if (editor && editor.document === document) {
        updateDecorations();
      }
    })
  );

  context.subscriptions.push(
    vscode.workspace.onDidChangeTextDocument((event) => {
      const editor = vscode.window.activeTextEditor;
      if (!editor || event.document !== editor.document) return;

      const uri = editor.document.uri;

      for (const change of event.contentChanges) {
        const affectedLine = change.range.start.line;
        const lineCountChange =
          change.text.split('\n').length - 1 - (change.range.end.line - affectedLine);

        if (lineCountChange !== 0) {
          adjustCommentLineNumbers(affectedLine, lineCountChange, uri);
        }
      }
      updateDecorations();
    })
  );
};

const adjustCommentLineNumbers = (startLine: number, lineCountChange: number, uri: vscode.Uri) => {
  const updatedComments = new Map<string, { text: string; color: string }>();

  comments.forEach((comment, key) => {
    const [commentUriString, lineString] = key.split('::');
    const lineNum = parseInt(lineString, 10);

    if (commentUriString === uri.toString()) {
      if (lineNum >= startLine) {
        const newKey = getCommentKey(uri, lineNum + lineCountChange);
        updatedComments.set(newKey, comment);
      } else {
        updatedComments.set(key, comment);
      }
    } else {
      updatedComments.set(key, comment);
    }
  });

  comments = updatedComments;
};

export const handleInlineEdit = async (line: number, uri: vscode.Uri) => {
  const editor = vscode.window.activeTextEditor;
  if (!editor) return;

  const key = getCommentKey(uri, line);
  const currentComment = comments.get(key)?.text || '';

  const updatedComment = await vscode.window.showInputBox({
    prompt: 'Edit your comment',
    value: currentComment,
  });

  if (updatedComment !== undefined) {
    if (updatedComment.trim() === '') {
      comments.delete(key);
    } else {
      const color = comments.get(key)?.color ||  vscode.workspace.getConfiguration('offlineComment').get<string>('commentColor') || 'pink';
      comments.set(key, { text: updatedComment, color });
    }
    updateDecorations();
  }
};

export const addComment = async () => {
  const editor = vscode.window.activeTextEditor;
  if (!editor) return;

  const position = editor.selection.active;
  const line = position.line;
  const uri = editor.document.uri;

  const commentText = await vscode.window.showInputBox({ prompt: 'Enter your comment' });
  if (commentText && commentText.trim() !== '') {
    const color = vscode.workspace.getConfiguration('offlineComment').get<string>('commentColor') || 'pink';
    const key = getCommentKey(uri, line);
    comments.set(key, { text: commentText, color });
    updateDecorations();
  }
};

export const updateComment = async (lineNumber?: number) => {
  const editor = vscode.window.activeTextEditor;
  if (!editor) return;

  const line = lineNumber !== undefined ? lineNumber : editor.selection.active.line;
  const uri = editor.document.uri;
  const key = getCommentKey(uri, line);

  if (comments.has(key)) {
    await handleInlineEdit(line, uri);
  } else {
    vscode.window.showInformationMessage('No comment to update at this line.');
  }
};

export const removeComment = (lineNumber?: number) => {
  const editor = vscode.window.activeTextEditor;
  if (!editor) return;

  const line = lineNumber !== undefined ? lineNumber : editor.selection.active.line;
  const uri = editor.document.uri;
  const key = getCommentKey(uri, line);

  if (comments.has(key)) {
    comments.delete(key);
    updateDecorations();
    vscode.window.showInformationMessage('Comment removed.');
  } else {
    vscode.window.showInformationMessage('No comment to remove at this line.');
  }
};

const updateDecorations = () => {
  const editor = vscode.window.activeTextEditor;
  if (!editor) return;

  const uri = editor.document.uri;
  const decorationOptions: vscode.DecorationOptions[] = [];

  comments.forEach(({ text, color }, key) => {
    const [commentUriString, lineString] = key.split('::');
    if (commentUriString === uri.toString()) {
      const lineNum = parseInt(lineString, 10);
      const range = new vscode.Range(lineNum, 0, lineNum, 0);
      decorationOptions.push({
        range,
        renderOptions: {
          after: {
            contentText: `💬 ${text}`,
            color,
          },
        },
      });
    }
  });

  editor.setDecorations(commentDecorationType, decorationOptions);

  if (codeLensProvider) {
    codeLensProvider.refresh();
  }
};
