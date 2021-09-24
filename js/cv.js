
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

//------------------------------------------
//NOTE THIS SHOULD LIKELY BE MADE MORE MODULAR. JUST COPIED FROM REASUME FOR NOW
//------------------------------------------
// First import our data
import overview from '/data/overview.json' assert {type:"json"};
import education from '/data/education.json' assert {type: "json"};
import skills from '/data/skills.json' assert {type:"json"};
import experience from '/data/experience.json' assert {type:"json"};
import acheivements from '/data/acheivements.json' assert {type:"json"};

// now lets fill contact info, name, and objective
document.querySelector(".contact .address").innerText = overview['address'];
document.querySelector(".contact .email").innerText = overview['contact']['email'];
document.querySelector(".contact .phone").innerText = overview['contact']['phone'];
document.querySelector(".contact .website").innerText = overview['website'];
// set name
document.querySelector(".name .first").innerText = overview['name']['first'];
document.querySelector(".name .last").innerText = overview['name']['last']; 
// set objective statement
document.querySelector("#objective .data").innerText = overview['objective'];

// Fill Our Education (Lets do all of them)
var num_edu = 3;
var edu_list = document.querySelector("#education .data ul");
var edu_rev = education.reverse();
var edu_temp = document.querySelector('#education .data #item');
for(var i=0;i<num_edu;++i){
    //copy the template and get our data
    var mynode = edu_temp.content.cloneNode(true);
    var edu = edu_rev[i];
    // set the data
    var data_vals = Array.from(mynode.children[0].children).map((x)=>x.id) // get the ids
    // now try and set the values
    for (var key of data_vals){ mynode.querySelector("#"+key).innerText = edu[key] || key}
    // and append
    edu_list.appendChild(mynode);
}

// Fill our skills (all of them again)
var skill_div = document.querySelector("#skills .data");
var skill_list = document.createElement('ul');
skill_div.appendChild(skill_list);
for(var i=0;i<skills.length;++i){
    var skill = skills[i];
    var child = document.createElement('li');
    child.innerText = skill;
    skill_list.append(child);
}

// Fill experience (all)
var num_exp = experience.length;
var exp_list = document.querySelector("#experience .data ul");
//var edu_rev = education.reverse();
var exp_temp = document.querySelector('#experience .data #item');
//var exp_temp = document.querySelector("#experience .data #item")
for(var i=0;i<num_exp;++i){
    // get our data and our template
    var mynode = exp_temp.content.cloneNode(true);
    var exp = experience[i];
    // some preprocessing
    var start = new Date(Date.parse(exp['start'])); var stop = new Date(Date.parse(exp['stop']));
    exp['start'] = start.getMonth()+'/'+start.getFullYear(); exp['stop'] = stop.getMonth()+'/'+stop.getFullYear();
    // set the data
    var data_vals = Array.from(mynode.children[0].children).map((x)=>x.id) // get the ids
    // now try and set the values
    for (var key of data_vals){ mynode.querySelector("#"+key).innerText = exp[key] || key}
    // now add comments
    var com_list = document.createElement('ul');
    mynode.querySelector('#comments').innerText = ''; //clear any text
    mynode.querySelector('#comments').appendChild(com_list)
    for(var c=0;c<exp['comments'].length;++c){
        var com = exp['comments'][c];
        var item = document.createElement('li');
        item.innerText = com;
        com_list.appendChild(item);
    }
    // and append
    exp_list.appendChild(mynode);
}

// Acheivements (Don't add for now)


