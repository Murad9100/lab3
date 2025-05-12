document.addEventListener('DOMContentLoaded', () => {
    // --- DATA ---
    const userData = {
        name: "MURAD <span class='highlight'>SƏFƏROV</span>",
        title: "STUDENT",
        contact: [
            { icon: "phone.png", text: "+994 50 611 51 32" },
            { icon: "email.png", text: "muradseferov7962@gmail.com" },
            { icon: "location.png", text: "Azerbaijan/Baku/YasamalDİİİ BRATTT 7 Cİ ALATAVA QVARDİYA BİNASIII" }
        ],
        socialMedia: [
            { icon: "instagram.png", text: "mr.safarov705" },
            { icon: "tik-tok.png", text: "mr.safarov" },
            { icon: "github.png", text: "Murad9100" }
        ],
        education: [
            { period: "2013 - 2024", school: "S.C. Pishevari Humanities Gymnasium" },
            { period: "2024 - 2025", school: "AzTU - Information Security" }
        ],
        skills: ["Problem Solving", "Time Management"],
        languages: ["Azerbaijani", "English", "Turkish", "Russian"],
        profile: "A highly motivated and results-oriented professional with over 5 years of experience in project management, data analysis, and software development. Proven ability to lead teams, develop innovative solutions, and deliver high-quality results under tight deadlines. With a strong foundation in technology and business, I am passionate about leveraging my skills to drive growth and efficiency within dynamic work environments.",
        workExperience: [
            {
                title: "Project Manager | XYZ Solutions",
                details: ["Led a cross-functional team of 12 members in the development of a cloud-based SaaS product, increasing operational efficiency by 30%"]
            },
            {
                title: "Data Analyst | ABC Analytics",
                details: ["Analyzed large data sets to identify trends and provide actionable insights for clients in the retail industry."]
            }
        ],
        reference: "Mr. John Smith, Senior Cybersecurity Analyst at TechSecure Inc., served as my direct supervisor during my six-month internship. Throughout this period, he closely observed my performance in various penetration testing tasks, network security analysis, and vulnerability assessments. Mr. Smith can attest to my technical proficiency, attention to detail, and ability to work both independently and as part of a team.",
        certifications: [
            {
                name: "Certified ScrumMaster",
                description: "This certification demonstrates my understanding of Agile principles and Scrum practices. I gained hands-on experience in leading Scrum teams, facilitating Sprint planning, and delivering iterative results. I am well-versed in using Scrum to improve team collaboration, increase project transparency, and ensure timely product delivery. The certification also enabled me to develop skills in coaching teams to implement Scrum efficiently and improve overall project management."
            },
            {
                name: "Google Analytics Certified",
                description: "This certification has equipped me with the knowledge and practical skills to analyze website and app data. I am proficient in using Google Analytics to track and interpret key performance metrics, such as user behavior, conversion rates, and traffic sources. The certification provided in-depth insights into leveraging data for digital marketing strategies, improving SEO efforts, and enhancing user engagement."
            }
        ],
        projects: [
            {
                name: "Cloud-based SaaS Product Development",
                description: "Led the project to develop a cloud-based SaaS product that streamlined internal workflows for clients, increasing productivity by 30%."
            },
            {
                name: "Automated Data Reporting System",
                description: "Developed a system using Python to automate monthly reporting processes for clients, reducing time spent on data collection and reporting by 50%."
            }
        ]
    };

    // --- ADD DATA TO PAGE ---
    document.getElementById('userName').innerHTML = userData.name;
    document.getElementById('userTitle').textContent = userData.title;

    const createList = (array, iconPath = "") => {
        return array.map(item => 
            `<p class="editable" contenteditable="false"><img src="photos/${iconPath}${item.icon || ''}" alt="" class="icon"> ${item.text}</p>`
        ).join('');
    };

    const createEducation = (array) => {
        return array.map(item => `<p><strong>${item.period}</strong><br>${item.school}</p>`).join('');
    };

    const createSkills = (array) => {
        return `<ul style="list-style-type: none;">${array.map(skill => `<li>${skill}</li>`).join('')}</ul>`;
    };

    const createWork = (array) => {
        return array.map(job => `
            <p><strong>${job.title}</strong></p>
            <ul style="list-style-type: none;">${job.details.map(d => `<li>${d}</li>`).join('')}</ul>
        `).join('');
    };

    const createCertifications = (array) => {
        return array.map(cert => `
            <p><strong>${cert.name}</strong></p>
            <p>${cert.description}</p>
        `).join('');
    };

    const createProjects = (array) => {
        return array.map(project => `
            <p><strong>${project.name}</strong></p>
            <p>${project.description}</p>
        `).join('');
    };

    document.getElementById('contactInfo').innerHTML = createList(userData.contact);
    document.getElementById('socialMedia').innerHTML = createList(userData.socialMedia);
    document.getElementById('educationInfo').innerHTML = createEducation(userData.education);
    document.getElementById('skillsInfo').innerHTML = createSkills(userData.skills);
    document.getElementById('languagesInfo').innerHTML = createSkills(userData.languages);
    document.getElementById('profileInfo').innerHTML = `<p>${userData.profile}</p>`;
    document.getElementById('workExperience').innerHTML = createWork(userData.workExperience);
    document.getElementById('referenceInfo').innerHTML = `<p>${userData.reference}</p>`;
    document.getElementById('certificationsInfo').innerHTML = createCertifications(userData.certifications);
    document.getElementById('projectsInfo').innerHTML = createProjects(userData.projects);

    // --- OLD FUNCTIONS (Edit, Save, Accordion, Zip) ---
    const editBtn = document.getElementById('editBtn');
    const accordionBtns = document.querySelectorAll('.accordion-btn');
    let isEditing = false;

    // Accordion open/close
    accordionBtns.forEach(button => {
        button.addEventListener('click', () => {
            const panel = button.nextElementSibling;
            if (panel.classList.contains('active')) {
                panel.style.maxHeight = null;
                panel.classList.remove('active');
            } else {
                panel.classList.add('active');
                panel.style.maxHeight = "300px";
            }
        });
    });

    // Toggle edit mode
    editBtn.addEventListener('click', () => {
        isEditing = !isEditing;
        editBtn.textContent = isEditing ? 'Save' : 'Edit';

        // Open Accordion panels
        accordionBtns.forEach(btn => {
            const panel = btn.nextElementSibling;
            panel.classList.add('active');
            panel.style.maxHeight = "300px";
        });

        // Activate all editable fields
        const editableElements = document.querySelectorAll('h1, h3, .accordion-panel p, .accordion-panel li, .accordion-panel .editable');
        editableElements.forEach(el => {
            el.setAttribute('contenteditable', isEditing);
        });

        // Save
        if (!isEditing) {
            downloadFiles();
        }
    });

    // Add a new line on Enter key
    const panels = document.querySelectorAll('.accordion-panel');
    panels.forEach(panel => {
        panel.addEventListener('keydown', e => {
            if (!isEditing) return;
            if (e.key === 'Enter') {
                e.preventDefault();
                document.execCommand('insertHTML', false, '<br><br>');
            }
        });
    });

    // Download the page as ZIP
    async function downloadFiles() {
        const zip = new JSZip();

        // Add HTML file
        const html = document.documentElement.outerHTML;
        zip.file("index.html", html);

        // Add CSS file
        const cssPath = Array.from(document.styleSheets).find(s => s.href && s.href.endsWith("style.css"))?.href;
        if (cssPath) {
            try {
                const response = await fetch(cssPath);
                const cssText = await response.text();
                zip.file("style.css", cssText);
            } catch (err) {
                console.warn("CSS dosyası alınamadı:", err);
            }
        }

        // Add script file
        const scriptPath = Array.from(document.scripts).find(s => s.src && s.src.endsWith("script.js"))?.src;
        if (scriptPath) {
            try {
                const response = await fetch(scriptPath);
                const scriptText = await response.text();
                zip.file("script.js", scriptText);
            } catch (err) {
                console.warn("Script dosyası alınamadı:", err);
            }
        }

        // Add photos
        const images = [...document.querySelectorAll("img")];
        for (let img of images) {
            const src = img.src;
            if (src.startsWith("blob:")) continue;
            try {
                const res = await fetch(src);
                const blob = await res.blob();
                const name = img.src.split("/").pop();
                zip.file(`photos/${name}`, blob);
            } catch (err) {
                console.warn("Resim yüklenemedi:", src);
            }
        }

        // Download ZIP
        zip.generateAsync({ type: "blob" }).then(content => {
            const a = document.createElement('a');
            a.href = URL.createObjectURL(content);
            a.download = 'cv.zip';
            a.click();
        });
    }
});
