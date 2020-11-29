<h1 align = "center">Genor.js - Small and impactful</h1>

<p align="center"> <img src="/icon.svg" alt="genor-logo" width="120px" height="120px" />
<br>
  
Genor is a tiny library. The way it is built can be very powerful for small one page applications.
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

Then create app.js and you are ready to go!
