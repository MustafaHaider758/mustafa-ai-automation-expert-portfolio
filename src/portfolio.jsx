import React, { useState, useEffect } from 'react';
import { Github, Mail, ExternalLink, ChevronRight, Code2, Workflow, Database, Terminal, Cpu, Globe, MessageCircle } from 'lucide-react';

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'expertise', 'work', 'projects', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const projects = [
    {
      title: "Dynamic Record Management",
      tech: "Make.com + Airtable + API",
      description: "End-to-end automation for record management with dynamic data synchronization",
      impact: "Reduced manual data entry by 80%"
    },
    {
      title: "AI Presentation Generator",
      tech: "n8n + OpenAI",
      description: "Automated presentation creation using AI-powered content generation workflows",
      impact: "Generated 100+ presentations automatically"
    },
    {
      title: "Social Media Automation",
      tech: "n8n + OpenAI + Supabase",
      description: "Intelligent content scheduling and generation system with database integration",
      impact: "Scheduled 500+ posts with AI assistance"
    }
  ];

  const workHistory = [
    {
      role: "AI Automation Specialist",
      company: "DEVROLIN",
      period: "Jun 2025 - Present",
      achievements: [
        "Designed AI-powered automation workflows using n8n, Zapier, and Make.com",
        "Built RAG-based AI pipelines and NLP chatbots with Python and LangChain",
        "Reduced manual workload by 50-70% for clients through smart automation"
      ]
    },
    {
      role: "Technical Writer",
      company: "EssayShark",
      period: "Mar 2022 - Present",
      achievements: [
        "Delivered technical content across AI, data science, and automation topics",
        "Maintained high-quality standards with consistent deadline adherence"
      ]
    },
    {
      role: "Web Developer",
      company: "Freelance",
      period: "Feb 2021 - Present",
      achievements: [
        "Built full-stack applications using MERN stack",
        "Integrated automation and AI modules into web applications"
      ]
    }
  ];

  const skills = {
    automation: ["n8n", "Make.com", "Zapier", "Automated Workflows", "API Integration"],
    ai: ["OpenAI API", "ChatGPT", "LangChain", "RAG Pipelines", "NLP Chatbots"],
    crm: ["GoHighLevel", "HubSpot", "Pipedrive", "Zoho", "Salesforce"],
    development: ["Python", "JavaScript", "React", "Node.js", "MongoDB"],
    data: ["Airtable", "Google Sheets", "Notion", "PostgreSQL", "Data Pipelines"]
  };

  const stats = [
    { label: "Client Projects", value: "15+", suffix: "" },
    { label: "Hours Saved", value: "500", suffix: "+" },
    { label: "Workflows Built", value: "40", suffix: "+" },
    { label: "Job Success", value: "90", suffix: "%" }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-700 selection:bg-emerald-500/30 selection:text-emerald-900">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
        
        * {
          scroll-behavior: smooth;
        }

        body {
          font-family: 'Outfit', sans-serif;
          background-color: #f8fafc;
        }

        .mono {
          font-family: 'JetBrains Mono', monospace;
        }

        .glass {
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(226, 232, 240, 0.8);
          box-shadow: 0 4px 20px -2px rgba(0, 0, 0, 0.05);
        }

        .glass:hover {
          background: rgba(255, 255, 255, 0.9);
          border-color: rgba(16, 185, 129, 0.3);
          box-shadow: 0 10px 30px -5px rgba(16, 185, 129, 0.1);
        }

        .gradient-text {
          background: linear-gradient(135deg, #059669 0%, #34d399 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .gradient-bg {
          background: linear-gradient(135deg, #059669 0%, #34d399 100%);
        }

        .grid-pattern {
          background-image: linear-gradient(rgba(0, 0, 0, 0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0, 0, 0, 0.03) 1px, transparent 1px);
          background-size: 50px 50px;
        }
        
        .glow {
          box-shadow: 0 0 30px rgba(16, 185, 129, 0.2);
        }
      `}</style>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-4 flex justify-between items-center">
          <div className="mono text-xl font-bold tracking-tight text-slate-800">Mustafa<span className="text-emerald-500">.Haider</span></div>
          <div className="hidden md:flex gap-8 items-center bg-white/50 px-8 py-3 rounded-full border border-slate-200/50 backdrop-blur-md">
            {['About', 'Expertise', 'Work', 'Projects', 'Contact'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className={`text-sm tracking-wide transition-all duration-300 ${activeSection === item.toLowerCase()
                  ? 'text-emerald-600 font-semibold'
                  : 'text-slate-500 hover:text-slate-900'
                  }`}
              >
                {item}
              </a>
            ))}
          </div>
          <a
            href="#contact"
            className="md:hidden px-4 py-2 bg-emerald-50 text-emerald-600 border border-emerald-200 rounded-md text-sm font-medium hover:bg-emerald-100 transition-colors"
          >
            Menu
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20 grid-pattern">
        {/* Abstract Glow Effects */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-100/40 rounded-full blur-[100px] -z-10"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-100/40 rounded-full blur-[100px] -z-10"></div>

        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="space-y-8 order-2 lg:order-1 relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 mono text-xs tracking-wider font-medium shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              AVAILABLE FOR NEW PROJECTS
            </div>

            <div className="space-y-4">
              <h1 className="text-5xl lg:text-7xl font-bold tracking-tight text-slate-900 leading-[1.1]">
                Automating the <br />
                <span className="gradient-text">Future of Work</span>
              </h1>
              <p className="text-lg lg:text-xl text-slate-500 max-w-lg leading-relaxed font-light">
                I build intelligent automation systems that eliminate manual work, scale operations, and integrate AI into your business DNA.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <a
                href="#contact"
                className="px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-lg transition-all duration-300 hover:shadow-[0_10px_20px_-10px_rgba(16,185,129,0.5)] flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20"
              >
                Let's Collaborate <ChevronRight size={18} />
              </a>
              <a
                href="#work"
                className="px-8 py-4 glass text-slate-700 font-medium rounded-lg hover:bg-white transition-all duration-300 flex items-center justify-center gap-2"
              >
                View Work <ExternalLink size={18} />
              </a>
            </div>

            <div className="flex gap-6 pt-8 border-t border-slate-200 mt-8">
              <a href="https://github.com/MustafaHaider758" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-slate-900 transition-colors transform hover:scale-110">
                <Github size={24} />
              </a>
              <a href="mailto:mustafahaider758@gmail.com" className="text-slate-400 hover:text-slate-900 transition-colors transform hover:scale-110">
                <Mail size={24} />
              </a>
              <a href="https://www.linkedin.com/in/mustafa-haider-034152176/" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-slate-900 transition-colors transform hover:scale-110">
                <Globe size={24} />
              </a>
            </div>
          </div>

          <div className="order-1 lg:order-2 flex justify-center lg:justify-end relative">
            <div className="relative w-72 h-72 sm:w-96 sm:h-96 lg:w-[500px] lg:h-[500px]">
              {/* Decorative elements behind image */}
              <div className="absolute inset-0 border-2 border-emerald-500/10 rounded-full animate-[spin_10s_linear_infinite]"></div>
              <div className="absolute inset-4 border border-slate-200 rounded-full animate-[spin_15s_linear_infinite_reverse]"></div>

              {/* Image Container */}
              <div className="absolute inset-8 rounded-full overflow-hidden border-[6px] border-white glow p-1 bg-white shadow-2xl shadow-slate-200">
                <div className="w-full h-full rounded-full overflow-hidden relative">
                  <img
                    src="/image.jpeg"
                    alt="Mustafa Haider"
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/10 to-transparent mix-blend-overlay"></div>
                </div>
              </div>

              {/* Floating badges */}
              <div className="absolute top-10 -right-4 glass p-4 rounded-xl flex items-center gap-3 animate-bounce shadow-lg border-l-4 border-l-emerald-500 bg-white/90">
                <div className="p-2 rounded-lg bg-emerald-100 text-emerald-600">
                  <Terminal size={20} />
                </div>
                <div>
                  <div className="text-xs text-slate-500">Stack</div>
                  <div className="font-bold text-slate-900">Full Python</div>
                </div>
              </div>

              <div className="absolute bottom-20 -left-8 glass p-4 rounded-xl flex items-center gap-3 animate-pulse shadow-lg border-l-4 border-l-blue-500 bg-white/90">
                <div className="p-2 rounded-lg bg-blue-100 text-blue-600">
                  <Cpu size={20} />
                </div>
                <div>
                  <div className="text-xs text-slate-500">Focus</div>
                  <div className="font-bold text-slate-900">AI Agents</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-10 border-y border-slate-200 bg-white/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center group cursor-default">
              <div className="text-3xl lg:text-4xl font-bold text-slate-800 mb-1 group-hover:text-emerald-600 transition-colors">
                {stat.value}<span className="text-emerald-500">{stat.suffix}</span>
              </div>
              <div className="mono text-xs text-slate-500 uppercase tracking-widest font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-6 lg:px-12 relative bg-slate-50">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-4 mb-16">
            <span className="w-12 h-[2px] bg-emerald-500"></span>
            <span className="mono text-emerald-600 uppercase tracking-widest text-sm font-bold">About Me</span>
          </div>

          <div className="grid lg:grid-cols-5 gap-16">
            <div className="lg:col-span-3 space-y-8">
              <h2 className="text-3xl lg:text-4xl font-semibold text-slate-900 leading-tight">
                Architecting efficiency through <span className="text-emerald-500">intelligent code</span>.
              </h2>
              <div className="space-y-6 text-lg text-slate-600 leading-relaxed font-light">
                <p>
                  I am an automation specialist with <span className="text-slate-900 font-medium">2+ years of experience</span> crafting bespoke AI solutions for forward-thinking agencies and B2B companies.
                </p>
                <p>
                  My expertise lies in bridging the gap between complex business requirements and cutting-edge technology. I design end-to-end workflows using <span className="text-slate-900 font-medium">n8n, Make, and OpenAI</span> to operationalize growth and reduce overhead.
                </p>
                <p>
                  With a solid foundation in Computer Science from COMSATS, I bring engineering rigor to no-code/low-code development, ensuring robust and scalable solutions.
                </p>
              </div>

              <div className="pt-4">
                <a href="https://drive.google.com/file/d/1EaTVSZH0VzwwGEE1ONYfHWAyybcG1-31/view?usp=sharing" className="text-emerald-600 border-b-2 border-emerald-400/30 pb-1 hover:border-emerald-500 hover:text-emerald-700 transition-all inline-flex items-center gap-2 font-medium">
                  Download Resume <ExternalLink size={14} />
                </a>
              </div>
            </div>

            <div className="lg:col-span-2 space-y-6">
              <div className="glass p-8 rounded-2xl relative overflow-hidden group bg-white">
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                  <Workflow size={100} className="text-emerald-900" />
                </div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 rounded-lg bg-emerald-100/50 text-emerald-600">
                    <Workflow size={24} />
                  </div>
                  <h3 className="font-semibold text-slate-900">Impact Driven</h3>
                </div>
                <ul className="space-y-3 text-slate-600 text-sm">
                  <li className="flex items-start gap-3"><span className="text-emerald-500 mt-1 font-bold">▹</span> 15-25 hrs saved/week per client</li>
                  <li className="flex items-start gap-3"><span className="text-emerald-500 mt-1 font-bold">▹</span> 70% faster lead response time</li>
                  <li className="flex items-start gap-3"><span className="text-emerald-500 mt-1 font-bold">▹</span> Zero-touch data entry systems</li>
                </ul>
              </div>

              <div className="glass p-8 rounded-2xl relative overflow-hidden group bg-white">
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                  <Globe size={100} className="text-blue-900" />
                </div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 rounded-lg bg-blue-100/50 text-blue-600">
                    <Globe size={24} />
                  </div>
                  <h3 className="font-semibold text-slate-900">Global Reach</h3>
                </div>
                <div className="text-slate-600 text-sm">
                  Based in Pakistan, delivering world-class automations to clients across the US, UK, and Europe.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Expertise Section */}
      <section id="expertise" className="py-24 px-6 lg:px-12 bg-slate-100/50">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-16">
            <span className="w-12 h-[2px] bg-emerald-500"></span>
            <span className="mono text-emerald-600 uppercase tracking-widest text-sm font-bold">Tech Stack</span>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {Object.entries(skills).map(([category, items], idx) => (
              <div
                key={category}
                className="glass p-8 rounded-2xl hover:-translate-y-2 transition-transform duration-500 bg-white"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                    {category === 'automation' && <Workflow size={24} />}
                    {category === 'ai' && <Cpu size={24} />}
                    {category === 'crm' && <Database size={24} />}
                    {category === 'development' && <Code2 size={24} />}
                    {category === 'data' && <Terminal size={24} />}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 capitalize">{category}</h3>
                </div>

                <div className="flex flex-wrap gap-2">
                  {items.map((skill, skillIdx) => (
                    <span
                      key={skillIdx}
                      className="px-3 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-600 border border-slate-200 hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700 transition-colors cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 px-6 lg:px-12 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-16">
            <div className="flex items-center gap-4">
              <span className="w-12 h-[2px] bg-emerald-500"></span>
              <span className="mono text-emerald-600 uppercase tracking-widest text-sm font-bold">Selected Works</span>
            </div>
            <a href="https://www.upwork.com/freelancers/mustafah56" className="hidden sm:flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors font-medium">
              View All <ChevronRight size={16} />
            </a>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {projects.map((project, idx) => (
              <div
                key={idx}
                className="group glass rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-500 bg-white"
              >
                <div className="h-2 bg-gradient-to-r from-emerald-400 to-emerald-600 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                <div className="p-8">
                  <div className="mono text-xs text-emerald-600 mb-4 bg-emerald-50 inline-block px-3 py-1 rounded-full font-medium border border-emerald-100">{project.tech}</div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-emerald-600 transition-colors">{project.title}</h3>
                  <p className="text-slate-500 mb-6 leading-relaxed text-sm">{project.description}</p>
                  <div className="pt-6 border-t border-slate-100 flex items-start gap-3">
                    <div className="mt-1 text-emerald-500"><Terminal size={16} /></div>
                    <div className="text-sm text-slate-600 font-medium">{project.impact}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="work" className="py-24 px-6 lg:px-12 bg-slate-100/50">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-16">
            <span className="w-12 h-[2px] bg-emerald-500"></span>
            <span className="mono text-emerald-600 uppercase tracking-widest text-sm font-bold">Experience</span>
          </div>

          <div className="space-y-8">
            {workHistory.map((job, idx) => (
              <div key={idx} className="glass p-8 rounded-2xl transition-all hover:bg-white bg-white/60">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-2">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">{job.role}</h3>
                    <div className="text-emerald-600 font-medium">{job.company}</div>
                  </div>
                  <div className="mono text-xs text-slate-500 bg-slate-100 px-3 py-1 rounded-full w-fit border border-slate-200">{job.period}</div>
                </div>
                <ul className="space-y-3">
                  {job.achievements.map((achievement, achIdx) => (
                    <li key={achIdx} className="flex gap-3 text-slate-600 text-sm">
                      <ChevronRight size={16} className="text-emerald-500 flex-shrink-0 mt-1" />
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-6 lg:px-12 relative overflow-hidden bg-white">
        <div className="absolute inset-0 bg-emerald-50/50 radial-gradient"></div>

        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <div className="mono text-emerald-600 mb-6 font-medium bg-emerald-50 inline-block px-4 py-1 rounded-full border border-emerald-100">Looking for a solution?</div>

          <h2 className="text-5xl lg:text-7xl font-bold text-slate-900 mb-8 tracking-tight">
            Let's build something <br /><span className="gradient-text">extraordinary</span>.
          </h2>

          <p className="text-xl text-slate-500 max-w-2xl mx-auto mb-16 font-light">
            Ready to streamline your operations? Connect with me directly through Email or WhatsApp.
          </p>

          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <a href="mailto:mustafahaider758@gmail.com" className="group glass p-8 rounded-2xl hover:-translate-y-2 transition-transform duration-300 bg-white flex flex-col items-center justify-center gap-6 border-2 border-transparent hover:border-emerald-100">
              <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 group-hover:scale-110 transition-transform duration-300">
                <Mail size={32} />
              </div>
              <div className="text-center">
                <div className="text-sm font-medium text-slate-400 mb-1 uppercase tracking-wider">Email Me</div>
                <div className="text-lg font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">mustafahaider758@gmail.com</div>
              </div>
              <span className="text-emerald-600 font-medium text-sm flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                Send Email <ChevronRight size={14} />
              </span>
            </a>

            <a href="https://wa.me/923485872275" target="_blank" rel="noopener noreferrer" className="group glass p-8 rounded-2xl hover:-translate-y-2 transition-transform duration-300 bg-white flex flex-col items-center justify-center gap-6 border-2 border-transparent hover:border-emerald-100">
              <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 group-hover:scale-110 transition-transform duration-300">
                <MessageCircle size={32} />
              </div>
              <div className="text-center">
                <div className="text-sm font-medium text-slate-400 mb-1 uppercase tracking-wider">WhatsApp</div>
                <div className="text-lg font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">+92 348 587 2275</div>
              </div>
              <span className="text-emerald-600 font-medium text-sm flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                Chat Now <ChevronRight size={14} />
              </span>
            </a>
          </div>

          <div className="mt-16 pt-8 border-t border-slate-100">
            <a
              href="https://www.upwork.com/freelancers/mustafah56"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-slate-500 hover:text-emerald-600 transition-colors border-b border-transparent hover:border-emerald-200 pb-1 font-medium"
            >
              Prefer Upwork? Visit my profile <ExternalLink size={14} />
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-slate-200 bg-slate-50">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="mono text-xs text-slate-500 font-medium">
            © 2026 Mustafa Haider. Built with React & Tailwind.
          </div>
          <div className="flex gap-6">
            <a href="https://github.com/MustafaHaider758" className="text-slate-400 hover:text-emerald-600 transition-colors"><Github size={18} /></a>
            <a href="mailto:mustafahaider758@gmail.com" className="text-slate-400 hover:text-emerald-600 transition-colors"><Mail size={18} /></a>
            <a href="https://www.linkedin.com/in/mustafa-haider-034152176/" className="text-slate-400 hover:text-emerald-600 transition-colors"><Globe size={18} /></a>
          </div>
        </div>
      </footer>
    </div>
  );
}
