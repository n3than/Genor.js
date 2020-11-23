class App extends notic.Component {

    html(){
        console.log("html triggered app");
        this.messageCount = 0; 
        this.messages = [];

        return `<button onClick = "app.buttonClick()"> new Message </button>
                <div id="chat"></div>`;
    }

    buttonClick(){
        this.messageCount++;
        this.messages.push(new Message({message : 'some message', user: 'some user', count: this.messageCount}, 'chat'));
    }
}

class Message extends notic.Component {

    constructor(properties, view){
        super(properties, view);
    }

    html(){ 
        if(this.random_boolean == undefined){
            this.random_boolean = Math.random() <= 0.5;
            console.log("html triggered message " + this.properties.count);
        }
        
        return `
        <div id="message-${(this.random_boolean) ? 'blue' : 'orange'}">
        <p id="message-content">${this.properties.message} ${this.properties.count}</p>
        <p id ="message-user">${this.properties.user}</p>`;
    }

    updateView(){
        console.log("update triggered message " + this.properties.count);
    }
}

var app = new App();