
export {HomePage,ResumePage,CVPage};

function CVPage(){
    return `
    <!-- Header (contact and top bar) -->
    <header>
        <resume-header></resume-header>
    </header>

    <!-- Main Content -->
    <main role="main">
        <resume-objective></resume-objective>
        <resume-education></resume-education>
        <resume-skills></resume-skills>
        <resume-work-experience></resume-work-experience>
        <resume-publications></resume-publications>
    </main>
    
    <footer></footer>`;
}

function ResumePage(){
    return `
    <!-- Header (contact and top bar) -->
    <header>
        <resume-header></resume-header>
    </header>
    <!-- Main Content -->
    <main role="main">
        <resume-objective></resume-objective>
        <resume-education count=3></resume-education>
        <resume-skills></resume-skills>
        <resume-work-experience count=4></resume-work-experience>
    </main>
    <footer></footer>`;
}

function HomePage(){
    return `
<!-- Header (contact and top bar) -->
<header>
    <h1 class='page_title'>Alec Weiss</h1>
</header>

<!-- Main Content -->
<main role="main">
    <div id=face_container>
        <picture id=my_face><img id=my_face src=/data/img/alec_headshot.jpg></picture>
    </div>
    
    <!-- links to all of my social media platforms -->
    <div id='my_social_buttons' >
        <link rel="stylesheet" href="/css/my_socials.css">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.14.0/css/all.min.css">
        <div class="share-box">
            <!-- Linkedin -->
            <a class="ln_share" href="https://www.linkedin.com/in/alec-weiss-bbb370113/" target='_blank'><i class="fab fa-linkedin fa-3x"></i></a>
            <!-- github -->
            <a class='gh_share' href="https://github.com/Sheekaboom" target='_blank'><i class="fab fa-github fa-3x"></i></a>
            <!-- Email -->
            <a class="em_share" href="mailto:spamsRus@weissworks.dev" target='_blank'><i class="fa fa-envelope fa-3x"></i></a>                          

        </div>
        <script>
            function setEmailHref(){
                // This is to require any bots to render javascript to get my email. not terribly hard, but an extra step for scrapers
                var email_list = ['al','ec','@','wei','ss','wor','ks','.','dev'];
                var email = email_list.reduce((a,b)=>a+b,'');
                document.querySelector('#my_social_buttons .em_share').setAttribute('href','mailto:'+email);
            }
            setEmailHref()
        </script>
    </div>

    <div id='page_links_div'>
        <template id='page_link_template'>
            <li class='page_link_item'>
                <a-local id=page_link href='/'>
                    <div class=description>
                    </div>
                </a>
            </li>
        </template>
        <ul class=page_links>
            <li class='page_link_item'>
                <a-local class=page_link href='/resume'>
                    <div class=description>
                        <div class=title>Resume</div>
                    </div>
                </a-local>
            </li>
            <li class='page_link_item'>
                <a-local class=page_link href='/cv'>
                    <div class=description>
                        <div class=title>Curriculum Vitae (CV)</div>
                    </div>
                </a-local>
            </li>
        </ul>
    </div>
    <ul></ul>
</main>

<footer></footer>
`;}