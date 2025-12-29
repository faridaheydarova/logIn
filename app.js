
 
  const token = getCookie("access_token");
  if (token) {
    window.location.href = "test.html";
  }

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}


document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const btn = document.getElementById("loginBtn");
  const oldText = btn.textContent;

  btn.textContent = "Loading...";
  btn.disabled = true;

 

  try {
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    const res = await fetch("https://guest-api.garakhanov.az/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })


    if (!res.ok) throw new Error("Email və ya şifrə səhvdir");

    const data = await res.json();
    const token = data.accessToken || data.token || data?.data?.accessToken || data?.data?.token;
    if (!token) throw new Error("Token gəlmədi");

    document.cookie = `access_token=${encodeURIComponent(token)}; Path=/; SameSite=Lax`;

    window.location.href = "test.html";
  } catch (err) {
    alert(err.message);
  } finally {
    btn.textContent = oldText;
    btn.disabled = false;
  }
});
