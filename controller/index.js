'use strict';
var util   = require('util');
var yeoman = require('yeoman-generator');
var path   = require('path');

var ControllerGenerator = module.exports = function ControllerGenerator(args, options, config) {
  // By calling `NamedBase` here, we get the argument to the subgenerator call
  // as `this.name`.
  // yeoman.generators.NamedBase.apply(this, arguments);
  yeoman.generators.Base.apply(this, arguments);

  console.log('You called the controller subgenerator with the argument ' + this.name + '.');
};

util.inherits(ControllerGenerator, yeoman.generators.NamedBase);

ControllerGenerator.prototype.askFor = function askFor() {
  var cb;

  // have Yeoman greet the user.

  var prompts = [];

  if (!this.options.mod_name) {
    prompts.push({
        name: 'mod_name',
        message: 'Enter sub app name',
        default: 'new_app'
      });
  } else {
    this.mod_name = this.options.mod_name;
  }


  if (!this.options.ct_name) {
    prompts.push({
        name: 'ct_name',
        message: 'Enter controller name',
        default: 'list'
      });
  } else {
    this.ct_name = this.options.ct_name;
  }

  if (!this.options.pluralize) {
    prompts.push({
        type: 'confirm',
        name: 'pluralize',
        message: 'Pluralize ?',
        default: false
      });
  } else {
    this.pluralize = this.options.pluralize;
  }


  if (prompts.length) {
    console.log(this.yeoman);

    cb = this.async();
    this.prompt(prompts, function (props) {
      this.mod_name = this.mod_name || props.mod_name;
      this.ct_name = this.ct_name || props.ct_name;
      this.pluralize = props.pluralize;

      cb();
    }.bind(this));
  }
}


ControllerGenerator.prototype.files = function files() {
  var mod_path  = path.join('assets/javascripts/backbone/apps/', this.mod_name);
  var mod_file  = this.mod_name + '.app.js';
  var ct_path   = path.join(mod_path, this.ct_name);
  var ct_name   = this.ct_name + '.ct.js';
  var view_name = this.ct_name + '.view.js';
  var tpl_path  = path.join(ct_path, 'tpl');

  this.entity_name = this.pluralize ? this.mod_name + 's' : this.mod_name;
  this.entity_container = this.pluralize ? 'collection' : 'model';


  this.mkdir('assets');
  this.mkdir('assets/javascripts');
  this.mkdir('assets/javascripts/backbone');
  this.mkdir('assets/javascripts/backbone/apps');
  this.mkdir(mod_path);
  this.mkdir(ct_path);
  this.mkdir(tpl_path);

  this.template('_ct.js', path.join(ct_path, ct_name));
  this.template('_view.js', path.join(ct_path, view_name));
  this.template('layout.hbs', path.join(tpl_path, 'layout.hbs'));
  this.template('_title.hbs', path.join(tpl_path, '_title.hbs'));
  this.template('_panel.hbs', path.join(tpl_path, '_panel.hbs'));

  if (this.options.pluralize) {
    this.template('_list.hbs', path.join(tpl_path, '_'+ this.mod_name +'s.hbs'));
    this.template('_list_item.hbs', path.join(tpl_path, '_'+ this.mod_name +'.hbs'));
  } else {
    this.template('_item.hbs', path.join(tpl_path, '_'+ this.mod_name +'.hbs'));
  }

};


ControllerGenerator.prototype.requireInModule = function requireInModule() {

  var mod_path  = path.join('assets/javascripts/backbone/apps/', this.mod_name, this.mod_name + '.app.js');
  var file = this.readFileAsString(mod_path);
  var ct_name = this.ct_name;
  var added_require = "require('./"+ct_name+"/"+ct_name+".ct.js');";


  if (file.indexOf(added_require) < 0) {
    this.write(mod_path, includeRequire(file, added_require));
  }
};


function includeRequire(file, added_require) {
  var rows = file.split('\n');
  var res = [];
  var included = false;
  rows.forEach(function(row) {

    res.push(row);

    if (row.indexOf('{') > 0 ) {
      if (!included) {
        res.push('  ' + added_require);
        included = true;
      }
    }

  });
  return res.join('\n');
}

