customElements.define('common-head',
  class extends HTMLElement {
    constructor() {
      super();
      this.innerHTML = `
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial_scale=1, minimum-scale=1">
  <link rel="stylesheet" href="/css/base.css">
  <link rel="stylesheet" href="/css/resume.css">
  <link rel="stylesheet" href="/css/welcome.css">
  <title>${this.getAttribute('title') || 'Page'} - Alec Weiss</title>

  <!-- Global site tag (gtag.js) - Google Analytics -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-ZLPBPY7N53"></script>
  <script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-ZLPBPY7N53');
  </script>
  `
  }
});

customElements.define('theme-selector', class extends HTMLElement {
  constructor() {
    super();
    var input = document.createElement('input');
    input.type='checkbox';input.name='theme_check';input.id='theme_check';input.unchecked=true;
    input.addEventListener('change',
      ()=>{
        if(input.checked)
          {var theme='dark'}
          else{var theme='light'};
          set_theme(theme);
          document.querySelector('html').setAttribute('data-theme',theme);})
    this.appendChild(input)    
      }
    connectedCallback(){
      var theme=get_theme();
      if(theme=='dark'){this.querySelector('input').checked=true;}
      else{this.querySelector('input').checked=false;}
    }
  });

document.querySelector('body').style.display='block';
