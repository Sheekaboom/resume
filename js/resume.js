
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


