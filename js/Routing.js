/*
@brief router for basic spa
@cite https://levelup.gitconnected.com/writing-a-single-page-application-with-vanilla-js-a5c7f7e23f6d
@cite https://medium.com/@george.norberg/history-api-getting-started-36bfc82ddefc
@cite https://medium.com/@bryanmanuele/how-i-implemented-my-own-spa-routing-system-in-vanilla-js-49942e3c4573
@date 10/2/2021
*/
import {HomePage,ResumePage,CVPage} from '/pages.js';

initRouting();

/*routing table*/
function getRoutingTable(){
    return {
        '/':HomePage,
        '/resume':ResumePage,
        '/cv':CVPage
    }
}

function render(){
    let content_div = document.querySelector('#content');
    content_div.innerHTML = getRoutingTable()[window.location.pathname]();
}

function navTo(url,animate=true){
    if(animate){
        let content_div = document.querySelector('#content');
        let dur = 0.25;
        content_div.style.transitionDuration=dur.toString()+'s';
        content_div.style.opacity = '0%';
        history.pushState(null,null,url);
        setTimeout(()=>{
            render();
            content_div.style.opacity = '100%';
        },dur*1000);}
    else{
        history.pushState(null,null,url);
        render();
    }
}

/* Initialize the page when first loaded */
function initRouting(){
    render();
}

window.addEventListener('popstate',()=>{navTo(window.location.href)})

/* Define a link for spa*/
customElements.define('a-local',
  class extends HTMLElement {
    constructor() {
      super();
      console.log('element built')
      this.style.cursor = 'pointer';
      this.addEventListener("click",function(event){
          let new_url = window.location.origin+(this.getAttribute('href') || '/');
          navTo(new_url)
      });
  }
});
