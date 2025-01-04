const { SPEC_OUTPUT_FILE_BEHAVIOR } = require('express-oas-generator');
const _ = require('lodash');
const author = require('../package.json').author ;
const swaggerConfig = {
    predefinedSpec: function (spec) {
        _.set(spec, 'info.title', 'Backend for producing Restful API (cours and students)');
        _.set(spec, 'info.description', `Produces a Restfull API for course and students Written by ${author} for academic purpose`);
        _.set(spec, 'info.summary', "Web Development");
        return spec;
      },
  alwaysServeDocs: false,
  tags: ['Students', 'Cours'],
  specOutputFileBehavior: SPEC_OUTPUT_FILE_BEHAVIOR.PRESERVE,
  specGroupByTag: true
};

module.exports = swaggerConfig;