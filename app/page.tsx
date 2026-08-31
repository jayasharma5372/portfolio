'use client'

import { useState } from 'react'

const projects = [
  ['Suzie Kondi', 'Shopify · Liquid · UX', 'Editorial commerce experience'],
  ['Velvet Tees', 'Shopify · SEO · Liquid', '40% organic search boost'],
  ['Irene Forte Skincare', 'Shopify · Figma · CRO', 'Luxury skincare storefront'],
  ['Jet Set Candy', 'Shopify · Liquid · CSS', 'Playful travel retail'],
  ['Naked Cashmere', 'Shopify · JavaScript · UX', 'Premium fashion commerce'],
  ['TopTier Attachments', 'Shopify · Liquid · Responsive', 'B2B catalog experience'],
  ['The Map Store', 'Splide.js · AJAX cart · Shopify', 'Interactive map store'],
  ['Live Tinted', 'Shopify · JavaScript · SEO', 'Beauty brand refresh'],
  ['BY JOHNNY', 'Shopify · Liquid · Figma', 'Fashion-forward storefront'],
  ['Eighth Day', 'Shopify · UX · Performance', 'Wellness commerce platform'],
  ['HATCH Collection', 'Shopify · Liquid · Responsive', 'Thoughtful parenthood retail'],
  ['Viretta', 'Shopify · SEO · CSS', 'Modern lifestyle commerce'],
  ['AIVIQ', 'Shopify · JavaScript · CRO', 'Conversion-led experience'],
]

const skills = {
  Frontend: ['HTML', 'CSS', 'Tailwind', 'SCSS', 'LESS', 'Bootstrap', 'Shopify Liquid', 'Wix', 'WordPress', 'JavaScript', 'React'],
  Tools: ['Figma', 'Photoshop', 'VS Code', 'GitHub'],
  Backend: ['MySQL', 'SQL'],
}

