; (function (w, d)
{
    function Genor(){       //Summary and creation of all values
        this.hashList = {};
        this.version = {major: 0, minor: 0, patch:2};
        this.defaultHash = "";
        this.registeredComponents = {}
        this.isInitialized = false;
    }

    class Component{
        constructor(properties, view, hashList){      //Registeres the given object in genor
            this.properties = properties;
            this.hashList = hashList;
            this.view = view;
            if(!view)
                this.view = "appView";

            if(!hashList)
                this.hashList = [window.genor.defaultHash];

            if(window.genor.registeredComponents[this.view] === undefined)
                window.genor.registeredComponents[this.view] = [];
            
            window.genor.registeredComponents[this.view].push(this);

            this.hashList.forEach(element => {
                if(window.genor.hashList[element] === undefined)
                    window.genor.hashList[element] = [];
                
                window.genor.hashList[element].push(this);
            });
            if(genor.isInitialized)
                genor.update(view);     //Updates all items in the given view.
        }
    }

    Genor.prototype.initialize = function(){        //Setting values and init listener to hash changes.
        console.log("initialize");
        
        this.viewElement = d.getElementById('appView');
        if (!this.viewElement) return;
        w.location.hash = "#/" + this.defaultHash;

        var updateGenorDelegate = updateGenor.bind(this);
        window.onhashchange = updateGenorDelegate;

        this.isInitialized = true;
    }

    Genor.prototype.update = function(view){
        console.log("update");
        var updateGenorDelegate = updateGenor.bind(this);
        updateGenorDelegate(view);
    }
    
    function updateGenor(view){     //Handles all the html changes by firing specific methods from Components.
        
        if(!genor.isInitialized) return;
        console.log("updateGenor");

        if(typeof view == "string"){
            
            if(d.getElementById(view)){
                d.getElementById(view).innerHTML = "";
                
                this.registeredComponents[view].forEach((item) => {
                        d.getElementById(view).innerHTML = d.getElementById(view).innerHTML + item.html();
                        if(item.updateView)
                            item.updateView();
                });
            }
            console.log("- View");
        }
        else{
            
            var newHash = w.location.hash.replace('#', '')
            newHash = newHash.replace('/', '');

            console.log("- Hash");
            
            if(this.hashList[newHash] != undefined){
            let updatedViews = [];
            this.hashList[newHash].forEach((item) => {
                
                let currentView = item.view;
                
                if(updatedViews.includes(currentView)){
                    d.getElementById(currentView).innerHTML = d.getElementById(currentView).innerHTML + item.html();
                }
                else{
                    d.getElementById(currentView).innerHTML = item.html();
                    updatedViews.push(currentView);
                }
    
                this.registeredComponents[currentView].forEach((item) => {
                    if(item.updateHash)
                        item.updateHash(newHash);
                });
            });
            }
        }
    }

    window.addEventListener("load", function(){
        genor.initialize();
        var updateGenorDelegate = updateGenor.bind(w.genor);
        updateGenorDelegate();
    });

    w.genor = new Genor();   //Appends needed values to the window.
    w.genor.Component = Component;
    w.genor.registeredComponents = {};
    w.genor.defaultHash = "home";
})(window, document);