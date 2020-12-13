const router = async () => {
    const routes = [
        {path: '/', view: ()=> console.log('Viewing Dashboard')},
        {path: '/posts', view: ()=> console.log('Viewing Posts')},
        {path: '/settings', view: ()=> console.log('Viewing Settings')}
    ];
    
    const potentialMatches = routes.map(route => {
        return {
          route: route,
          isMatch: route.path === location.pathname
        };
    });

    let match = potentialMatches.find(potentialMatch => potentialMatch.isMatch);
    if(!match){
        match = routes[0];
        match.isMatch = true;
        location.pathname = match.path;
    }
    console.log(match);
    console.log(potentialMatches);

    //match.route.view is a function. could return html.... ;)
};

document.addEventListener('DOMContentLoaded', ()=> {
    router();
})