export default function Page() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [formStatus, setFormStatus] = useState('')
  const portfolioUrl = 'https://jayasharma5372.github.io/portfolio/'
  const contactEmail = 'jayasharma5372@gmail.com'

  function handleContactSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const name = String(form.get('name') || '').trim()
    const email = String(form.get('email') || '').trim()
    const subject = String(form.get('subject') || '').trim()
    const message = String(form.get('message') || '').trim()

    if (!name || !email || !subject || !message) {
      setFormStatus('Please fill in all fields before sending.')
      return
    }

    const body = `Name: ${name}\\nEmail: ${email}\\n\\n${message}`
    window.location.href = `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    setFormStatus('Your email app is opening with your message ready to send.')
    event.currentTarget.reset()
  }

  return (
    <main>
      <header className="site-header">
        <a href="#top" className="wordmark" aria-label="Jaya Sharma home">JS<span>.</span></a>
        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label="Toggle navigation">Menu <span>{menuOpen ? '×' : '↗'}</span></button>
        <nav className={menuOpen ? 'nav-links is-open' : 'nav-links'} aria-label="Main navigation">
          {['About', 'Experience', 'Projects', 'Contact'].map((item) => <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMenuOpen(false)}>{item}</a>)}
        </nav>
      </header>

      <section id="top" className="hero section-wrap">
        <div className="eyebrow reveal">Ahmedabad, India <span>·</span> Available for select projects</div>
        <h1 className="hero-title reveal delay-1">Digital storefronts<br /><em>built to perform.</em></h1>
        <div className="hero-bottom reveal delay-2">
          <p className="hero-copy">I&apos;m Jaya Sharma, a Frontend &amp; Shopify Developer crafting responsive, SEO-friendly and high-performing eCommerce experiences.</p>
          <div className="hero-actions"><a className="button button-dark" href="#projects">View projects <span>↗</span></a><a className="button button-line" href={portfolioUrl} target="_blank" rel="noreferrer">Download resume <span>↓</span></a><a className="button button-line" href="mailto:jayasharma5372@gmail.com">Contact <span>↗</span></a></div>
        </div>
        <div className="scroll-note"><span className="scroll-line" /> Scroll to explore</div>
      </section>

      <section id="about" className="about section-wrap section-rule">
        <div className="section-label">01 / About</div>
        <div className="about-content"><h2>Design-minded.<br /><span>Detail-driven.</span></h2><div><p className="large-copy">Frontend and Shopify Developer with 2+ years of experience turning ambitious ideas into polished digital storefronts.</p><p>I blend thoughtful interface design with clean, scalable code to help brands tell their story, connect with customers and grow online. From first wireframe to final launch, I care about every interaction.</p><a className="text-link" href={portfolioUrl} target="_blank" rel="noreferrer">Visit my old portfolio <span>↗</span></a></div></div>
      </section>

      <section id="skills" className="skills section-wrap section-rule">
        <div className="section-label">02 / Capabilities</div><div className="skills-grid">{Object.entries(skills).map(([group, items]) => <div className="skill-group" key={group}><h3>{group}</h3><div className="skill-list">{items.map((skill) => <span key={skill}>{skill}</span>)}</div></div>)}</div>
      </section>

      <section id="experience" className="experience section-wrap section-rule"><div className="section-label">03 / Experience</div><div className="experience-row"><div><p className="overline">July 2024 — Present</p><h2>Frontend Developer</h2><p className="company">Atharva System <span>↗</span></p></div><ul><li>Build responsive, high-performing websites and Shopify stores from design through deployment.</li><li>Translate Figma designs into accessible, pixel-precise interfaces with reusable components.</li><li>Improve SEO, page speed and conversion through thoughtful frontend implementation.</li><li>Collaborate with designers, strategists and clients to ship work that delivers.</li></ul></div></section>

      <section id="projects" className="projects section-wrap section-rule"><div className="projects-heading"><div><div className="section-label">04 / Selected work</div><h2>Commerce,<br /><span>with character.</span></h2></div><p>13 Shopify experiences built for brands with something to say. Explore the full archive in my <a href={portfolioUrl} target="_blank" rel="noreferrer">previous portfolio ↗</a></p></div><div className="project-grid">{projects.map(([name, tech, result], index) => <a className={`project-card card-${index % 4}`} href={portfolioUrl} target="_blank" rel="noreferrer" key={name}><div className="project-art"><span>{String(index + 1).padStart(2, '0')}</span><i>{name.slice(0, 1)}</i></div><div className="project-meta"><div><h3>{name}</h3><p>{tech}</p></div><span className="project-arrow">↗</span></div><div className="project-result">{result}</div></a>)}</div></section>

      <section id="education" className="education section-wrap section-rule"><div className="section-label">05 / Education</div><div className="education-list"><div><p>2022 — 2024</p><h3>Master of Computer Applications</h3><span>9.09 CGPA</span></div><div><p>2019 — 2022</p><h3>Bachelor of Computer Applications</h3><span>7.80 CGPA</span></div></div></section>

      <section id="contact" className="contact section-wrap"><div className="section-label">06 / Contact</div><div className="contact-content"><h2>Let&apos;s make<br /><em>something good.</em></h2><a className="email-link" href={`mailto:${contactEmail}`}>{contactEmail} <span>↗</span></a><div className="contact-grid"><div><p className="contact-intro">Have a project in mind? Share a few details and your email app will open with a ready-to-send message addressed to me.</p><form className="contact-form" onSubmit={handleContactSubmit}><label>Name<input name="name" type="text" placeholder="Your name" required /></label><label>Email<input name="email" type="email" placeholder="you@example.com" required /></label><label>Subject<input name="subject" type="text" placeholder="What can I help with?" required /></label><label>Message<textarea name="message" rows={5} placeholder="Tell me about your project..." required /></label><button className="button button-dark" type="submit">Open email draft <span>↗</span></button>{formStatus && <p className="form-status" role="status">{formStatus}</p>}</form></div><div className="contact-bottom"><p>Certificates in web development, frontend engineering and Shopify implementation.</p><a className="button button-line" href={`mailto:${contactEmail}`}>Email me directly <span>↗</span></a></div></div></div></section>
      <footer className="footer section-wrap"><span>© 2026 Jaya Sharma</span><span>Frontend · Shopify · eCommerce</span><a href="#top">Back to top ↑</a></footer>
    </main>
  )
}
