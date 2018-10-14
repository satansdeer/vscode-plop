const vscode = require("vscode");
const Promise = require("bluebird");
const nodePlop = require("node-plop");
const plop = nodePlop(`./plopfile.js`);

const processPrompt = prompt => () => {
  const processedPrompt = new Promise(resolve => {
    const keepPrompting = () => {
      vscode.window.showInputBox({ prompt: prompt.message }).then(result => {
        if (!prompt.validate) {
          return resolve(result);
        }
        const validated = prompt.validate(result);
        if (validated === true) {
          return resolve(result);
        }
        vscode.window.showWarningMessage(validated);
        keepPrompting();
      });
    };
    keepPrompting();
  });
  return processedPrompt.then(result => ({ [prompt.name]: result }));
};

function activate(context) {
  let disposable = vscode.commands.registerCommand(
    "extension.Plop",
    function() {
      vscode.window
        .showQuickPick(
          plop
            .getGeneratorList()
            .map(g => ({ label: g.name, description: g.description })),
          {
            placeHolder: "Select generator:"
          }
        )
        .then(selection => {
          const generator = plop.getGenerator(selection.label);
          const questions = generator.prompts.map(prompt =>
            processPrompt(prompt)
          );
          Promise.mapSeries(questions, question => {
            return question();
          }).then(result => {
            generator.runActions(Object.assign(...result)).then(result => {
              if (result.failures.length) {
                result.failures.map(failure =>
                  vscode.window.showErrorMessage(failure.error)
                );
              }
              if (result.changes.length) {
                vscode.window.showInformationMessage(
                  "Your file was generated successfully!"
                );
              }
            });
          });
        });
    }
  );

  context.subscriptions.push(disposable);
}
exports.activate = activate;

function deactivate() {}
exports.deactivate = deactivate;
