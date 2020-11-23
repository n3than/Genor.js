class App extends notic.Component {

    html(){ 
        return `<button onClick = "message = new Message('Chat');"> new Element </button>
                    <div id="Chat"></div>`;
    }

}

class Message extends notic.Component {
    
    html(){ 
        return `helloworld!`;
    }

}

var app = new App();
notic.initialize();