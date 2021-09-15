function set_theme(theme){
    document.querySelector('html').setAttribute('data-theme',theme);
    window.localStorage['data-theme'] = theme;
}
function get_default_color_scheme(){
    if(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches){return 'dark';}
    else{return 'light';}
};
function get_theme(){return window.localStorage['data-theme']||get_default_color_scheme();}
var theme = get_theme();
set_theme(theme);