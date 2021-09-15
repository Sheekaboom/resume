
// First import our data
import publications from '/data/publications.json' assert {type:"json"};

// Publications (for CV only)
var Cite = require('citation-js');
var pub_list = document.querySelector('#publications .data #publication_list');
var pub_temp = document.querySelector('#publications .data #item');
for(var i=0;i<publications.length;++i){
    let pub=publications[i];
    let mynode = pub_temp.content.cloneNode(true);
    let cite = Cite(pub).format('bibliography', {
        format: 'html',
        template: 'apa',
        lang: 'en-US'
      });
    mynode.querySelector('li').innerHTML = cite;
    pub_list.appendChild(mynode);
}

