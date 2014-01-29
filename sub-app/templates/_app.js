

JabberApp.module('<%= _.capitalize(name) %>App', function(<%= _.capitalize(name) %>App, App, Backbone, Marionette, $, _) {
  <% if (with_list_ctrl) { %>
  <%= _.capitalize(name) %>App.Router = Marionette.AppRouter.extend({
    appRoutes: {
      '<%= name %>':   'list'
    }
  });

  var API = {
    list: function() {
      return new <%= _.capitalize(name) %>App.List.Controller({
        auth: 'default'
      });
    }
  };

  App.addInitializer(function() {
    new <%= _.capitalize(name) %>App.Router({
      controller: API
    });
  });
  <% } %>
});