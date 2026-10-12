// Week 7: Migrating Your Interactive Portfolio to React
// This starter file guides you through migrating your Week 6 vanilla JavaScript portfolio to React

import './App.css'

function App() {
  // ============================================
  // PART 1: EVENT HANDLER FUNCTIONS
  // ============================================
  // TODO: Move your Week 6 event handler functions here
  // In Week 6, you had functions like:
  // - handleNavClick (for smooth scroll)
  // - filterProjects (for project filtering)
  // - handleFormSubmit (for form validation)
  //
  // HINT: These will be regular JavaScript functions defined inside App component
  // Example from Week 6:
  //   const filterProjects = (category) => {
  //     // Your filtering logic here
  //   }
  const filterProjects = (category) => {
  const projectCards = document.querySelectorAll('.project-card')

  projectCards.forEach((card) => {
    const cardCategory = card.getAttribute('data-category')

    if (category === 'all' || cardCategory === category) {
      card.style.display = 'block'
      setTimeout(() => {
        card.style.opacity = '1'
        card.style.transform = 'scale(1)'
      }, 10)
    } else {
      card.style.opacity = '0'
      card.style.transform = 'scale(0.9)'

      setTimeout(() => {
        card.style.display = 'none'
      }, 300)
    }
  })
}

const handleNavClick = (event) => {
  event.preventDefault()

  const targetId = event.currentTarget.getAttribute('href')
  const targetSection = document.querySelector(targetId)

  if (targetSection) {
    targetSection.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  }
}

const handleFormSubmit = (event) => {
  event.preventDefault()

  const form = event.currentTarget
  const nameInput = form.querySelector('#name')
  const emailInput = form.querySelector('#email')
  const messageInput = form.querySelector('#message')

  const name = nameInput.value.trim()
  const email = emailInput.value.trim()
  const message = messageInput.value.trim()

  let isValid = true

  const isValidEmail = (value) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)

  const validateField = (input, valid, errorMessage) => {
    input.parentElement.querySelector('.error-message')?.remove()
    input.classList.remove('error', 'success')

    if (!valid) {
      input.classList.add('error')

      const error = document.createElement('span')
      error.className = 'error-message'
      error.textContent = errorMessage

      input.parentElement.appendChild(error)
      isValid = false
    } else {
      input.classList.add('success')
    }
  }

  validateField(
    nameInput,
    name.length >= 2,
    'Name must be at least 2 characters'
  )

  validateField(
    emailInput,
    isValidEmail(email),
    'Please enter a valid email address'
  )

  validateField(
    messageInput,
    message.length >= 10,
    'Message must be at least 10 characters'
  )

  if (isValid) {
    form.querySelector('.success-message')?.remove()

    const success = document.createElement('div')
    success.className = 'success-message'
    success.textContent =
      'Thank you! Your message has been sent successfully.'

    form.appendChild(success)

    console.log('Form submitted with data:', {
      name,
      email,
      message
    })

    setTimeout(() => {
      form.reset()
      success.remove()
      form.querySelectorAll('.success').forEach((input) => {
        input.classList.remove('success')
      })
    }, 3000)
  }
}
  // TODO: Add smooth scroll handler
  // Replace: navLinks.forEach(link => link.addEventListener('click', ...))
  // With: const handleNavClick = (e) => { ... }
  const handleNavClick = (e) => {
  e.preventDefault()

  const targetId = e.currentTarget.getAttribute('href')
  const targetSection = document.querySelector(targetId)

  if (targetSection) {
    targetSection.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  }
}
  // TODO: Add filter handler
  // Replace: filterButtons.forEach(button => button.addEventListener('click', ...))
  // With: const handleFilterClick = (category) => { ... }
  const handleFilterClick = (category) => {
  const projectCards = document.querySelectorAll('.project-card')

  projectCards.forEach((card) => {
    const cardCategory = card.getAttribute('data-category')

    if (category === 'all' || cardCategory === category) {
      card.style.display = 'block'

      setTimeout(() => {
        card.style.opacity = '1'
        card.style.transform = 'scale(1)'
      }, 10)
    } else {
      card.style.opacity = '0'
      card.style.transform = 'scale(0.9)'

      setTimeout(() => {
        card.style.display = 'none'
      }, 300)
    }
  })
}

  // TODO: Add form validation functions
  // You'll need: isValidEmail, showError, clearError, showSuccess
  // These can stay mostly the same!
  const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

const showError = (input, message) => {
  const errorElement = input.parentElement.querySelector('.error-message')
  if (errorElement) {
    errorElement.textContent = message
  }
  input.classList.add('error')
}

