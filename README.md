<img src="/logo.svg" width="300" height="300">

Genor is a very small framework. The way it is built can be very powerful for small projects.
I created it because I wanted to be very close to the actual HTML and CSS while still writing dynamic stuff in Js.
```javascript
class App extends genor.Component{
  html(){
    return `helloworld`;
  }
}

var app = new App();
```

## Attach it to your project
Download the genor.js file and add this html snippet:

```html
  <div id = "appView">  </div>
  <script src = "/genor.min.js"> </script>
  <script src = "/app.js"> </script>
```

## Why
Because I can.
