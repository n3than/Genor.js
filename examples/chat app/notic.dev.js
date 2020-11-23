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
        constructor(renderId, renderHashList){      //Registeres the given object in notic
            this.renderHashList = renderHashList;
            this.renderId = renderId;
            if(!renderId)
                this.renderId = "appView";

            if(!renderHashList)
                this.renderHashList = [window.notic.defaultHash];

            if(window.notic.registeredComponents[this.renderId] === undefined)
                window.notic.registeredComponents[this.renderId] = [];
            
            window.notic.registeredComponents[this.renderId].push(this);

            this.renderHashList.forEach(element => {
                if(window.notic.hashList[element] === undefined)
                    window.notic.hashList[element] = [];
                
                window.notic.hashList[element].push(this);
            });
            if(notic)
                notic.update();
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

    Notic.prototype.update = function(){
        var updateNoticDelegate = updateNotic.bind(this);
        updateNoticDelegate();
    }
    
    function updateNotic(){     //Handles all the html changes by firing specific methods from Components.
        if(this.hashList){
            var newHash = w.location.hash.replace('#', '');
            newHash = newHash.replace('/', '');
            
            if(!(newHash in this.hashList))
                newHash = this.defaultHash;

            let updatedIds = [];
            this.hashList[newHash].forEach((item) => {
                
                let currentId = item.renderId;
                
                if(updatedIds.includes(currentId)){
                    d.getElementById(currentId).innerHTML = d.getElementById(currentId).innerHTML + item.html();
                }
                else{
                    d.getElementById(currentId).innerHTML = item.html();
                    updatedIds.push(currentId)
                }

                this.registeredComponents[currentId].forEach((item) => {
                    if(item.hashUpdate)
                        item.hashUpdate(newHash);
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