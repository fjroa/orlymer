(function (document) {
  'use strict';

  // Grab a reference to our auto-binding template
  // and give it some initial binding values
  // Learn more about auto-binding templates at http://goo.gl/Dx1u2g
  var app = document.querySelector('#app');
  var DEFAULT_ROUTE = 'principal';    
  var w, h, context, video;   
  app.appName = 'Orlymer';
  app.menuName = 'Menu';
    
  app.pages = [
      {name: 'Principal', hash:'principal'},
      {name: 'Fichas', hash:'fichas'},
      {name: 'Cámara', hash:'camara'}
  ];
  // Listen for template bound event to know when bindings
  // have resolved and content has been stamped to the page
  app.addEventListener('template-bound', function() {
    video = document.querySelector('#camara');
    var canvas = document.querySelector('#canvas');  
    context = canvas.getContext("2d");  
            
    
    this.route = this.route || DEFAULT_ROUTE; // Select initial route. 
  });

  app.menuItemSelected = function(e, detail, sender) {
      if (detail.isSelected) {
        document.querySelector('#scaffold').closeDrawer();
  };
   

		
  // Takes a snapshot of the video
        app.snapAction = function(e) {
            // Calculate the ratio of the video's width to height
			var ratio = video.videoWidth / video.videoHeight;
			// Define the required width as 100 pixels smaller than the actual video's width
			w = video.videoWidth - 100;
			// Calculate the height based on the video's width and the ratio
			h = parseInt(w / ratio, 10);
			// Set the canvas width and height to the values just calculated
			canvas.width = w;
			canvas.height = h;	
                // Define the size of the rectangle that will be filled (basically the entire element)
                context.fillRect(0, 0, w, h);
                // Grab the image from the video
                context.drawImage(video, 0, 0, w, h);
		};
};
// wrap document so it plays nice with other libraries
// http://www.polymer-project.org/platform/shadow-dom.html#wrappers
})(wrap(document));
