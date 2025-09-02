"use client";

import { useState, useEffect } from "react";

function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId === 'home' ? 'hero' : sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'glass-morphism shadow-lg' : 'bg-transparent'
      }`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => scrollToSection('hero')}
              className="text-lg sm:text-xl font-bold tracking-tight text-high-contrast hover:opacity-80 transition-opacity gradient-text"
            >
              Portfolio
            </button>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
              {['Home', 'About', 'Skills', 'Portfolio', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="text-sm font-medium text-medium-contrast hover:text-foreground transition-colors relative group"
                >
                  {item}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-gradient-start to-gradient-end transition-all duration-300 group-hover:w-full"></span>
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-foreground"
              aria-label="Toggle menu"
            >
              <div className="w-6 h-6 flex flex-col justify-center items-center">
                <span className={`block w-5 h-0.5 bg-current transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-1' : '-translate-y-1'}`}></span>
                <span className={`block w-5 h-0.5 bg-current transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                <span className={`block w-5 h-0.5 bg-current transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-1' : 'translate-y-1'}`}></span>
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`fixed top-0 right-0 h-full w-64 z-40 transform transition-transform duration-300 md:hidden ${
        isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
      } glass-morphism`}>
        <div className="pt-20 px-6">
          {['Home', 'About', 'Skills', 'Portfolio', 'Contact'].map((item) => (
            <button
              key={item}
              onClick={() => scrollToSection(item.toLowerCase())}
              className="block w-full text-left py-3 text-lg font-medium text-medium-contrast hover:text-foreground transition-colors"
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      )}
    </>
  );
}

