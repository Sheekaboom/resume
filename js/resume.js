
// First import our data
import overview from '/data/overview.json' assert {type:"json"};
import education from '/data/education.json' assert {type: "json"};
import skills from '/data/skills.json' assert {type:"json"};
import experience from '/data/experience.json' assert {type:"json"};
import acheivements from '/data/acheivements.json' assert {type:"json"};

// now lets fill contact info, name, and objective
document.querySelector("#contact #location").innerText = overview['location'];
document.querySelector("#contact #email").innerText = overview['contact']['email'];
document.querySelector("#contact #phone").innerText = overview['contact']['phone'];
document.querySelector("#title #name").innerText = overview['name']['first']+' '+overview['name']['last']; // set the name
document.querySelector("#objective .data").innerText = overview['objective'];

// Fill Our Education (Lets do all of them)
var num_edu = 3;
var edu_div = document.querySelector("#education .data")
var edu_rev = education.reverse();
var edu_list = document.createElement('ul');
edu_div.appendChild(edu_list);
for(var i=0;i<num_edu;++i){
    var edu = edu_rev[i];
    //add an education template
    var child = document.createElement('li');
    // set type of degree
    var typediv = document.createElement('div');
    typediv.innerText = edu["degree_type"]+" | "+edu['degree'];
    // now set the school
    var schooldiv = document.createElement('div');
    schooldiv.innerText = edu['institution']+", "+edu['city']+", "+edu['state'];
    // now add it to the education list
    child.appendChild(typediv);
    child.appendChild(schooldiv);
    edu_list.appendChild(child);
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
var exp_div = document.querySelector("#experience .data");
var exp_list = document.createElement('ul');
exp_div.appendChild(exp_list);
for(var i=0;i<num_exp;++i){
    var exp = experience[i];
    var child = document.createElement('li');
    //set experience header (first div) to position title, employer, yearstart-yearend
    var head_div = document.createElement('div');
    child.appendChild(head_div);
    var start = new Date(Date.parse(exp['start'])); var stop = new Date(Date.parse(exp['stop']));
    head_div.innerText = exp['title']+", "+exp['employer']+" ("+start.getFullYear()+"-"+stop.getFullYear()+")"
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
