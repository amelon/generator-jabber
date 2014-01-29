'use strict';
var util   = require('util');
var yeoman = require('yeoman-generator');
var path   = require('path');
var fs     = require('fs');

var TstModGenerator = module.exports = function TstModGenerator(args, options, config) {
  // By calling `NamedBase` here, we get the argument to the subgenerator call
  // as `this.name`.
  // yeoman.generators.NamedBase.apply(this, arguments);
  yeoman.generators.Base.apply(this, arguments);
  console.log('args', args, 'options', options, 'config', config);

  this.argument('name', {
    desc: 'sub app name'
  , required: false
  , optional: true
  , type: 'String'
  , banner: 'just a name for your sub application'
  });


  console.log('You called the tst_mod subgenerator with the argument ' + this.name + '.');
};


SubappGenerator.prototype.askFor = function askFor() {
  var cb = this.async();
  var prompts = [];

  // have Yeoman greet the user.
  console.log(this.yeoman);


  var prompts = [];

  if (!this.name) {
    prompts.push({
        name: 'name',
        message: 'Enter sub app name',
        default: 'new_app'
      });
  } else {
    this.name = this.options.mod_name;
  }

  this.prompt(prompts, function (props) {
    this.with_list_ctrl = props.with_list_ctrl;

    cb();
  }.bind(this));
};


util.inherits(TstModGenerator, yeoman.generators.Base);

