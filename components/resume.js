// webcomponents for resume things
// load in json data
import overview from '/data/overview.json' assert {type:"json"};
import education from '/data/education.json' assert {type: "json"};
import experience from '/data/experience.json' assert {type:"json"};
import skills from '/data/skills.json' assert {type:"json"};
import publications from '/data/publications.json' assert {type:"json"};

//some useful formatting functions
// some useful lambda functions
var format_section_head = (title)=> title.toUpperCase()+'\n'+'#'.repeat(25)+'\n';
var format_list = (list,level=1)=> list.map((v)=>' '.repeat(2*level)+'  - '+v).join('\n')
var format_enum = (list,level=1,start=0)=> list.map((v,i)=>' '.repeat(2*level)+`  ${i+start}. `+v).join('\n')
var format_date = (date)=> {
    var date = new Date(Date.parse(date));
    return date.getMonth()+1+'/'+date.getFullYear()
}

// element for header
customElements.define('resume-header', class extends HTMLElement {
    constructor() {
      super();
      // start by adding default html and attributes
      this.id = 'resume-header'
      let shadow = this;//.attachShadow({mode:'open'})
      shadow.innerHTML = `
        <style>
        .contact .email,.phone{display:inline;}
        .contact .email::after{content:" | ";}
        .name .first,.last{display:inline;} 
        .name .first::after{content:" ";}
        header #title{
            text-align:left;
            font-size:16pt;
            background:var(--accent-color);
            color:var(--text-color);
            padding:5px 10px;
            margin:5px 0px;
            text-transform: uppercase;
        }
        </style>
        <div>
            <div role=contact class=contact>
                <div role=address class=address>${overview['address']}</div>
                <div role=email class=email>${overview['contact']['email']}</div>
                <div role=phone class=phone>${overview['contact']['phone']}</div>
                <div role=website class=website>${overview['website']}</div>
            </div>
        </div>
        <div id=title>
            <div role=name class=name>
                <div class=first>${overview['name']['first']}</div>
                <div class=last>${overview['name']['last']}</div>
            </div>
        </div>`;
    }
    asText(){
        let sep = '\n\n'
        var capFirst = (str)=>{return str[0].toUpperCase()+str.slice(1).toLowerCase()}
        let intro = (capFirst(this.querySelector('.name .first').innerText)+' '+capFirst(this.querySelector('.name .last').innerText)+sep+
            this.querySelector('.address').innerText+sep+this.querySelector('.email').innerText+sep+this.querySelector('.phone').innerText+sep+
            this.querySelector('.website').innerText)
        return intro
    }
  }
);

// generic class for section
class ResumeSection extends HTMLElement{
    constructor(){super()}
    asText(){//get the section as a string
    let title = this.titleAsText();
    let data = this.dataAsText();
    return title+data+'\n';
    }
    titleAsText(){return format_section_head(this.querySelector('.title').innerText.toUpperCase())}
    dataAsText(){return this.querySelector('.data').innerText}
}

// element for education
customElements.define('resume-education', class extends ResumeSection {
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
    dataAsText(){
        var format_edu_item = (item)=>{return [
            `${item.querySelector('.degree_type').innerText}, ${item.querySelector('.degree').innerText}`,
            `${item.querySelector('.institution').innerText}, ${item.querySelector('.city').innerText}`, 
            `${item.querySelector('.state').innerText}`, 
            `${item.querySelector('.stop').innerText}`].join(', ')}
        return format_list(Array.from(this.querySelector('.data ul').children).map(format_edu_item),0);
    }
});

customElements.define('resume-work-experience', class extends ResumeSection {
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
                    <div class='start_formatted start'></div><div class='stop_formatted stop'></div>
                    <div class=city></div><div class=state></div><div class=country></div>
                    <div class=comments></div>
                </li>
            </template>
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
            val['start_formatted'] = format_date(val['start']); val['stop_formatted'] = format_date(val['stop']);
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
    dataAsText(){
        var exp_list = this.querySelector('.data ul');
        var format_experience_comment = (comments)=>{return format_list(Array.from(comments.querySelector('ul').children).map(v=>v.innerText),1)}
        var format_experience = (exp)=>{
            var exptitle = [exp.querySelector('.position').innerText,exp.querySelector('.employer').innerText,
                    exp.querySelector('.city').innerText,exp.querySelector('.state').innerText,
                    `${exp.querySelector('.start').innerText}-${exp.querySelector('.stop').innerText}`].join(', ');
            return exptitle+'\n'+format_experience_comment(exp.querySelector('.comments'))
        }
        return format_list(Array.from(exp_list.children).map(format_experience),0)
    }
});

customElements.define('resume-skills', class extends ResumeSection {
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

customElements.define('resume-objective', class extends ResumeSection {
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
        <div class=data>${overview['objective']}</div>`;
    }
});

customElements.define('resume-publications', class extends ResumeSection {
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
    dataAsText(){
        return format_enum(Array.from(this.querySelector('.data .publication_list').children).map(v=>v.innerText),0,1);
    }
});