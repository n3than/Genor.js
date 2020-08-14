; (function (w, d)
{
    function Notic(){
        this.routes = {};
        this.version = {major: 0, minor: 0, patch: 0};
        this.defaultRoute = "";
        this.viewElement;
    }

    class Component{
        constructor(renderId, renderRoutes){
            if(renderId){
                this.renderRoutes = renderRoutes;
                this.renderId = renderId;
            }
            else{
                this.renderRoutes = ["app"];
                this.renderId = "appView";
            }

            if(window.Notic.registeredComponents[this.renderId] === undefined)
                window.Notic.registeredComponents[this.renderId] = [];
            
            window.Notic.registeredComponents[this.renderId].push(this);

            this.renderRoutes.forEach(element => {
                if(window.Notic.routes[element] === undefined)
                    window.Notic.routes[element] = [];
                
                window.Notic.routes[element].push(this);
            });
        }
    }

    Notic.prototype.initialize = function(){
        var updateMvcDelegate = updateMvc.bind(this);
        this.viewElement = d.getElementById('appView');
        if (!this.viewElement) return;

        this.defaultRoute = "app";

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
                
                if(updatedIds.includes(currentId)){
                    d.getElementById(currentId).innerHTML = d.getElementById(currentId).innerHTML + item.html();
                }
                else{
                    d.getElementById(currentId).innerHTML = item.html();
                    updatedIds.push(currentId)
                }

                window.Notic.registeredComponents[currentId].forEach((item) => {
                    if(item.hashUpdate)
                        item.hashUpdate(newHash);
                });
        });
        }
    }

    w['Notic'] = new Notic();
    w.Notic.Component = Component;
    w.Notic.registeredComponents = {};

    var style = document.createElement("link");
    style.rel = "stylesheet";
    style.href= "styles.css";
    document.head.appendChild(style);

})(window, document);