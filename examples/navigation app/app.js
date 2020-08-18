class AppComponent extends notic.Component{
    html(){
        return(`<div id = "navBar"> </div>
                <div id = "content" style = "padding: 16px"> </div>`)
    }
}

class NavBarComponent extends notic.Component{
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
                        <a href="#" class="brand-logo center">Navigation example</a>
                        <ul class="left hide-on-med-and-down">
                        ${items}
                        </ul>
                    </div>
                </nav>`;
    }
}

class ListComponent extends notic.Component{
    constructor(){
        super("content");
    }
    
    html(){
        let contacts = ["yuna", "chris", "blake", "yuna", "chris", "blake", "yuna", "chris", "blake", "yuna", "chris", "blake", "yuna", "chris", "blake"]
        let outputList = ``;

        contacts.forEach(contact => {
            outputList = outputList +         
            `   <li class="collection-item avatar" style = "border:none;">
                    <img src="img/${contact}.jpg" alt="" class="circle">
                    <span class="title">${contact}</span>
                    <p>First Line <br>
                        Second Line
                    </p>
                </li>`;
        });
        
        return  `<ul class="collection" style = "border:none">${outputList} </ul>
                <a class="btn-floating btn-large waves-effect waves-light red" style = "position:fixed; right:0; bottom:0; margin:40px;"><i class="material-icons">add</i></a>`;
    }
}

class ProfileComponent extends notic.Component{
    constructor(){
        super("content", ["profile"])
    }
    html(){
        return  `<div class="row">

        <div class="col s3">
            <div class="row"> <h3 class="header" style = "margin-left:16px">Profile</h3>
        </div>
  
        <div class="col s9">

        </div>`;
    }
}

class GalleryComponent extends notic.Component{
    constructor(){
        super("content", ["gallery"])
    }
    html(){
        let collectionOut = ``;
        for(let i = 0; i<3; i++){
            collectionOut = collectionOut +
                `
                <div class="col s4">
                <div class="card hoverable">
                <div class="card-image waves-effect waves-block waves-light">
                    <img class="activator" src="img/sample-1.jpg">
                </div>
                <div class="card-content">
                    <span class="card-title activator grey-text text-darken-4">Card Title<i class="material-icons right">more_vert</i></span>
                    <p><a href="#">This is a link</a></p>
                </div>
                <div class="card-reveal">
                    <span class="card-title grey-text text-darken-4">Card Title<i class="material-icons right">close</i></span>
                    <p>Here is some more information about this product that is only revealed once clicked on.</p>
                </div>
                </div>
                </div>`;
    }   

        return `    <div class="row">
                    <div class="col s12 m6">
                    <div class="card blue-grey darken-1">
                    <div class="card-content white-text">
                        <span class="card-title">Card Title</span>
                        <p> I am a very simple card. I am good at containing small bits of information.
                            I am convenient because I require little markup to use effectively.</p>
                    </div>
                    <div class="card-action">
                        <a href="#">This is a link</a>
                        <a href="#">This is a link</a>
                    </div>
                    </div>
                    </div>
                    </div><div class="row"> <h3 class="header" style = "margin-left:16px">Gallery</h3> ${collectionOut}`;
    }
}

var appComponent = new AppComponent();
var navbarComponent = new NavBarComponent();
var listComponent = new ListComponent();
var galleryComponent = new GalleryComponent();
var infoComponent = new ProfileComponent();
notic.initialize();