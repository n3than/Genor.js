class Genor{       //Summary and creation of all values

    constructor(){
    this.hashList = {};
    this.version = {major: 0, minor: 0, patch:4};
    this.defaultHash = "home";
    this.componentList = {}
    this.isInitialized = false;
    this.snippets = {};

    this.viewElement = document.getElementById('appView');
    if (!this.viewElement) return;
    window.location.hash = "#/" + this.defaultHash;
    window.onhashchange = this.update;
    this.isInitialized = true;

    window.addEventListener("load", function(){
        genor.update(this.viewElement);
    });
    }

    update = view => {      //Handles all the html changes by firing specific methods from Components.
        if(!window.genor) return;

        let genorScript = new GenorScript();

        if(typeof view == "string"){

            if(document.getElementById(view)){
                let newViewHtml;
                this.componentList[view].forEach((item) => {
                        if(item.updateView){
                            item.updateView();
                        }
                        
                        let itemHtml = item.html();
                        if(itemHtml.charAt(0) == '-'){
                            newViewHtml = newViewHtml + genorScript.buildHtml(genorScript.readScript(itemHtml));
                        }
                        else{
                            newViewHtml = newViewHtml + itemHtml;
                        }
                });
                document.getElementById(view).innerHTML = newViewHtml;
            }
        }
        else{
            var newHash = window.location.hash.replace('#', '')
            newHash = newHash.replace('/', '');
            
            if(this.hashList[newHash] != undefined){
            let updatedViews = [];
            this.hashList[newHash].forEach((item) => {
                
                let currentView = item.view;
                let itemHtml = item.html();

                if(updatedViews.includes(currentView)){
                    if(itemHtml.charAt(0) == '-'){
                        document.getElementById(currentView).innerHTML = document.getElementById(currentView).innerHTML + genorScript.buildHtml(genorScript.readScript(itemHtml));
                    }
                    else{
                        document.getElementById(currentView).innerHTML = document.getElementById(currentView).innerHTML + itemHtml;
                    }
                }
                else{
                    if(itemHtml.charAt(0) == '-'){
                        document.getElementById(currentView).innerHTML = genorScript.buildHtml(genorScript.readScript(itemHtml));
                    }
                    else{
                        document.getElementById(currentView).innerHTML = itemHtml;
                    }
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
}
        
Genor.Component = class {
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
            window.genor.update(view);     //Updates all items in the given view.
    }  
}

Genor.Snippet = class {
    constructor(props){
        genor.snippets[props.name] = props.html;
    }
}

class GenorScript{
    readScript(code){
        return code.split(/\s+/)
        .filter(function (t) { return t.length > 0 })
        .map(function (t) {
            if(t.charAt(0) == '-'){ return {type: 'command', value: t.substring(1)}}
            if(t.charAt(0) == '<' && t.charAt(t.length - 1) == '>'){ return {type: 'snippet', value: t.slice(1, -1)}}
            if(t){ return {type: 'value', value: t}}
        })
    }
    
    buildHtml(tokens) {
    var builtHtml = "";

    while (tokens.length > 0){
        var current_token = tokens.shift()

        if (current_token.type === 'command') {
            switch (current_token.value) {
                case '-' :
                    var args =  new Object;
                    var token = tokens.shift();

                    if(token.type === 'snippet'){
                        args.snippet = token.value;
                        builtHtml = builtHtml + genor.snippets[args.snippet];
                    }
                    else{
                        throw 'ValueError: Repeat command third parameter is of type Snippet. ' + token.value;
                    }
                    break

                case 'repeat' :
                    var args =  new Object();
                    var token = tokens.shift();

                    if(token.type === 'value') {
                        args.value = token.value;

                        var token = tokens.shift()
                        if(token.type === 'snippet'){
                            args.snippet = token.value;

                            for(let x = 0; x < args.value; x++){
                                builtHtml = builtHtml + genor.snippets[args.snippet];
                            }
                        }
                        else{
                            throw 'ValueError: Repeat command third parameter is of type Snippet and has to start with an $';
                        }
                    } else {
                        throw 'ValueError: Repeat command second parameter is of type value'
                    }
                    break;
                    
                default:
                    console.log(tokens);
                    throw 'SyntaxError: ' + current_token.value;
                }
        }
    return builtHtml;
    }
}    
}
window.genor = new Genor();