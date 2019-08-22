// UI definition example
const myApp = {
  myAppModule : {
    render : function() {
      const myUI = new rzl.UI(this.uiDef); // create the new UI and store it
      const myUI === myApp.state.myAppModule; // state is also stored globally
    },

    uiDef : {
      meta : {
        name : "myAppModule",
        domain : "myApp",
        pnode : document.body
      },
      view : {
        style : { margin : "20px", "margin-top" : "5px" },
        children : [
          {
            tag : "h1", // element tag - default is div
            id : "title",
            class : "red bold",
            style : { margin : "20px", "margin-top" : "5px" },
            title : "",
            content : "",
            placeholder : "",
            inputtype : "",
            imgsrc : "",
            events : {
              "click" : "myApp.myAppModule.function"
            },
            props : {}, // html element properties and custom properties
            options : {},
            selected : false
          }
        ]
      }
    },
  }
}
