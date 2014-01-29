'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


var JabberGenerator = module.exports = function JabberGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(JabberGenerator, yeoman.generators.Base);

JabberGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  // have Yeoman greet the user.
  console.log(this.yeoman);

  var prompts = [{
    type: 'confirm',
    name: 'someOption',
    message: 'Would you like to enable this option?',
    default: true
  }];

  this.prompt(prompts, function (props) {
    this.someOption = props.someOption;

    cb();
  }.bind(this));
};

JabberGenerator.prototype.app = function app() {
  this.mkdir('assets');
  this.mkdir('assets/javascripts');
  this.mkdir('assets/javascripts/backbone');
  this.mkdir('assets/javascripts/config');
  this.mkdir('assets/javascripts/lib');
  this.mkdir('assets/stylesheets');
  this.mkdir('assets/stylesheets/apps');
  this.mkdir('assets/stylesheets/utils');
  this.mkdir('assets/stylesheets/vendor');
  this.mkdir('config');
  this.mkdir('public');
  this.mkdir('public/bundle');
  this.mkdir('public/fonts');
  this.mkdir('public/images');
  this.mkdir('server');
  this.mkdir('server/controllers');
  this.mkdir('server/lib');
  this.mkdir('server/models');
  this.mkdir('server/validators');
  this.mkdir('views');

  this.copy('_package.json', 'package.json');
  this.copy('_bower.json', 'bower.json');
};

JabberGenerator.prototype.projectfiles = function projectfiles() {
  this.copy('editorconfig', '.editorconfig');
  this.copy('jshintrc', '.jshintrc');
  this.copy('bowerrc', '.bowerrc');
};
