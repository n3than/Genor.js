class App extends notic.Component { //The App component.
    
    html(){ //Method that generates html of the App component.
        var icon_1080 = `<img src = "img/icon-1080.png" id = "icon" />`;
        var info = `<span id = "info"> Source is located in /app.js.</span>`;
        var actionLink = '<a id = "action" href="https://github.com/Nathan2474/notic.js"> View on Github </a>';
        
        return  `${icon_1080} ${info} <br/><br/> ${actionLink}`;     //Returns the generated html.
    }

}

var app = new App();
notic.initialize();