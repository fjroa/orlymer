Polymer(Polymer.mixin({
        ready: function() {
            //---- INICIALIZAMOS LAS FICHAS CON FAKER.JS-----------------------------
            faker.locale = 'es';
            this.fichas = [];
            for(var i = 0; i < this.num; i++) {
                this.fichas.push({
                    nombre: faker.name.firstName(),
                    apellido1: faker.name.lastName(),
                    apellido2: faker.name.lastName(),
                    avatar: faker.image.avatar(),
                    ciudad: faker.address.city(),
                    provincia: faker.address.state(),
                    id : i
                });
            }
        //---- INICIO LISTENERS ---------------------------------
            this.addEventListener('drag-start', function(e) {
              var dragInfo = e.detail;
              while (e.detail.avatar.firstChild) {
                  e.detail.avatar.removeChild(e.detail.avatar.firstChild);
              }
              dragInfo.avatar.style.cssText = 'padding:10px; border: 3px solid #FFF; width: 50px; height: 50px; border-radius: 50px; background-color: whitesmoke';
              var d = document.createElement('div');
              var ficha = dragInfo.event.target.templateInstance.model.templateInstance.model.ficha;
              d.innerHTML = ficha.nombre + ' ' + ficha.apellido1 + ' ' + ficha.apellido2;
              e.detail.avatar.appendChild(d);
              dragInfo.drag = function(){
                  this.showDrag = false;};
              dragInfo.drop = this.dropFunction;
            });
                                                 
            this.addEventListener('template-bound', function(e) {
                e.target.g = CoreStyle.g;
            });  
            
            this.addEventListener('core-change', function() {
                if (this.$.cabecera.$.numFichas.value <= this.fichas.length) {
                  while (this.fichas.length > this.$.cabecera.$.numFichas.value) {
                      this.fichas.pop();
                  }
                } else {
                 for (var i = this.fichas.length; i < this.$.cabecera.$.numFichas.value; i++) {
                        this.fichas.push({
                        nombre: faker.name.firstName(),
                        apellido1: faker.name.lastName(),
                        apellido2: faker.name.lastName(),
                        avatar: faker.image.avatar(),
                        ciudad: faker.address.city(),
                        provincia: faker.address.state(),
                        id : i
                    });
                 }
                }
                this.num = this.$.cabecera.$.numFichas.value;
                CoreStyle.g.items = this.num;
                CoreStyle.g.columns = this.$.cabecera.$.numGrid.value;
                CoreStyle.g.rows = Math.ceil(CoreStyle.g.items/CoreStyle.g.columns);
            });
           //---- FIN LISTENERS ---------------------------------
        },
     
       selectedFicha: null,
       showDrag: true,
       
       transition: function(e) {
        if (this.page === 0 && e.target.templateInstance.model.ficha) {
          this.selectedFicha = e.target.templateInstance.model.ficha;
          this.page = 1;
        }},

        dropFunction : function(dragInfo) {
           showDrag = true;
           var fichas = dragInfo.event.target.templateInstance.model.templateInstance.model.fichas;
           var fichaOrigen = dragInfo.event.target.templateInstance.model.templateInstance.model.ficha;
           var fichaDestino = dragInfo.event.relatedTarget.templateInstance.model.ficha;

           var idDestino = fichaDestino.id;
           var idOrigen = fichaOrigen.id;

           var temp = fichas[fichaOrigen.id];
            //Nuevo Origen
           fichas[idOrigen] = fichas[fichaDestino.id];
           fichas[idOrigen].id = idOrigen;
           //Nuevo Destino;
           fichas[idDestino] = temp;
           fichas[idDestino].id = idDestino;
        },  
    
      //----- INICIO RESIZABLE ------
      attached: function () {
        this.resizableAttachedHandler();
      },
      detached:function(){
        this.resizableDetachedHandler();
      },
      eventDelegates: {
        'core-resize': 'updateSize'
      },
      updateSize:function(){
        var height = document.body.clientHeight;                
        CoreStyle.g.containerHeight = height - this.$.cabecera.clientHeight - 140 -(5*CoreStyle.g.rows);
        CoreStyle.g.containerWidth = this.$.fichasContainer.clientWidth; 
        CoreStyle.g.fichaHeight = (CoreStyle.g.containerHeight - 140) /  CoreStyle.g.rows;    
        this.$.listaBackground.setAttribute('viewBox', '0 0 ' + CoreStyle.g.containerWidth + ' ' + CoreStyle.g.containerHeight);
      },
      themeChanged: function() {
        switch (this.theme) {
             case 'sinFondo' :
                this.$.listaBackgroundImage.setAttributeNS('http://www.w3.org/1999/xlink', 'href', '');
                    break;
             case 'underglow':
                this.$.listaBackgroundImage.setAttributeNS('http://www.w3.org/1999/xlink', 'href', '/images/fondos/Underglow.svg');
                    break;
             default :
                    this.$.listaBackgroundImage.setAttributeNS('http://www.w3.org/1999/xlink', 'href', '/images/fondos/EmptyChalkboard.svg');
                    break;
            }
      }
    //------ FIN RESIZABLE -----
    },Polymer.CoreResizable));