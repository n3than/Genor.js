; (function (w, d)
{
    function Notic(){       //Summary and creation of all values
        this.hashList = {};
        this.version = {major: 0, minor: 0, patch:2};
        this.defaultHash = "";
        this.viewElement;
        this.registeredComponents = {}
    }

    class Component{
        constructor(properties, view, hashList){      //Registeres the given object in notic
            this.properties = properties;
            this.hashList = hashList;
            this.view = view;
            if(!view)
                this.view = "appView";

            if(!hashList)
                this.hashList = [window.notic.defaultHash];

            if(window.notic.registeredComponents[this.view] === undefined)
                window.notic.registeredComponents[this.view] = [];
            
            window.notic.registeredComponents[this.view].push(this);

            this.hashList.forEach(element => {
                if(window.notic.hashList[element] === undefined)
                    window.notic.hashList[element] = [];
                
                window.notic.hashList[element].push(this);
            });
            if(notic)
                notic.update(view);
        }
    }

    Notic.prototype.initialize = function(){        //Setting values and init listener to hash changes.
        var updateNoticDelegate = updateNotic.bind(this);
        this.viewElement = d.getElementById('appView');
        if (!this.viewElement) return;

        window.onhashchange = updateNoticDelegate;
        updateNoticDelegate();
        w.location.hash = "#/" + this.defaultHash;
    }

    Notic.prototype.start = function(){     //Binds the onhashchange to the updateNotic function.
        var updateNoticDelegate = updateNotic().bind(this);
        w.onhashchange = updateNoticDelegate;
    }

    Notic.prototype.update = function(view){
        var updateNoticDelegate = updateNotic.bind(this);
        updateNoticDelegate(view);
    }
    
    function updateNotic(view){     //Handles all the html changes by firing specific methods from Components.
        
        console.log(view);
        var newHash = w.location.hash.replace('#', '').replace('/', '');;

        if(view){
            if(d.getElementById(view)){
                d.getElementById(view).innerHTML = "";
                
                this.registeredComponents[view].forEach((item) => {
                        d.getElementById(view).innerHTML = d.getElementById(view).innerHTML + item.html();
                        if(item.updateView)
                            item.updateView();
                });
            }
        }
        else{
            if(!(newHash in this.hashList))
                newHash = this.defaultHash;
            
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

    document.onload = function(){
        notic.initialize();
    }

    w.notic = new Notic();   //Appends needed values to the window.
    w.notic.Component = Component;
    w.notic.registeredComponents = {};
    w.notic.defaultHash = "home";
})(window, document);