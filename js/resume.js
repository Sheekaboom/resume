
// First import our data
import overview from '/data/overview.json' assert {type:"json"};
import education from '/data/education.json' assert {type: "json"};
import skills from '/data/skills.json' assert {type:"json"};
import experience from '/data/experience.json' assert {type:"json"};
import acheivements from '/data/acheivements.json' assert {type:"json"};

// now lets fill contact info, name, and objective
document.querySelector("#contact #address").innerText = overview['address'];
document.querySelector("#contact #email").innerText = overview['contact']['email'];
document.querySelector("#contact #phone").innerText = overview['contact']['phone'];
// set name
document.querySelector("#title #name #first").innerText = overview['name']['first'];
document.querySelector("#title #name #last").innerText = overview['name']['last']; 
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

// Fill experience (top 3)
var num_exp = 4;
var exp_list = document.querySelector("#experience .data ul");
//var exp_temp = document.querySelector("#experience .data #item")
for(var i=0;i<num_exp;++i){
    // get our data and our template
    var exp = experience[i];
    //var mynode = exp_temp.content.cloneNode(true);
    var child = document.createElement('li');
    //set experience header (first div) to position title, employer, yearstart-yearend
    var head_div = document.createElement('div');
    child.appendChild(head_div);
    var start = new Date(Date.parse(exp['start'])); var stop = new Date(Date.parse(exp['stop']));
    var headstr = exp['title']+", "+exp['employer']+" ("+start.getFullYear()+"-"+stop.getFullYear()+")"
    head_div.innerText = headstr;
    // now add comments
    var com_div = document.createElement('ul');
    child.appendChild(com_div)
    for(var c=0;c<exp['comments'].length;++c){
        var com = exp['comments'][c];
        var item = document.createElement('li');
        item.innerText = com;
        com_div.appendChild(item);
    }
    // now append it to the list
    exp_list.append(child);
}

// Acheivements (Don't add for now)
