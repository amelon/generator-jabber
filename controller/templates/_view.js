JabberApp.module('<%= _.capitalize(mod_name) %>App.<%= _.capitalize(ct_name) %>', function(<%= _.capitalize(ct_name) %>, App, Backbone, Marionette, $, _) {

  <%= _.capitalize(ct_name) %>.Layout = App.Views.Layout.extend({
    template: require('./tpl/layout.hbs')
  , regions: {
      titleRegion:  '#title-region'
    , panelRegion:  '#panel-region'
    , <%= ct_name %>Region:   '#<%= ct_name %>-region'
    }
  });


  <%= _.capitalize(ct_name) %>.Title = App.Views.ItemView.extend({
    template: require('./tpl/_title.hbs')
  });


  <%= _.capitalize(ct_name) %>.Panel = App.Views.ItemView.extend({
    template: require('./tpl/_panel.hbs')
  });


<% if (pluralize) { %>
  <%= _.capitalize(ct_name) %>.<%= _.capitalize(mod_name) %> = App.Views.ItemView.extend({
    template: require('./tpl/_<%= mod_name %>.hbs')
  , tagName: 'ol'
  });


  <%= _.capitalize(ct_name) %>.<%= _.capitalize(entity_name) %> = App.Views.CompositeView.extend({
    template: require('./tpl/_<%= mod_name %>s.hbs')
  , itemView: <%= _.capitalize(ct_name) %>.<%= _.capitalize(mod_name) %>
  , itemViewContainer: '.lbody'
  , className: 'jab-list'
  });

<% } else { %>
  <%= _.capitalize(ct_name) %>.<%= _.capitalize(entity_name) %> = App.Views.ItemView.extend({
    template: require('./tpl/_<%= mod_name %>.hbs')
  });
<% } %>
});