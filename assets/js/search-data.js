// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-about",
    title: "About",
    section: "Navigation",
    handler: () => {
      window.location.href = "/";
    },
  },{id: "nav-blog",
          title: "Blog",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/blog/";
          },
        },{id: "nav-publications",
          title: "Publications",
          description: "My publications in reversed chronological order.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/publications/";
          },
        },{id: "nav-research",
          title: "Research",
          description: "Research projects that I am working on.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/projects/";
          },
        },{id: "nav-code",
          title: "Code",
          description: "My coding activities.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/repositories/";
          },
        },{id: "nav-cv",
          title: "CV",
          description: "My CV",
          section: "Navigation",
          handler: () => {
            window.location.href = "/cv/";
          },
        },{id: "nav-teaching",
          title: "Teaching",
          description: "Courses that I teach.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/teaching/";
          },
        },{id: "nav-join",
          title: "Join",
          description: "Looking for talents!",
          section: "Navigation",
          handler: () => {
            window.location.href = "/join/";
          },
        },{id: "dropdown-publications",
              title: "Publications",
              description: "",
              section: "Dropdown",
              handler: () => {
                window.location.href = "/publications/";
              },
            },{id: "dropdown-projects",
              title: "Projects",
              description: "",
              section: "Dropdown",
              handler: () => {
                window.location.href = "/projects/";
              },
            },{id: "dropdown-blog",
              title: "Blog",
              description: "",
              section: "Dropdown",
              handler: () => {
                window.location.href = "/blog/";
              },
            },{id: "nav-people",
          title: "People",
          description: "Members of the group",
          section: "Navigation",
          handler: () => {
            window.location.href = "/people/";
          },
        },{id: "post-a-cheeky-way-to-do-unit-conversion",
        
          title: "A cheeky way to do unit conversion",
        
        description: "",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2025/cheeky-unit-conversion/";
          
        },
      },{id: "post-speeding-up-python-package-management-using-uv-chinese",
        
          title: "Speeding up Python package management using `uv` (Chinese)",
        
        description: "",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2025/using-uv/";
          
        },
      },{id: "post-a-post-with-plotly-js",
        
          title: "a post with plotly.js",
        
        description: "this is what included plotly.js code could look like",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2025/plotly/";
          
        },
      },{id: "post-a-post-with-image-galleries",
        
          title: "a post with image galleries",
        
        description: "this is what included image galleries could look like",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2024/photo-gallery/";
          
        },
      },{id: "post-ssh反向隧道使远程计算机连接互联网教程",
        
          title: "SSH反向隧道使远程计算机连接互联网教程",
        
        description: "",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2024/ssh-reverse-proxy-usage-chinese/";
          
        },
      },{id: "post-access-the-internet-for-good-on-login-nodes-behind-firewalls",
        
          title: "Access the internet (for good) on login nodes behind firewalls",
        
        description: "",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2022/internet-for-login-nodes/";
          
        },
      },{id: "post-enabling-data-compression-in-aiida-2-0",
        
          title: "enabling data compression in AiiDA 2.0",
        
        description: "",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2022/aiida-2.0-and-compression/";
          
        },
      },{id: "post-dft-parallelisation-rule-of-thumb",
        
          title: "DFT parallelisation rule of thumb",
        
        description: "",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2022/DFT-parallelisation-rule-of-thumb/";
          
        },
      },{id: "post-parallel-efficiencies-of-small-plane-wave-dft-calculations",
        
          title: "Parallel efficiencies of (small) plane wave DFT calculations",
        
        description: "",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2021/parallel-efficiency-of-pw-DFT/";
          
        },
      },{id: "post-hello-world",
        
          title: "Hello World!",
        
        description: "",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2021/hello-world/";
          
        },
      },{id: "books-the-godfather",
          title: 'The Godfather',
          description: "",
          section: "Books",handler: () => {
              window.location.href = "/books/the_godfather/";
            },},{id: "news-i-joined-school-of-aerospace-engineering-beijing-institute-of-technology",
          title: 'I joined School of Aerospace Engineering, Beijing Institute of Technology.',
          description: "",
          section: "News",},{id: "news-our-paper-discovery-of-multi-anion-antiperovskites-x6nfsn2-x-ca-sr-as-promising-thermoelectric-materials-by-computational-screening-has-been-published-in-the-journal-matter",
          title: 'Our paper Discovery of multi-anion antiperovskites X6NFSn2 (X = Ca, Sr) as promising...',
          description: "",
          section: "News",},{id: "news-our-software-package-easyunfold-has-been-published-in-the-journal-of-open-source-software",
          title: 'Our software package easyunfold has been published in the Journal of Open Source...',
          description: "",
          section: "News",},{id: "news-our-paper-structure-and-ionic-conduction-enhancement-mechanisms-at-ceo2-srtio3-heterointerfaces-has-been-published-in-applied-physics-reviews-as-featured-article",
          title: 'Our paper Structure and ionic conduction enhancement mechanisms at CeO2/SrTiO3 heterointerfaces has been...',
          description: "",
          section: "News",},{id: "news-we-are-hiring-recruiting-check-out-the-join-page-above-for-more-information",
          title: 'We are hiring/recruiting! Check out the Join page above for more information.',
          description: "",
          section: "News",},{id: "news-a-warm-welcome-to-our-new-members-xiaoxie-fengxiang-and-kuijun-tao",
          title: 'A warm welcome to our new members: Xiaoxie, Fengxiang and Kuijun Tao!',
          description: "",
          section: "News",},{id: "news-welcome-to-xu-cheng-who-just-joined-the-group-as-a-post-doc",
          title: 'Welcome to Xu Cheng who just joined the group as a post-doc!',
          description: "",
          section: "News",},{id: "news-zuolong-jia-has-been-abmitted-to-zhongguancun-academy-as-a-phd-student-fingers-cross-future-dr-jia-p",
          title: 'Zuolong Jia has been abmitted to Zhongguancun Academy as a PhD student! Fingers-cross...',
          description: "",
          section: "News",},{id: "news-welcome-to-our-new-member-lei-fu-phd-studnet-and-jie-zhou-master-s-student",
          title: 'Welcome to our new member Lei Fu (PhD studnet) and Jie Zhou (Master’s...',
          description: "",
          section: "News",},{id: "news-welcome-to-our-new-member-liu-yi-master-s-student",
          title: 'Welcome to our new member Liu Yi (Master’s student)!',
          description: "",
          section: "News",},{id: "projects-data-driven-materials-discovery",
          title: 'Data-driven materials discovery',
          description: "Locating needle from a haystack.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/1_materials_discovery/";
            },},{id: "projects-atomic-structure-at-interfaces",
          title: 'Atomic structure at Interfaces',
          description: "Understanding the origin of emergent properties.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/2_interfaces/";
            },},{id: "projects-software-and-methodology-development",
          title: 'Software and methodology development',
          description: "Making tools for computational materials science.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/3_development/";
            },},{
        id: 'social-email',
        title: 'email',
        section: 'Socials',
        handler: () => {
          window.open("mailto:%79%6F%75@%65%78%61%6D%70%6C%65.%63%6F%6D", "_blank");
        },
      },{
        id: 'social-inspire',
        title: 'Inspire HEP',
        section: 'Socials',
        handler: () => {
          window.open("https://inspirehep.net/authors/1010907", "_blank");
        },
      },{
        id: 'social-rss',
        title: 'RSS Feed',
        section: 'Socials',
        handler: () => {
          window.open("/feed.xml", "_blank");
        },
      },{
        id: 'social-scholar',
        title: 'Google Scholar',
        section: 'Socials',
        handler: () => {
          window.open("https://scholar.google.com/citations?user=qc6CJjYAAAAJ", "_blank");
        },
      },{
        id: 'social-custom_social',
        title: 'Custom_social',
        section: 'Socials',
        handler: () => {
          window.open("https://www.alberteinstein.com/", "_blank");
        },
      },{
      id: 'light-theme',
      title: 'Change theme to light',
      description: 'Change the theme of the site to Light',
      section: 'Theme',
      handler: () => {
        setThemeSetting("light");
      },
    },
    {
      id: 'dark-theme',
      title: 'Change theme to dark',
      description: 'Change the theme of the site to Dark',
      section: 'Theme',
      handler: () => {
        setThemeSetting("dark");
      },
    },
    {
      id: 'system-theme',
      title: 'Use system default theme',
      description: 'Change the theme of the site to System Default',
      section: 'Theme',
      handler: () => {
        setThemeSetting("system");
      },
    },];
