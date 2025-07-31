// Toggle between Sign Up and Login
function toggleAuth(type) {
  document.getElementById('signupForm').classList.toggle('hidden', type !== 'signup');
  document.getElementById('loginForm').classList.toggle('hidden', type !== 'login');
  document.getElementById('signupTab').classList.toggle('active', type === 'signup');
  document.getElementById('loginTab').classList.toggle('active', type === 'login');
}

// Show different pages
function showPage(id) {
  document.querySelectorAll(".container").forEach(div => div.classList.add("hidden"));
  document.getElementById(id).classList.remove("hidden");
}

// Language Selection
function setLanguage() {
  const lang = document.getElementById("languageSelect").value;
  document.getElementById("languagePopup").style.display = "none";
  const translations = {
    en: "EcoCrew 🌱",
    hi: "इकोक्रू 🌱",
    gu: "ઈકોક્રૂ 🌱",
    mr: "इकोक्रू 🌱"
  };
  document.getElementById("title").textContent = translations[lang] || "EcoCrew 🌱";
}

// Form validation and Sign Up
function submitSignup() {
  let isValid = true;

  const name = document.getElementById("fullName").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const gender = document.getElementById("gender").value;
  const photo = document.getElementById("profilePhoto").files.length;

  // Name validation
  if (name.length < 5) {
    isValid = false;
    showError("nameError");
  } else hideError("nameError");

  // Email validation
  if (!email.includes("@")) {
    isValid = false;
    showError("emailError");
  } else hideError("emailError");

  // Password validation
  if (password.length < 10) {
    isValid = false;
    showError("passwordError");
  } else hideError("passwordError");

  // Gender validation
  if (!gender) {
    isValid = false;
    showError("genderError");
  } else hideError("genderError");

  // Photo validation
  if (!photo) {
    isValid = false;
    showError("photoError");
  } else hideError("photoError");

  if (isValid) {
    localStorage.setItem("isLoggedIn", "true");
    showPage("photoPage");
  }
}

// Login function
function loginUser() {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  if (!email.includes("@")) {
    alert("Invalid email");
    return;
  }
  if (password.length < 10) {
    alert("Password must be at least 10 characters");
    return;
  }

  localStorage.setItem("isLoggedIn", "true");
  showPage("photoPage");
}

// Show/hide errors
function showError(id) {
  document.getElementById(id).classList.remove("hidden");
}
function hideError(id) {
  document.getElementById(id).classList.add("hidden");
}

// Photo page validation
function goToPoints() {
  const before = document.getElementById("beforePhoto").files[0];
  const after = document.getElementById("afterPhoto").files[0];
  if (!before || !after) {
    alert("Upload both before and after photos");
    return;
  }
  showPage("pointsPage");
}

// On load: default page and chart
window.onload = () => {
  if (localStorage.getItem("isLoggedIn") === "true") {
    showPage("photoPage");
  } else {
    showPage("authPage");
  }

  // Chart
  new Chart(document.getElementById("myChart"), {
    type: "bar",
    data: {
      labels: ["Jan", "Feb", "Mar", "Apr"],
      datasets: [{
        label: "Points Earned",
        data: [20, 40, 60, 150],
        backgroundColor: "#28a745"
      }]
    },
    options: {
      responsive: true,
      scales: { y: { beginAtZero: true } }
    }
  });
};
