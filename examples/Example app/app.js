class App extends Notic.Component { //The App component.
    
    html(){ //Method that generates html of the App component.
        var icon_1080 = `<img src = "/img/icon-1080.png" id = "icon" />`;
        var info = `<span style="font-size: 30px; opacity: 0.7;"> Source is located in /app.js.<span>`;
        return  `${icon_1080} ${info}`;     //Returns the generated html.
    }

}

var app = new App();
Notic.initialize();