// Global Variables
const particles = []
let neuralNodes = []
const connections = []

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  initializeParticles()
  initializeNeuralNetwork()
  initializeAnimations()
  initializeNavigation()
  initializeTypingEffect()
  initializeSkillBars()
  initializeScrollAnimations()
  initializeFormHandling()
  initializeTiltEffect()
})

// Particle System
function initializeParticles() {
  const particlesContainer = document.getElementById("particles")
  const particleCount = window.innerWidth < 768 ? 30 : 50

  for (let i = 0; i < particleCount; i++) {
    createParticle(particlesContainer)
  }
}

function createParticle(container) {
  const particle = document.createElement("div")
  particle.className = "particle"

  // Random position
  particle.style.left = Math.random() * 100 + "%"
  particle.style.top = Math.random() * 100 + "%"

  // Random animation delay and duration
  particle.style.animationDelay = Math.random() * 6 + "s"
  particle.style.animationDuration = Math.random() * 4 + 4 + "s"

  // Random color
  const colors = ["#00ffff", "#ff00ff", "#ffff00"]
  const randomColor = colors[Math.floor(Math.random() * colors.length)]
  particle.style.background = randomColor
  particle.style.boxShadow = `0 0 10px ${randomColor}`

  container.appendChild(particle)

  // Remove and recreate particle after animation
  setTimeout(() => {
    if (particle.parentNode) {
      particle.parentNode.removeChild(particle)
      createParticle(container)
    }
  }, 10000)
}

// Neural Network Background
function initializeNeuralNetwork() {
  const neuralBg = document.getElementById("neuralBg")
  const canvas = document.createElement("canvas")
  const ctx = canvas.getContext("2d")

  canvas.style.position = "absolute"
  canvas.style.top = "0"
  canvas.style.left = "0"
  canvas.style.width = "100%"
  canvas.style.height = "100%"
  canvas.style.zIndex = "-1"

  neuralBg.appendChild(canvas)

  function resizeCanvas() {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    initNodes()
  }

  function initNodes() {
    neuralNodes = []
    const nodeCount = window.innerWidth < 768 ? 20 : 40

    for (let i = 0; i < nodeCount; i++) {
      neuralNodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 3 + 1,
      })
    }
  }

  function drawNeuralNetwork() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Update and draw nodes
    neuralNodes.forEach((node) => {
      node.x += node.vx
      node.y += node.vy

      // Bounce off edges
      if (node.x < 0 || node.x > canvas.width) node.vx *= -1
      if (node.y < 0 || node.y > canvas.height) node.vy *= -1

      // Draw node
      ctx.beginPath()
      ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2)
      ctx.fillStyle = "rgba(0, 255, 255, 0.6)"
      ctx.fill()

      // Draw glow
      ctx.beginPath()
      ctx.arc(node.x, node.y, node.radius * 3, 0, Math.PI * 2)
      ctx.fillStyle = "rgba(0, 255, 255, 0.1)"
      ctx.fill()
    })

    // Draw connections
    for (let i = 0; i < neuralNodes.length; i++) {
      for (let j = i + 1; j < neuralNodes.length; j++) {
        const dx = neuralNodes[i].x - neuralNodes[j].x
        const dy = neuralNodes[i].y - neuralNodes[j].y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < 150) {
          ctx.beginPath()
          ctx.moveTo(neuralNodes[i].x, neuralNodes[i].y)
          ctx.lineTo(neuralNodes[j].x, neuralNodes[j].y)
          ctx.strokeStyle = `rgba(0, 255, 255, ${0.3 - distance / 500})`
          ctx.lineWidth = 1
          ctx.stroke()
        }
      }
    }

    requestAnimationFrame(drawNeuralNetwork)
  }

  resizeCanvas()
  drawNeuralNetwork()

  window.addEventListener("resize", resizeCanvas)
}

// Navigation
function initializeNavigation() {
  const navbar = document.getElementById("navbar")
  const hamburger = document.getElementById("hamburger")
  const navMenu = document.getElementById("navMenu")
  const navLinks = document.querySelectorAll(".nav-link")

  // Scroll effect
  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      navbar.classList.add("scrolled")
    } else {
      navbar.classList.remove("scrolled")
    }
  })

  // Mobile menu toggle
  hamburger.addEventListener("click", () => {
    navMenu.classList.toggle("active")
    hamburger.classList.toggle("active")
  })

  // Smooth scrolling for navigation links
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault()
      const targetId = link.getAttribute("href")
      const targetSection = document.querySelector(targetId)

      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }

      // Close mobile menu
      navMenu.classList.remove("active")
      hamburger.classList.remove("active")
    })
  })
}

// Typing Effect
function initializeTypingEffect() {
  const typingText = document.getElementById("typingText")
  const texts = [
    "AI Developer",
    "Machine Learning Engineer",
    "Neural Network Architect",
    "Data Scientist",
    "Deep Learning Specialist",
    "Computer Vision Expert",
  ]

  let textIndex = 0
  let charIndex = 0
  let isDeleting = false

  function typeEffect() {
    const currentText = texts[textIndex]

    if (isDeleting) {
      typingText.textContent = currentText.substring(0, charIndex - 1)
      charIndex--
    } else {
      typingText.textContent = currentText.substring(0, charIndex + 1)
      charIndex++
    }

    let typeSpeed = isDeleting ? 50 : 100

    if (!isDeleting && charIndex === currentText.length) {
      typeSpeed = 2000
      isDeleting = true
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false
      textIndex = (textIndex + 1) % texts.length
      typeSpeed = 500
    }

    setTimeout(typeEffect, typeSpeed)
  }

  typeEffect()
}

