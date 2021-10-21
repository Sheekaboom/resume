
// First import our data
import overview from '/data/overview.json' assert {type:"json"};
import education from '/data/education.json' assert {type: "json"};
import skills from '/data/skills.json' assert {type:"json"};
import experience from '/data/experience.json' assert {type:"json"};
import acheivements from '/data/acheivements.json' assert {type:"json"};

export default {get_text_resume}

console.log(get_text_resume())
/*
@brief return a formatted string for a plaintext resume
*/
function get_text_resume(){
    let selectors = ['resume-header','resume-objective','resume-skills','resume-education','resume-work-experience','resume-publications'];
    let nodes = selectors.map((s)=>{return document.querySelector(s)})
    let textVals = nodes.filter(Boolean).map((s)=>{return s.asText()})
    return textVals.join('\n\n');
}

customElements.define('save-as-text', class extends HTMLElement {
    dllink;
    constructor() {
        super();
        // start by adding default html and attributes
        let text_resume = get_text_resume();
        this.dllink = document.createElement('a');
        this.appendChild(this.dllink)
        this.dllink.innerText = 'Save as Text';
        this.dllink.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text_resume));
        this.dllink.setAttribute('download', 'weiss_resume.txt');
    } 
});



