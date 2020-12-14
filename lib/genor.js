/*!
 * genor
 * Copyright(c) 2020 Nathan Reyes
 * MIT Licensed
 */

import server from 'server';

const routes = [];

class Component {
    constructor(props){
        myRoute = props.route;
        routes.push({myRoute})
    }

    setTitle(title){
        document.title = title;
    }

    async html(){
        return "";
    }
}

const navigateTo = url =>{
    history.pushState(null, null, url);
    router();
}

const router = async () => {
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

    const component = new match.route.view();
    document.querySelector('#app').innerHTML = await component.html();
};

window.addEventListener("popstate", router);

document.addEventListener('DOMContentLoaded', ()=> {
    document.body.addEventListener('click', e => {
        if(e.target.matches("[genor-link]")) {
            e.preventDefault();
            navigateTo(e.target.href);
        }
    } )
    router();
})

server();

exports.Component = Component;