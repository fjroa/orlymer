(function (document) {
  'use strict';

  // Grab a reference to our auto-binding template
  // and give it some initial binding values
  // Learn more about auto-binding templates at http://goo.gl/Dx1u2g
  var app = document.querySelector('#app');
  var DEFAULT_ROUTE = 'principal';
  app.appName = 'Orlymer';
  app.menuName = 'Menu';

  app.pages = [
      {name: 'Principal', hash:'principal'},
      {name: 'Fichas', hash:'fichas'},
      {name: 'Cámara', hash:'camara'}
  ];
  app.fichas = [];
  app.fichas.push(
    {nombre: 'Francisco Javier',
    apellido1: 'Roa',
    apellido2: 'López',
    avatar: '../images/535106-user_512x512.png',
    ciudad: 'Jaén',
    provincia: 'Jaén',
    id : 1
  });
  // Listen for template bound event to know when bindings
  // have resolved and content has been stamped to the page
  app.addEventListener('template-bound', function() {
    this.route = this.route || DEFAULT_ROUTE; // Select initial route.
  });

  app.menuItemSelected = function(e, detail) {
      if (detail.isSelected) {
        document.querySelector('#scaffold').closeDrawer();
  }

  //document.querySelector('cam-snap').addEventListener('change', function(e) {
  //    if (e.detail.data) { document.querySelector('#pic').src = e.detail.data; }
  //})
};
// wrap document so it plays nice with other libraries
// http://www.polymer-project.org/platform/shadow-dom.html#wrappers
})(wrap(document));
