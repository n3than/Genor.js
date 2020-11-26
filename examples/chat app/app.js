class App extends genor.Component {

    html(){
        console.log("html triggered app");
        this.messageCount = 0; 
        this.messages = [];

        return `<button onClick = "${this.constructor.name.toLowerCase()}.buttonClick()"> new Message </button>
                <div id="chat"></div>`;
    }

    buttonClick(){
        this.messages.push(new Message({message : 'some message', user: 'some user', count: this.messageCount}, 'chat'));
        this.messageCount++;
    }
}

class Message extends genor.Component {

    constructor(properties, view){
        super(properties, view);
    }

    html(){ 
        if(this.random_boolean == undefined){
            this.random_boolean = Math.random() <= 0.5;
        }
        
        return `
        <div id="message-${(this.random_boolean) ? 'blue' : 'orange'}">
        <p id="message-content">${this.properties.message} ${this.properties.count}</p>
        <p id ="message-user">${this.properties.user}</p>`;
    }
}

var app = new App();