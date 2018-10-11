// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
const Promise = require("bluebird");

const nodePlop = require("node-plop");
// load an instance of plop from a plopfile
const plop = nodePlop(`./plopfile.js`);

const processPrompt = prompt => () => {
  return vscode.window
    .showInputBox({ prompt: prompt.message })
    .then(result => ({ [prompt.name]: result }));
};

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "plop" is now active!');
  // The command has been defined in the package.json file
  // Now provide the implementation of the command with  registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand(
    "extension.sayHello",
    function() {
      // The code you place here will be executed every time your command is executed

      // Display a message box to the user

      vscode.window
        .showQuickPick(plop.getGeneratorList().map(g => g.name))
        .then(selection => {
          const generator = plop.getGenerator(selection);
          const questions = generator.prompts.map(prompt =>
            processPrompt(prompt)
          );
          Promise.mapSeries(questions, question => {
            return question();
          }).then(result => {
            generator.runActions(Object.assign(...result)).then(result => {
              console.log(result);
              if (result.failures.length) {
                result.failures.map(failure =>
                  vscode.window.showErrorMessage(failure.error)
                );
              }
              if (result.changes.length) {
                vscode.window.showInformationMessage("Success!");
              }
            });
          });
        });
    }
  );

  context.subscriptions.push(disposable);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}
exports.deactivate = deactivate;
