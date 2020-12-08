; (function (w, d)
{
    function Genor(){       //Summary and creation of all values
        this.hashList = {};
        this.version = {major: 0, minor: 0, patch:4};
        this.defaultHash = "";
        this.componentList = {}
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

            if(window.genor.componentList[this.view] === undefined)
                window.genor.componentList[this.view] = [];
            
            window.genor.componentList[this.view].push(this);

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
        
        this.viewElement = d.getElementById('appView');
        if (!this.viewElement) return;
        w.location.hash = "#/" + this.defaultHash;

        var updateGenorDelegate = updateGenor.bind(this);
        w.onhashchange = updateGenorDelegate;

        this.isInitialized = true;
    }

    Genor.prototype.update = function(view){
        var updateGenorDelegate = updateGenor.bind(this);
        updateGenorDelegate(view);
    }
    
    function updateGenor(view){     //Handles all the html changes by firing specific methods from Components.
        
        if(!genor.isInitialized) return;

        if(typeof view == "string"){
            
            if(d.getElementById(view)){
                let newViewHtml;
                
                this.componentList[view].forEach((item) => {
                        d.getElementById(view).innerHTML = newViewHtml + item.html();
                        if(item.updateView)
                            item.updateView();
                });

                d.getElementById(view).innerHTML = newViewHtml;
            }
        }
        else{
            
            var newHash = w.location.hash.replace('#', '')
            newHash = newHash.replace('/', '');
            
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
    
                this.componentList[currentView].forEach((item) => {
                    if(item.updateHash)
                        item.updateHash(newHash);
                });
            });
            }
        }
    }

    w.addEventListener("load", function(){
        genor.initialize();
        var updateGenorDelegate = updateGenor.bind(w.genor);
        updateGenorDelegate();
    });

    w.genor = new Genor();   //Appends needed values to the window.
    w.genor.Component = Component;
    w.genor.componentList = {};
    w.genor.defaultHash = "home";

    const reader = new FileReader();
    console.log(reader.readAsText("/app.js"));

})(window, document);