// Skill Bars Animation
function initializeSkillBars() {
  const skillItems = document.querySelectorAll(".skill-item")

  const observerOptions = {
    threshold: 0.7,
    rootMargin: "0px 0px -100px 0px",
  }

  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const skillItem = entry.target
        const skillLevel = skillItem.getAttribute("data-skill")
        const progressBar = skillItem.querySelector(".skill-progress")
        const glowEffect = skillItem.querySelector(".skill-glow")

        setTimeout(() => {
          progressBar.style.width = skillLevel + "%"
          glowEffect.style.opacity = "1"
        }, 200)

        skillObserver.unobserve(skillItem)
      }
    })
  }, observerOptions)

  skillItems.forEach((item) => {
    skillObserver.observe(item)
  })
}

// Scroll Animations
function initializeScrollAnimations() {
  const animatedElements = document.querySelectorAll(".fade-in, .slide-in-left, .slide-in-right")

  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible")
      }
    })
  }, observerOptions)

  animatedElements.forEach((element) => {
    scrollObserver.observe(element)
  })
}

// Form Handling
function initializeFormHandling() {
  const contactForm = document.getElementById("contactForm")

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Get form data
      const formData = new FormData(contactForm)
      const name = formData.get("name")
      const email = formData.get("email")
      const message = formData.get("message")

      // Simulate form submission
      const submitBtn = contactForm.querySelector(".submit-btn")
      const originalText = submitBtn.innerHTML

      submitBtn.innerHTML = "<span>Sending...</span>"
      submitBtn.disabled = true

      setTimeout(() => {
        submitBtn.innerHTML = "<span>Message Sent!</span>"

        setTimeout(() => {
          submitBtn.innerHTML = originalText
          submitBtn.disabled = false
          contactForm.reset()
        }, 2000)
      }, 1500)
    })
  }
}

// 3D Tilt Effect for Project Cards
function initializeTiltEffect() {
  const tiltElements = document.querySelectorAll("[data-tilt]")

  tiltElements.forEach((element) => {
    element.addEventListener("mousemove", (e) => {
      const rect = element.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const centerX = rect.width / 2
      const centerY = rect.height / 2

      const rotateX = (y - centerY) / 10
      const rotateY = (centerX - x) / 10

      element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`
    })

    element.addEventListener("mouseleave", () => {
      element.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)"
    })
  })
}

// Additional Animations
function initializeAnimations() {
  // Add fade-in classes to elements
  const sections = document.querySelectorAll("section")
  sections.forEach((section, index) => {
    if (index > 0) {
      section.classList.add("fade-in")
    }
  })

  // Add slide animations to specific elements
  const aboutText = document.querySelector(".about-text")
  const aboutVisual = document.querySelector(".about-visual")

  if (aboutText) aboutText.classList.add("slide-in-left")
  if (aboutVisual) aboutVisual.classList.add("slide-in-right")

  const contactInfo = document.querySelector(".contact-info")
  const contactForm = document.querySelector(".contact-form-container")

  if (contactInfo) contactInfo.classList.add("slide-in-left")
  if (contactForm) contactForm.classList.add("slide-in-right")
}

// Utility Functions
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId)
  if (section) {
    section.scrollIntoView({
      behavior: "smooth",
      block: "start",
    })
  }
}

// Mouse Trail Effect
document.addEventListener("mousemove", (e) => {
  if (window.innerWidth > 768) {
    createMouseTrail(e.clientX, e.clientY)
  }
})

function createMouseTrail(x, y) {
  const trail = document.createElement("div")
  trail.style.position = "fixed"
  trail.style.left = x + "px"
  trail.style.top = y + "px"
  trail.style.width = "4px"
  trail.style.height = "4px"
  trail.style.background = "var(--primary-color)"
  trail.style.borderRadius = "50%"
  trail.style.pointerEvents = "none"
  trail.style.zIndex = "9999"
  trail.style.animation = "trailFade 0.5s ease-out forwards"

  document.body.appendChild(trail)

  setTimeout(() => {
    if (trail.parentNode) {
      trail.parentNode.removeChild(trail)
    }
  }, 500)
}

// Add trail fade animation
const style = document.createElement("style")
style.textContent = `
    @keyframes trailFade {
        0% {
            opacity: 1;
            transform: scale(1);
        }
        100% {
            opacity: 0;
            transform: scale(0);
        }
    }
`
document.head.appendChild(style)

// Performance optimization
let ticking = false

function updateAnimations() {
  // Update any continuous animations here
  ticking = false
}

function requestTick() {
  if (!ticking) {
    requestAnimationFrame(updateAnimations)
    ticking = true
  }
}

// Resize handler
window.addEventListener("resize", () => {
  // Reinitialize particles on resize
  const particlesContainer = document.getElementById("particles")
  if (particlesContainer) {
    particlesContainer.innerHTML = ""
    initializeParticles()
  }
})

// Preloader (optional)
window.addEventListener("load", () => {
  document.body.classList.add("loaded")
})
