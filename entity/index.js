'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var path   = require('path');
var fs     = require('fs');


var EntityGenerator = module.exports = function EntityGenerator(args, options, config) {
  // By calling `NamedBase` here, we get the argument to the subgenerator call
  // as `this.name`.
  yeoman.generators.Base.apply(this, arguments);

  console.log('You called the entity subgenerator with the argument ' + this.name + '.');
};

util.inherits(EntityGenerator, yeoman.generators.Base);


EntityGenerator.prototype.askFor = function askFor() {
  var cb;

  // have Yeoman greet the user.

  var prompts = [];

  prompts.push({
      name: 'ent_name',
      message: 'Enter entity name',
      default: 'entity'
    });


  prompts.push({
      type: 'confirm',
      name: 'add_collection',
      message: 'Add collection ?',
      default: true
    });

  prompts.push({
      type: 'confirm',
      name: 'add_handler',
      message: 'Add request handler ?',
      default: true
    });


  console.log(this.yeoman);

  cb = this.async();
  this.prompt(prompts, function (props) {
    this.ent_name = props.ent_name;
    this.add_collection = props.add_collection;
    this.add_handler = props.add_handler;
    cb();
  }.bind(this));
}




EntityGenerator.prototype.files = function files() {
  var ent_path  = 'assets/javascripts/backbone/entities';
  var ent_file  = this.ent_name + '.ent.js';


  this.mkdir('assets');
  this.mkdir('assets/javascripts');
  this.mkdir('assets/javascripts/backbone');
  this.mkdir('assets/javascripts/backbone/entities');

  this.template('_ent.js', path.join(ent_path, ent_file));
};



EntityGenerator.prototype.requireInEntities = function requireInEntities() {
  var index_path    = path.join('assets/javascripts/backbone/entities/index.js');
  var name          = this.ent_name;
  var added_require = "require('./"+name+".ent.js');";
  var file = '';

  if (fs.existsSync(index_path)) {
    file = this.readFileAsString(index_path);
  }

  if (file.indexOf(added_require) < 0) {
    this.write(index_path, file+'\n'+added_require);
  }
};