const clearError = (input) => {
  const errorElement = input.parentElement.querySelector('.error-message')
  if (errorElement) {
    errorElement.textContent = ''
  }
  input.classList.remove('error')
}

const showSuccess = (message) => {
  alert(message)
}
  // TODO: Add form submit handler
  // Replace: contactForm.addEventListener('submit', ...)
  // With: const handleFormSubmit = (e) => { ... }
const handleFormSubmit = (e) => {
  e.preventDefault()

  const name = document.getElementById('name')
  const email = document.getElementById('email')
  const subject = document.getElementById('subject')
  const message = document.getElementById('message')

  let isValid = true

  ;[name, email, subject, message].forEach((input) => {
    clearError(input)
  })

  if (!name.value.trim()) {
    showError(name, 'Name is required')
    isValid = false
  }

  if (!email.value.trim()) {
    showError(email, 'Email is required')
    isValid = false
  } else if (!isValidEmail(email.value.trim())) {
    showError(email, 'Please enter a valid email address')
    isValid = false
  }

  if (!subject.value.trim()) {
    showError(subject, 'Subject is required')
    isValid = false
  }

  if (!message.value.trim()) {
    showError(message, 'Message is required')
    isValid = false
  }

  if (isValid) {
    showSuccess('Thank you! Your message has been submitted.')
    e.currentTarget.reset()
  }
}

  // ============================================
  // PART 2: JSX RETURN STATEMENT
  // ============================================
  // TODO: Copy your Week 6 HTML structure here
  // Remember to convert HTML to JSX:
  // - class → className
  // - onclick → onClick
  // - onsubmit → onSubmit
  // - for → htmlFor
  // - All event attributes use camelCase
  //
  // IMPORTANT: Put EVERYTHING in this one return statement!
  // This week we're building a MONOLITHIC component (one big component)
  // Week 8 will teach you how to break this into smaller pieces

  return (
    <div className="portfolio">
      {/* TODO: Add your navigation here */}
      {/* HINT: Replace <a href="#home" class="nav-link"> with <a href="#home" className="nav-link"> */}
      {/* HINT: Replace onclick with onClick={handleNavClick} */}
              
      {/* TODO: Add your hero section here */}
      <section id="home" className="hero">
        <div className="hero-content">
          <h1>Hi, I'm Alex Johnson</h1>
          <p>Web Developer and Designer</p>
          <a href="#projects" className="btn">View My Work</a>
        </div>
      </section>
      {/* TODO: Add your about section here */}
      <section id="about" className="about">
        <h2>About Me</h2>
        <p>
          I'm a developer passionate about building creative and user-friendly
          web experiences.
        </p>
      </section>

      {/* TODO: Add your skills section here */}
      <section id="skills" className="skills">
        <h2>My Skills</h2>
          <div className="skills-container">

          </div>
      </section>
      {/* TODO: Add your projects section here */}
      {/* HINT: For filter buttons, use onClick={() => handleFilterClick('category')} */}
      <section id="projects" className="projects">
      <h2>My Projects</h2>

      <div className="filter-buttons">
        <button onClick={() => handleFilterClick('all')}>All</button>
        <button onClick={() => handleFilterClick('frontend')}>Frontend</button>
        <button onClick={() => handleFilterClick('fullstack')}>Full Stack</button>
        <button onClick={() => handleFilterClick('design')}>Design</button>
        <button onClick={() => handleFilterClick('webapp')}>Web App</button>
      </div>

      <div className="projects-container">
        {/* Copy your original project cards here.
            Keep their className="project-card" and data-category attributes. */}
      </div>
    </section>
      {/* TODO: Add your contact form here */}
      {/* HINT: Form will use onSubmit={handleFormSubmit} */}
      {/* HINT: Inputs will use onChange for real-time validation */}
      <section id="contact" className="contact">
      <h2>Contact Me</h2>

      <form id="contactForm" onSubmit={handleFormSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            onChange={(e) => clearError(e.target)}
          />
          <span className="error-message"></span>
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            onChange={(e) => clearError(e.target)}
          />
          <span className="error-message"></span>
        </div>

        <div>
          <label htmlFor="subject">Subject</label>
          <input
            type="text"
            id="subject"
            name="subject"
            onChange={(e) => clearError(e.target)}
          />
          <span className="error-message"></span>
        </div>

        <div>
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            onChange={(e) => clearError(e.target)}
            />
          <span className="error-message"></span>
        </div>

        <button type="submit">Send Message</button>
      </form>
    </section>
      {/* TODO: Add your footer here */}
      <footer className="footer">
        <p>&copy; 2026 Alex Johnson. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default App
