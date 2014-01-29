
JabberApp.module('<%= _.capitalize(mod_name) %>App.<%= _.capitalize(ct_name) %>', function(<%= _.capitalize(ct_name) %>, App, Backbone, Marionette, $, _) {
  require('./<%= ct_name %>.view.js');

  <%= _.capitalize(ct_name) %>.Controller = App.Controllers.Application.extend({
    name: '<%= _.capitalize(mod_name) %>App.<%= _.capitalize(ct_name) %>'

  , initialize: function(options) {
      var <%= entity_name %> = App.request('<%= mod_name %>:<%= pluralize ? 'entities' : 'entity' %>');


      this.layout = this.getLayoutView(<%= entity_name %>);

      this.listenTo(this.layout, 'show', function() {
        this.titleRegion(<%= entity_name %>);
        this.panelRegion(<%= entity_name %>);
        this.<%= ct_name %>Region(<%= entity_name %>);
      });

      this.show(this.layout, { loading: true });
    }


  , getLayoutView: function(<%= entity_name %>) {
      return new <%= _.capitalize(ct_name) %>.Layout({ <%= entity_container %>: <%= entity_name %> });
    }


  , titleRegion: function(<%= entity_name %>) {
      var titleView = this.getTitleView(<%= entity_name %>);
      this.show(titleView, { region: this.layout.titleRegion });
    }


  , panelRegion: function(<%= entity_name %>) {
      var panelView = this.getPanelView(<%= entity_name %>);

      this.show(panelView, { region: this.layout.panelRegion });

    }


  , <%= ct_name %>Region: function(<%= entity_name %>) {
      var <%= ct_name %>View = this.get<%= _.capitalize(ct_name) %>View(<%= entity_name %>);

      this.show(<%= ct_name %>View, { region: this.layout.<%= ct_name %>Region });
    }


  , getTitleView: function(<%= entity_name %>) {
      return new <%= _.capitalize(ct_name) %>.Title({ <%= entity_container %>: <%= entity_name %> });
    }

  , getPanelView: function(<%= entity_name %>) {
      return new <%= _.capitalize(ct_name) %>.Panel({ <%= entity_container %>: <%= entity_name %> });
    }


  , get<%= _.capitalize(ct_name) %>View: function(<%= entity_name %>) {
      return new <%= _.capitalize(ct_name) %>.<%= _.capitalize(entity_name) %>({ <%= entity_container %>: <%= entity_name %> });
    }
  });

});