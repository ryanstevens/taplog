var prependChar = '#';
var util = require('util');

function convertToLines(str) {
  return str.split('\n').map(function(newStr) {
    return prependChar + newStr;
  });
}

var newConsole = {
  log : function log() {
    convertToLines(util.format.apply(this, arguments)).forEach(function(line) {
      console.log(line);
    });
  },
  error : function error() {
    convertToLines(util.format.apply(this, arguments)).forEach(function(line) {
      console.error(line);
    });
  }
};

module.exports = newConsole;