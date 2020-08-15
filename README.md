<img src="/icon-1080.png" width="100" height="100">

# notic.js
Notic is a very small framework. The way it is built can be very powerful for small projects.
I created it because I wanted to be very close to the actual HTML and CSS while still writing dynamic stuff in Js.
```javascript
class App extends notic.Component{
  html(){
    return `helloworld`;
  }
}

var app = new App();
notic.initialize();
```

## Attach it to your project
Download the notic.js file and add this html snippet:

```html
  <div id = "appView">  </div>
  <script src = "/notic.0.0.0.min.js"> </script>
  <script src = "/app.js"> </script>
```

## Why
Because I can.
