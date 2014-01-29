'use strict';
var util   = require('util');
var yeoman = require('yeoman-generator');
var path   = require('path');
var fs     = require('fs');


var SubappGenerator = module.exports = function SubappGenerator(args, options, config) {
  // By calling `NamedBase` here, we get the argument to the subgenerator call
  // as `this.name`.
  // yeoman.generators.NamedBase.apply(this, arguments);
  yeoman.generators.Base.apply(this, arguments);

};

util.inherits(SubappGenerator, yeoman.generators.Base);



SubappGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  // have Yeoman greet the user.
  console.log(this.yeoman);

  var prompts = [{
        name: 'name',
        message: 'Enter sub app name',
        default: 'new_app'
      }, {
        type: 'confirm',
        name: 'with_list_ctrl',
        message: 'Would you like to enable list controller?',
        default: true
      }];

  this.prompt(prompts, function (props) {
    this.name = props.name.toLowerCase();
    this.with_list_ctrl = props.with_list_ctrl;

    cb();
  }.bind(this));
};



SubappGenerator.prototype.files = function files() {
  var mod_path = path.join('assets/javascripts/backbone/apps/', this.name);
  var mod_file = this.name + '.app.js';
  this.mkdir('assets');
  this.mkdir('assets/javascripts');
  this.mkdir('assets/javascripts/backbone');
  this.mkdir('assets/javascripts/backbone/apps');
  this.mkdir(mod_path);

  this.template('_app.js', path.join(mod_path, mod_file));

};


SubappGenerator.prototype.requireInApp = function requireInApp() {
  var app_path      = path.join('assets/javascripts/backbone/apps/index.js');
  var name          = this.name;
  var added_require = "require('./"+name+"/"+name+".app.js');";
  var file = '';

  if (fs.existsSync(app_path)) {
    file = this.readFileAsString(app_path);
  }

  if (file.indexOf(added_require) < 0) {
    this.write(app_path, file+'\n'+added_require);
  }
};



SubappGenerator.prototype.withListCtrl = function withListCtrl() {
  if (this.with_list_ctrl) {
    // Here: we'are calling the nested generator (via 'invoke' with options)
    this.invoke("jabber:controller", { options: { ct_name: 'list', mod_name: this.name, pluralize: true } });
  }
}

