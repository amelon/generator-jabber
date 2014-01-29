JabberApp.module('Entities', function(Entities, App, Backbone, Marionette, $, _) {


  var <%= _.capitalize(ent_name) %> = Entities.Model.extend({
    urlRoot: '<%= ent_name %>'
  });

  <% if (add_collection) { %>
  var <%= _.capitalize(ent_name) %>Collection = Entities.Collection.extend({
    model: <%= _.capitalize(ent_name) %>
  , url: '<%= ent_name %>'
  });
  <% } %>

  var API = {
    get<%= _.capitalize(ent_name) %>: function(id) {
      var <%= ent_name %> = new <%= _.capitalize(ent_name) %>({ _id: id });
      <%= ent_name %>.fetch();
      return <%= ent_name %>;
    }

  , getNew<%= _.capitalize(ent_name) %>: function() {
      return new <%= _.capitalize(ent_name) %>();
    }

  <% if (add_collection) { %>
  , get<%= _.capitalize(ent_name) %>s: function() {
      var <%= ent_name %> = new <%= _.capitalize(ent_name) %>Collection();
      <%= ent_name %>.fetch({reset: true});
      return <%= ent_name %>;
    }
  <% } %>
  };

<% if (add_handler) { %>
  <% if (add_collection) { %>
  App.reqres.setHandler('<%= ent_name %>:entities', function() {
    return API.get<%= _.capitalize(ent_name) %>s();
  });
  <% } %>

  App.reqres.setHandler('<%= ent_name %>:entity', function(id) {
    return API.get<%= _.capitalize(ent_name) %>(id);
  });

  App.reqres.setHandler('new:<%= ent_name %>:entity', function() {
    return API.getNew<%= _.capitalize(ent_name) %>();
  });
<% } %>

});