function HeroSection() {
  return (
    <section id="hero" className="min-h-screen flex items-center justify-center px-4 sm:px-6 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gradient-start/10 via-transparent to-gradient-end/10 pointer-events-none"></div>
      
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <div className="mb-6">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-4">
            안녕하세요,
            <br />
            <span className="text-green-500 font-bold">luzanchik</span> 입니다
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-gradient-start to-gradient-end mx-auto rounded-full"></div>
        </div>
        
        <p className="text-base sm:text-lg md:text-xl text-medium-contrast mb-8 max-w-2xl mx-auto leading-relaxed px-4">
          사용자 경험을 중시하며 깔끔하고 효율적인 웹 솔루션을 만들어갑니다.
          <br className="hidden sm:block" />
          <span className="text-low-contrast">창의적이고 혁신적인 디지털 경험을 제공합니다.</span>
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button 
            onClick={() => {
              const element = document.getElementById('portfolio');
              if (element) element.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-6 sm:px-8 py-3 rounded-full font-medium btn-primary mobile-full-width sm:w-auto"
          >
            포트폴리오 보기
          </button>
          <button 
            onClick={() => {
              const element = document.getElementById('contact');
              if (element) element.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-6 sm:px-8 py-3 rounded-full font-medium btn-secondary mobile-full-width sm:w-auto"
          >
            연락하기
          </button>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-muted-foreground rounded-full flex justify-center">
            <div className="w-1 h-3 bg-muted-foreground rounded-full mt-2"></div>
          </div>
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  const stats = [
    { number: '3+', label: '년 경력' },
    { number: '15+', label: '프로젝트' },
    { number: '100%', label: '만족도' }
  ];

  return (
    <section id="about" className="py-16 sm:py-20 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-high-contrast">
            About <span className="gradient-text">Me</span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-gradient-start to-gradient-end mx-auto rounded-full"></div>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="order-2 lg:order-1">
            <div className="glass-morphism rounded-3xl p-8 sm:p-12 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-gradient-start/20 to-gradient-end/20 rounded-full -mr-16 -mt-16"></div>
              <div className="relative z-10">
                <div className="w-48 h-48 sm:w-64 sm:h-64 mx-auto bg-gradient-to-br from-gradient-start/20 to-gradient-end/20 rounded-3xl flex items-center justify-center mb-6 lg:mb-0 overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-gradient-start/30 to-gradient-end/30 flex items-center justify-center">
                    <div className="text-6xl sm:text-8xl text-white/80">💼</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="order-1 lg:order-2 mobile-text-center lg:text-left">
            <h3 className="text-2xl sm:text-3xl font-bold mb-4 text-high-contrast">
              웹 개발자 & <span className="gradient-text">기획자</span>
            </h3>
            <p className="text-medium-contrast leading-relaxed mb-6 text-base sm:text-lg">
              사용자 중심의 웹 서비스를 기획하고 개발하는 것을 좋아합니다. 
              깔끔한 코드와 직관적인 UI/UX를 통해 더 나은 디지털 경험을 만들어가고 있습니다.
            </p>
            <p className="text-medium-contrast leading-relaxed mb-8 text-base sm:text-lg">
              새로운 기술을 배우는 것을 즐기며, 문제 해결 과정에서 창의적인 접근을 추구합니다. 
              협업을 통한 성장을 중요하게 생각합니다.
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center lg:text-left">
                  <div className="text-2xl sm:text-3xl font-bold gradient-text mb-1">{stat.number}</div>
                  <div className="text-sm text-low-contrast">{stat.label}</div>
                </div>
              ))}
            </div>
            
            <button className="btn-secondary px-6 py-3 rounded-full font-medium mobile-full-width sm:w-auto">
              이력서 다운로드
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function SkillsSection() {
  const skills = [
    { 
      category: 'Frontend', 
      icon: '⚡',
      items: [
        { name: 'React', level: 90 },
        { name: 'Next.js', level: 85 },
        { name: 'TypeScript', level: 88 },
        { name: 'Tailwind CSS', level: 92 }
      ]
    },
    { 
      category: 'Backend', 
      icon: '🔧',
      items: [
        { name: 'Node.js', level: 85 },
        { name: 'Express', level: 80 },
        { name: 'PostgreSQL', level: 75 },
        { name: 'MongoDB', level: 78 }
      ]
    },
    { 
      category: 'Tools', 
      icon: '📦',
      items: [
        { name: 'Git', level: 90 },
        { name: 'Docker', level: 70 },
        { name: 'Figma', level: 85 },
        { name: 'VS Code', level: 95 }
      ]
    },
    { 
      category: 'Soft Skills', 
      icon: '💡',
      items: [
        { name: '문제 해결', level: 88 },
        { name: '협업', level: 92 },
        { name: '커뮤니케이션', level: 85 },
        { name: '학습 능력', level: 95 }
      ]
    }
  ];

  return (
    <section id="skills" className="py-16 sm:py-20 px-4 sm:px-6 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-high-contrast">
            My <span className="gradient-text">Skills</span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-gradient-start to-gradient-end mx-auto rounded-full"></div>
          <p className="text-medium-contrast mt-6 max-w-2xl mx-auto text-base sm:text-lg">
            다양한 기술 스택과 도구를 활용하여 최고의 결과물을 만들어냅니다.
          </p>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {skills.map((skillGroup) => (
            <div key={skillGroup.category} className="glass-morphism rounded-2xl p-6 sm:p-8 hover:scale-105 transition-transform duration-300">
              <div className="text-center mb-6">
                <div className="text-4xl mb-3">{skillGroup.icon}</div>
                <h3 className="text-xl font-bold text-high-contrast">{skillGroup.category}</h3>
              </div>
              
              <div className="space-y-4">
                {skillGroup.items.map((skill) => (
                  <div key={skill.name}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-medium-contrast">{skill.name}</span>
                      <span className="text-xs text-low-contrast">{skill.level}%</span>
                    </div>
                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-gradient-start to-gradient-end rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PortfolioSection() {
  const projects = [
    {
      title: 'E-Commerce Platform',
      description: '모던한 온라인 쇼핑몰 플랫폼으로 사용자 친화적인 UI와 안전한 결제 시스템을 구축했습니다.',
      tech: ['React', 'Next.js', 'TypeScript', 'Stripe'],
      category: 'Web Development',
      color: 'from-blue-500 to-purple-600'
    },
    {
      title: 'Task Management App', 
      description: '팀 협업을 위한 실시간 작업 관리 애플리케이션으로 직관적인 칸반 보드를 제공합니다.',
      tech: ['Next.js', 'Node.js', 'Socket.io', 'MongoDB'],
      category: 'Full Stack',
      color: 'from-green-500 to-teal-600'
    },
    {
      title: 'Portfolio Website',
      description: '반응형 포트폴리오 웹사이트로 세련된 애니메이션과 최적화된 성능을 자랑합니다.',
      tech: ['Next.js', 'Tailwind', 'Framer Motion'],
      category: 'Frontend',
      color: 'from-pink-500 to-rose-600'
    },
    {
      title: 'Data Dashboard',
      description: '비즈니스 데이터 시각화를 위한 대시보드로 실시간 차트와 분석 기능을 제공합니다.',
      tech: ['React', 'D3.js', 'Python', 'FastAPI'],
      category: 'Data Visualization',
      color: 'from-orange-500 to-red-600'
    },
    {
      title: 'Mobile Banking App',
      description: '보안이 강화된 모바일 뱅킹 앱으로 생체 인증과 암호화된 거래를 지원합니다.',
      tech: ['React Native', 'Node.js', 'PostgreSQL'],
      category: 'Mobile',
      color: 'from-indigo-500 to-blue-600'
    },
    {
      title: 'AI Chatbot Service',
      description: 'GPT를 활용한 고객 서비스 챗봇으로 자연스러운 대화와 문제 해결을 제공합니다.',
      tech: ['Python', 'OpenAI API', 'FastAPI', 'Redis'],
      category: 'AI/ML',
      color: 'from-purple-500 to-indigo-600'
    }
  ];

  return (
    <section id="portfolio" className="py-16 sm:py-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-high-contrast">
            My <span className="gradient-text">Portfolio</span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-gradient-start to-gradient-end mx-auto rounded-full"></div>
          <p className="text-medium-contrast mt-6 max-w-2xl mx-auto text-base sm:text-lg">
            다양한 프로젝트를 통해 쌓은 경험과 기술력을 확인해보세요.
          </p>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {projects.map((project, index) => (
            <div key={index} className="group cursor-pointer">
              <div className="glass-morphism rounded-2xl overflow-hidden hover:scale-105 transition-all duration-300 hover:shadow-2xl">
                {/* Project Image/Icon */}
                <div className={`aspect-video bg-gradient-to-br ${project.color} flex items-center justify-center relative overflow-hidden`}>
                  <div className="text-6xl sm:text-7xl opacity-90 text-white">💻</div>
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium text-white">
                      {project.category}
                    </span>
                  </div>
                </div>
                
                {/* Project Content */}
                <div className="p-6 sm:p-8">
                  <h3 className="text-xl sm:text-2xl font-bold mb-3 text-high-contrast group-hover:gradient-text transition-all">
                    {project.title}
                  </h3>
                  <p className="text-medium-contrast leading-relaxed mb-6 text-sm sm:text-base">
                    {project.description}
                  </p>
                  
                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((tech) => (
                      <span key={tech} className="px-3 py-1 bg-muted rounded-full text-xs font-medium text-medium-contrast">
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <button className="flex-1 px-4 py-2 btn-primary rounded-lg text-sm font-medium">
                      Live Demo
                    </button>
                    <button className="flex-1 px-4 py-2 btn-secondary rounded-lg text-sm font-medium">
                      GitHub
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  const contactInfo = [
    {
      icon: '✉️',
      title: '이메일',
      value: 'your.email@example.com',
      link: 'mailto:your.email@example.com'
    },
    {
      icon: '📞',
      title: '전화번호',
      value: '+82 10-0000-0000',
      link: 'tel:+821000000000'
    },
    {
      icon: '🌍',
      title: '위치',
      value: '서울, 대한민국',
      link: '#'
    }
  ];

  return (
    <section id="contact" className="py-16 sm:py-20 px-4 sm:px-6 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-high-contrast">
            Get In <span className="gradient-text">Touch</span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-gradient-start to-gradient-end mx-auto rounded-full"></div>
          <p className="text-medium-contrast mt-6 max-w-2xl mx-auto text-base sm:text-lg">
            새로운 프로젝트나 협업 기회에 대해 언제든 연락주세요. 함께 멋진 것을 만들어봅시다!
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Contact Info */}
          <div>
            <h3 className="text-2xl sm:text-3xl font-bold mb-8 text-high-contrast mobile-text-center lg:text-left">
              연락처 정보
            </h3>
            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <a
                  key={index}
                  href={info.link}
                  className="flex items-center gap-6 p-6 glass-morphism rounded-2xl hover:scale-105 transition-all duration-300 group"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-gradient-start to-gradient-end rounded-2xl flex items-center justify-center text-2xl text-white group-hover:scale-110 transition-transform">
                    {info.icon}
                  </div>
                  <div>
                    <p className="font-semibold text-high-contrast text-lg">{info.title}</p>
                    <p className="text-medium-contrast">{info.value}</p>
                  </div>
                </a>
              ))}
            </div>
            
            {/* Social Links */}
            <div className="mt-8 mobile-text-center lg:text-left">
              <h4 className="text-lg font-semibold mb-4 text-high-contrast">소셜 미디어</h4>
              <div className="flex gap-4 justify-center lg:justify-start">
                {[
                  { name: 'GitHub', icon: '⚡' },
                  { name: 'LinkedIn', icon: '🔗' },
                  { name: 'Instagram', icon: '📸' },
                  { name: 'Twitter', icon: '🌐' }
                ].map((social) => (
                  <a
                    key={social.name}
                    href="#"
                    className="w-12 h-12 bg-gradient-to-br from-gradient-start to-gradient-end rounded-xl flex items-center justify-center text-white hover:scale-110 transition-transform"
                    aria-label={social.name}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
          
          {/* Contact Form */}
          <div className="glass-morphism rounded-3xl p-8 sm:p-12">
            <h3 className="text-2xl sm:text-3xl font-bold mb-8 text-high-contrast mobile-text-center lg:text-left">
              메시지 보내기
            </h3>
            <form className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <input
                  type="text"
                  placeholder="이름"
                  className="w-full px-4 py-4 bg-background/50 border border-border rounded-xl focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all text-foreground placeholder-muted-foreground"
                />
                <input
                  type="email"
                  placeholder="이메일"
                  className="w-full px-4 py-4 bg-background/50 border border-border rounded-xl focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all text-foreground placeholder-muted-foreground"
                />
              </div>
              <input
                type="text"
                placeholder="제목"
                className="w-full px-4 py-4 bg-background/50 border border-border rounded-xl focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all text-foreground placeholder-muted-foreground"
              />
              <textarea
                placeholder="메시지를 입력해주세요..."
                rows={6}
                className="w-full px-4 py-4 bg-background/50 border border-border rounded-xl focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all resize-none text-foreground placeholder-muted-foreground"
              ></textarea>
              <button
                type="submit"
                className="w-full px-6 py-4 btn-primary rounded-xl font-semibold text-lg"
              >
                메시지 보내기 ✨
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const currentYear = new Date().getFullYear();
  
  const quickLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Contact', href: '#contact' }
  ];

  const socialLinks = [
    { name: 'GitHub', href: '#', icon: '⚡' },
    { name: 'LinkedIn', href: '#', icon: '🔗' },
    { name: 'Instagram', href: '#', icon: '📸' },
    { name: 'Twitter', href: '#', icon: '🌐' }
  ];

  const scrollToSection = (href: string) => {
    const element = document.getElementById(href.substring(1));
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-primary/5 border-t border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold gradient-text mb-4">Portfolio</h3>
            <p className="text-medium-contrast leading-relaxed mb-6 max-w-md">
              사용자 중심의 웹 개발자로서 혁신적이고 효율적인 디지털 솔루션을 제공합니다. 
              함께 멋진 프로젝트를 만들어봅시다!
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 bg-gradient-to-br from-gradient-start to-gradient-end rounded-lg flex items-center justify-center text-white hover:scale-110 transition-transform"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-high-contrast mb-4">빠른 링크</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-medium-contrast hover:text-foreground hover:gradient-text transition-colors text-left"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-high-contrast mb-4">연락처</h4>
            <div className="space-y-3 text-medium-contrast">
              <p className="flex items-center gap-2">
                ✉️ <span>your.email@example.com</span>
              </p>
              <p className="flex items-center gap-2">
                📞 <span>+82 10-0000-0000</span>
              </p>
              <p className="flex items-center gap-2">
                🌍 <span>서울, 대한민국</span>
              </p>
            </div>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-medium-contrast text-sm mobile-text-center">
              © {currentYear} Portfolio. All rights reserved. Made with ❤️ using Next.js & Tailwind CSS
            </p>
            <div className="flex items-center gap-6 text-sm">
              <a href="#" className="text-medium-contrast hover:text-foreground transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-medium-contrast hover:text-foreground transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
      </footer>
  );
}

export default function Page() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <PortfolioSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
