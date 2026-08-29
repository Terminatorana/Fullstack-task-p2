document.getElementById("signup-form").addEventListener("submit", async function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const messageEl = document.getElementById("message");

  try {
    const response = await fetch("/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email })
    });

    const data = await response.json();
    messageEl.textContent = data.message;
  } catch (err) {
    messageEl.textContent = "Something went wrong. Please try again.";
  }
});