const nodePlop = require("node-plop");
// load an instance of plop from a plopfile
const plop = nodePlop(`./path/to/plopfile.js`);
// get a generator by name
const basicAdd = plop.getGenerator("basic-add");

// run all the generator actions using the data specified
basicAdd.runActions({ name: "this is a test" }).then(function(results) {
  // do something after the actions have run
});
