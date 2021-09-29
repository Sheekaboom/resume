// webcomponents for resume things
// load in json data
import overview from '/data/overview.json' assert {type:"json"};
import education from '/data/education.json' assert {type: "json"};
import experience from '/data/experience.json' assert {type:"json"};
import skills from '/data/skills.json' assert {type:"json"};
import publications from '/data/publications.json' assert {type:"json"};

// element for education
customElements.define('resume-education', class extends HTMLElement {
    constructor() {
      super();
      // start by adding default html and attributes
      this.classList.add('section');
      this.id = 'education'
      let shadow = this;//.attachShadow({mode:'open'})
      shadow.innerHTML = `
        <style>
            #${this.id} .degree_type,#${this.id} .degree{display:inline;font-variant: none;}/*text-transform: uppercase;}*/
            #${this.id} .degree_type::after{content:" | ";} #${this.id} .degree::after{content:"";display:block;}
            #${this.id} .institution{display:inline;} #${this.id} .institution::after{content:", "}
            #${this.id} .city,#${this.id} .state,#${this.id} .country{display:inline; } #${this.id} .city::after,.state::after{content:", "}
            #${this.id} .stop,#${this.id} .gpa{display:none;}
        </style>
        <div class=title>Education</div>
        <div class=data>
            <template class=education>
                <li>
                    <div class=degree_type></div><div class=degree></div><div class=institution></div>
                    <div class=city></div><div class=state></div><div class=country></div>
                    <div class=stop></div><div class=gpa></div>
                </li>
            </template>
        </div>`;
      let data = education.reverse();
      let mylist = document.createElement('ul');
      shadow.querySelector('.data').append(mylist);
      let count = this.getAttribute('count') || data.length;
      let temp = shadow.querySelector('template');
      for(let i=0;i<count;++i){
          //copy the template and get our data
          var mynode = temp.content.cloneNode(true);
          var val = data[i];
          // set the data
          var data_vals = Array.from(mynode.children[0].children).map((x)=>x.classList[0]) // get the ids
          // now try and set the values
          for (var key of data_vals){ mynode.querySelector("."+key).innerText = val[key] || key}
          // and append
          mylist.appendChild(mynode);
      }
    }
});

customElements.define('resume-work-experience', class extends HTMLElement {
    constructor() {
      super();
      // start by adding default html and attributes
      this.classList.add('section');
      this.id = 'experience';
      this.innerHTML = `
        <style>
            #${this.id} .position,.employer{display:inline;}
            #${this.id} .position::after{content:", ";}
            #${this.id} .start,#${this.id} .stop{display:inline;}
            #${this.id} .start::before{content:" (";display:inline;}
            #${this.id} .start::after{content:" -";}
            #${this.id} .stop::after{content:")";}
            #${this.id} .city,#${this.id} .state,#${this.id} .country{display:none;}
        </style>
        <div class=title>Experience</div>
        <div class=data>
            <template id=item class=experience>
                <li>
                    <div class=position></div><div class=employer></div>
                    <div class=start></div><div class=stop></div>
                    <div class=city></div><div class=state></div><div class=country></div>
                    <div class=comments></div>
                </li>
            </template>
            <ul></ul>
        </div>`;
        let data = experience;
        let mylist = document.createElement('ul');
        this.querySelector('.data').append(mylist);
        let count = this.getAttribute('count') || data.length;
        let temp = this.querySelector('template');
        //var exp_temp = document.querySelector("#experience .data #item")
        for(let i=0;i<count;++i){
            // get our data and our template
            var mynode = temp.content.cloneNode(true);
            var val = data[i];
            // some preprocessing
            var start = new Date(Date.parse(val['start'])); var stop = new Date(Date.parse(val['stop']));
            val['start'] = start.getMonth()+'/'+start.getFullYear(); val['stop'] = stop.getMonth()+'/'+stop.getFullYear();
            // set the data
            var data_vals = Array.from(mynode.children[0].children).map((x)=>x.classList[0]) // get the ids
            // now try and set the values
            for (var key of data_vals){ mynode.querySelector("."+key).innerText = val[key] || key}
            // now add comments
            var com_list = document.createElement('ul');
            mynode.querySelector('.comments').innerText = ''; //clear any text
            mynode.querySelector('.comments').appendChild(com_list)
            for(var c=0;c<val['comments'].length;++c){
                var com = val['comments'][c];
                var item = document.createElement('li');
                item.innerText = com;
                com_list.appendChild(item);
            }
            mylist.appendChild(mynode);
        }
    }
});

customElements.define('resume-skills', class extends HTMLElement {
    constructor() {
      super();
      // start by adding default html and attributes
      this.classList.add('section');
      this.id = 'skills';
      this.innerHTML = `
        <style>
            #${this.id} li{font-weight: normal;}
        </style>
        <div class=title>Skills</div>
        <div class=data></div>`;
        let data = skills
        let count = this.getAttribute('count') || data.length;
        var mylist = document.createElement('ul');
        this.querySelector('.data').appendChild(mylist);
        for(var i=0;i<count;++i){
            var val = data[i];
            var child = document.createElement('li');
            child.innerText = val;
            mylist.append(child);
        }
    }
});

customElements.define('resume-objective', class extends HTMLElement {
    constructor() {
      super();
      // start by adding default html and attributes
      this.classList.add('section');
      this.id = 'skills';
      this.innerHTML = `
        <style>
            #${this.id} li{font-weight: normal;}
        </style>
        <div class=title>Objective</div>
        <div class=data></div>`;
        this.querySelector(".data").innerText = overview['objective'];
    }
});

customElements.define('resume-publications', class extends HTMLElement {
    constructor() {
      super();
      // start by adding default html and attributes
      this.classList.add('section');
      this.id = 'publications';
      this.innerHTML = `
        <style>
            #${this.id} .publication_list{padding-left:10px;list-style: none;counter-reset: mycounter;}
            #${this.id} .publication_list < li{counter-increment:mycounter;}
            #${this.id} .publication_list li{padding:5px;position:relative;}
            #${this.id} .publication_list .pub_item div{display:inline;}
            #${this.id} li::before{
                content: "[" counter(mycounter) "] ";
                counter-increment:mycounter;
                font-weight: bold;
                position:absolute;
                --size: 10px;
                left: calc(-1 * var(--size) - 10px);
            }
        </style>
        <div class=title>Publications</div>
        <div class=data>
            <template id=item class=publication>
                <li class=pub_item></li>
            </template>
            <ol class=publication_list></ol>
        </div>`;

        // Publications (for CV only)
        var Cite = window.require('citation-js');
        var mylist = this.querySelector('.publication_list');
        var temp = this.querySelector('template');
        for(var i=0;i<publications.length;++i){
            let pub=publications[i];
            let mynode = temp.content.cloneNode(true);
            let cite = Cite(pub).format('bibliography', {
                format: 'html',
                template: 'apa',
                lang: 'en-US'
              });
            mynode.querySelector('li').innerHTML = cite;
            mylist.appendChild(mynode);
        }
    }
});