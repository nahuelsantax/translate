const cucumber = require('cucumber');

cucumber.setWorldConstructor(function() {
  
});

cucumber.defineSupportCode(function({ Given, When, Then }) {

  require('../step_definitions/traductor.steps.js');

});

module.exports = cucumber;
