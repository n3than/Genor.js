class App extends Notic.Component{
    html(){
        var finished = ``;
        for(let i = 0; i<12; i++){
            finished = finished + `<div class="col s1"> ${i+1} </div>`;
        }
        return  `<div class="row">
                    ${finished}
                </div>`;
    }
}

var app = new App();
Notic.initialize();