
// First import our data
import overview from '/data/overview.json' assert {type:"json"};
import education from '/data/education.json' assert {type: "json"};
import skills from '/data/skills.json' assert {type:"json"};
import experience from '/data/experience.json' assert {type:"json"};
import acheivements from '/data/acheivements.json' assert {type:"json"};

// now lets fill contact info, name, and objective
document.querySelector("#contact #location") = overview['contact']['location'];
document.querySelector("#contact #email") = overview['contact']['email'];
document.querySelector("#contact #phone") = overview['contact']['phone'];
document.querySelector("#title #name").innerText = overview['name']['first']+' '+overview['name']['last']; // set the name
