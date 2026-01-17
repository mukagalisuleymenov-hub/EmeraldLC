
const revealItems = document.querySelectorAll(".reveal");


const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  },
  { threshold: 0.12 }
);

revealItems.forEach((el) => revealObserver.observe(el));


const faqButtons = document.querySelectorAll(".faq-item");

faqButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const answer = btn.nextElementSibling;


    document.querySelectorAll(".faq-answer").forEach((a) => {
      if (a !== answer) a.style.display = "none";
    });

    document.querySelectorAll(".faq-item .faq-icon").forEach((icon) => {
      if (icon !== btn.querySelector(".faq-icon")) icon.textContent = "+";
    });

    if (answer.style.display === "block") {
      answer.style.display = "none";
      btn.querySelector(".faq-icon").textContent = "+";
    } else {
      answer.style.display = "block";
      btn.querySelector(".faq-icon").textContent = "−";
    }
  });
});


const toast = document.getElementById("toast");
function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2200);
}

const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbzc_3wS24CP0n3I_GWMscM9M0pe-orYvEdBFemCLj4Y4JB5KhbaBV7N238f39bbzo-FEg/exec";

async function sendToGoogleSheets(formData) {
  const response = await fetch(GOOGLE_SCRIPT_URL, {
    method: "POST",
    mode:"no-cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });

  return {success:true};
}

function handleFormSubmit(form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;

    submitBtn.textContent = "Submitting...";
    submitBtn.disabled = true;

    const data = {
      fullName: form.fullName?.value || "",
      phone: form.phone?.value || "",
      course: form.course?.value || "",
      format: form.format?.value || "",
      message: form.message?.value || "",
    };

    try {
      const result = await sendToGoogleSheets(data);

      if (result.success) {
        showToast("✅ Submitted! We will contact you soon.");
        form.reset();
      } else {
        showToast("❌ Error: " + (result.error || "Unknown error"));
      }
    } catch (err) {
      showToast("❌ Network error. Please try again.");
      console.error(err);
    } finally {
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }
  });
}

const miniForm = document.getElementById("miniForm");
const leadForm = document.getElementById("leadForm");

if (miniForm) handleFormSubmit(miniForm);
if (leadForm) handleFormSubmit(leadForm);



const burger = document.getElementById("burger");
const navLinks = document.getElementById("navLinks");

burger.addEventListener("click", () => {
  navLinks.classList.toggle("open");

  if (navLinks.classList.contains("open")) {
    navLinks.style.display = "flex";
    navLinks.style.flexDirection = "column";
    navLinks.style.position = "absolute";
    navLinks.style.top = "72px";
    navLinks.style.right = "16px";
    navLinks.style.background = "rgba(7, 31, 24, 0.95)";
    navLinks.style.border = "1px solid rgba(255,255,255,0.10)";
    navLinks.style.borderRadius = "18px";
    navLinks.style.padding = "12px";
    navLinks.style.width = "min(260px, calc(100% - 32px))";
  } else {
    navLinks.style.display = "none";
  }
});


navLinks.querySelectorAll("a").forEach((a) => {
  a.addEventListener("click", () => {
    if (window.innerWidth <= 980) {
      navLinks.classList.remove("open");
      navLinks.style.display = "none";
    }
  });
});


document.getElementById("year").textContent = new Date().getFullYear();
const slidesTrack = document.getElementById("slidesTrack");
const slidePrev = document.getElementById("slidePrev");
const slideNext = document.getElementById("slideNext");

if (slidesTrack) {
  const scrollStep = 1;      
  const intervalMs = 20;    
  let autoScroll;

  function startAutoScroll() {
    autoScroll = setInterval(() => {
      slidesTrack.scrollLeft += scrollStep;

    
      if (slidesTrack.scrollLeft + slidesTrack.clientWidth >= slidesTrack.scrollWidth - 2) {
        slidesTrack.scrollLeft = 0;
      }
    }, intervalMs);
  }

  function stopAutoScroll() {
    clearInterval(autoScroll);
  }

  startAutoScroll();


  slidesTrack.addEventListener("mouseenter", stopAutoScroll);
  slidesTrack.addEventListener("mouseleave", startAutoScroll);

  
  slidesTrack.addEventListener("touchstart", stopAutoScroll);
  slidesTrack.addEventListener("touchend", startAutoScroll);

  
  if (slidePrev && slideNext) {
    slidePrev.addEventListener("click", () => (slidesTrack.scrollLeft -= 260));
    slideNext.addEventListener("click", () => (slidesTrack.scrollLeft += 260));
  }
}
