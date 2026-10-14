/*
  TECH_GURU website interactions.
  IMPORTANT: Replace the demo WhatsApp number below with your own number.
  Pakistan example: 923001234567 (country code + number, digits only; no +, spaces, or dashes).
*/
const WHATSAPP_NUMBER = "3434244998";

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
  const opened = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(opened));
  menuToggle.setAttribute("aria-label", opened ? "Close navigation menu" : "Open navigation menu");
  menuToggle.textContent = opened ? "✕" : "☰";
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
    menuToggle.textContent = "☰";
  });
});

document.querySelectorAll("[data-service]").forEach((link) => {
  link.addEventListener("click", () => {
    document.getElementById("projectType").value = link.dataset.service;
  });
});

document.querySelectorAll("[data-package]").forEach((link) => {
  link.addEventListener("click", () => {
    const packageName = link.dataset.package;
    document.getElementById("projectType").value =
      packageName === "Shop" ? "E-commerce website" :
      packageName === "Launch" ? "Landing page" : "Business website";
  });
});

document.getElementById("year").textContent = new Date().getFullYear();

document.getElementById("contactForm").addEventListener("submit", (event) => {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const projectType = document.getElementById("projectType").value;
  const budget = document.getElementById("budget").value;
  const details = document.getElementById("message").value.trim();
  const status = document.getElementById("formStatus");

  // Encode the full message safely for a WhatsApp click-to-chat URL.
  const message = [
    "Hello TECH_GURU! I'd like to discuss a website project.",
    "",
    `Name: ${name}`,
    `Email: ${email}`,
    `Website type: ${projectType}`,
    `Estimated budget: ${budget}`,
    `Project details: ${details}`
  ].join("\n");

  if (!/^\d{8,15}$/.test(WHATSAPP_NUMBER)) {
    status.textContent = "Please set your WhatsApp number in script.js (country code and digits only).";
    status.style.color = "#ffc38e";
    return;
  }

  if (WHATSAPP_NUMBER === "923001234567") {
    status.textContent = "Demo WhatsApp number is still configured. Replace WHATSAPP_NUMBER in script.js with your own number before publishing.";
    status.style.color = "#ffc38e";
    return;
  }

  const whatsappURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  window.open(whatsappURL, "_blank", "noopener,noreferrer");
  status.textContent = "WhatsApp opened. Review your message and press Send to submit your enquiry.";
  status.style.color = "#9cf0d0";
});
