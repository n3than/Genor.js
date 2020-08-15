class App extends notic.Component{
    html(){
        return(`<div id = "navBar"> </div>
                <div id = "content"> </div>`)
    }
}

class NavBar extends notic.Component{
    constructor(){
        super("navBar");
    }

    html(){
        let items = ``
        for (let key in window.notic.routes){
            items = items + `<li><a href="${"#/"+key}"> ${key} </a></li>`;
        }

        return  `   
                <nav>
                    <div class="nav-wrapper" style="padding-left: 16px;">
                        <a href="#" class="brand-logo">Logo</a>
                        <ul id="nav-mobile" class="right hide-on-med-and-down">
                        ${items}
                    </div>
                </nav>`;
    }
}

class ListView extends notic.Component{
    constructor(){
        super("content");
    }
    
    html(){
        let contacts = ["yuna", "chris", "blake"]
        let outputList = ``;

        contacts.forEach(contact => {
            outputList = outputList +         
            `   <li class="collection-item avatar">
                    <img src="img/${contact}.jpg" alt="" class="circle">
                    <span class="title">${contact}</span>
                    <p>First Line <br>
                        Second Line
                    </p>
                </li>`;
        });
        
        return  `<ul class="collection">${outputList} </ul>`;
    }
}

class Info extends notic.Component{
    constructor(){
        super("content", ["info"])
    }
    html(){
        return("helloworld");
    }
}

var app = new App();
var navbar = new NavBar();
var listView = new ListView();
var info = new Info();
notic.initialize();