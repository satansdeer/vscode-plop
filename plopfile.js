module.exports = function(plop) {
  // create your generators here
  plop.setGenerator("foo", {
    description: "this is a skeleton plopfile",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "controller name please",
        validate: function(value) {
          if (/Maksim/.test(value)) {
            return true;
          }
          return "name is required";
        }
      },
      {
        type: "input",
        name: "surname",
        message: "now controller surname"
      }
    ], // array of inquirer prompts
    actions: [] // array of actions
  });
  plop.setGenerator("bar", {
    description: "this is a skeleton plopfile",
    prompts: [
      {
        type: "input",
        name: "input_1",
        message: "Input number 1"
      },
      {
        type: "input",
        name: "input_2",
        message: "Input number 2"
      },
      {
        type: "input",
        name: "input_3",
        message: "Input number 3"
      },
      {
        type: "input",
        name: "input_4",
        message: "Input number 4"
      },
      {
        type: "input",
        name: "input_5",
        message: "Input number 5"
      }
    ], // array of inquirer prompts
    actions: [
      {
        type: "add",
        path: "src/{{input_1}}.js",
        templateFile: "plop-templates/inputs.hbs"
      }
    ] // array of actions
  });
  plop.setGenerator("bazz", {
    description: "this is a skeleton plopfile",
    prompts: [], // array of inquirer prompts
    actions: [] // array of actions
  });
};
