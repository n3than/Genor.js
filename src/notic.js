; (function (w, d)
{
    function Notic(){
        this.routes = {};
        this.version = {major: 0, minor: 0, patch: 0};
        this.defaultRoute = "";
        this.viewElement;
        this.registeredComponents = {}
    }

    class Component{
        constructor(renderId, renderRoutes){
            this.renderRoutes = renderRoutes;
            this.renderId = renderId;
            if(!renderId)
                this.renderId = "appView";

            if(!renderRoutes)
                this.renderRoutes = [window.notic.defaultRoute];

            if(window.notic.registeredComponents[this.renderId] === undefined)
                window.notic.registeredComponents[this.renderId] = [];
            
            window.notic.registeredComponents[this.renderId].push(this);

            this.renderRoutes.forEach(element => {
                if(window.notic.routes[element] === undefined)
                    window.notic.routes[element] = [];
                
                window.notic.routes[element].push(this);
            });
        }
    }

    Notic.prototype.initialize = function(){
        var updateMvcDelegate = updateMvc.bind(this);
        this.viewElement = d.getElementById('appView');
        if (!this.viewElement) return;

        window.onhashchange = updateMvcDelegate;
        updateMvcDelegate();
        w.location.hash = "#/" + this.defaultRoute;
    }

    Notic.prototype.start = function(){
        var updateMvcDelegate = updateMvc().bind(this);
        w.onhashchange = updateMvcDelegate;
    }
    
    function updateMvc(){
        if(this.routes){
            var newHash = w.location.hash.replace('#', '');
            newHash = newHash.replace('/', '');
            
            if(!(newHash in this.routes))
                newHash = this.defaultRoute;

            let updatedIds = [];
            this.routes[newHash].forEach((item) => {
                
                let currentId = item.renderId;
                
                console.log(currentId);
                if(updatedIds.includes(currentId)){
                    d.getElementById(currentId).innerHTML = d.getElementById(currentId).innerHTML + item.html();
                }
                else{
                    console.log(currentId);
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

    w['notic'] = new Notic();
    w.notic.Component = Component;
    w.notic.registeredComponents = {};
    w.notic.defaultRoute = "home";

    var style = document.createElement("link");
    style.rel = "stylesheet";
    style.href= "styles.css";
    document.head.appendChild(style);

})(window, document);