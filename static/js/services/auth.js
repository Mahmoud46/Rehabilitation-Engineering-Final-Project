export async function login(login_credentials) {
  document.querySelector(".loader_pop").classList.add("active");
  try {
    const res = await fetch(`${window.origin}/api/auth/login`, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify(login_credentials),
      cache: "no-cache",
      headers: new Headers({
        "content-type": "application/json",
      }),
    });

    const data = await res.json();
    if (!data.success) alert(data.message);
    else location.reload();
  } catch (error) {
    alert(error.message);
  } finally {
    document.querySelector(".loader_pop").classList.remove("active");
  }
}

export async function signup(signup_credentials) {
  document.querySelector(".loader_pop").classList.add("active");
  try {
    const res = await fetch(`${window.origin}/api/auth/signup`, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify(signup_credentials),
      cache: "no-cache",
      headers: new Headers({
        "content-type": "application/json",
      }),
    });

    if (res.status == 200)
      document.querySelector(".ptsd_test_pop").classList.add("active");
    else {
      const data = await res.json();
      if (!data.success) alert(data.message);
      else location.reload();
    }
  } catch (error) {
    alert(error.message);
  } finally {
    document.querySelector(".loader_pop").classList.remove("active");
  }
}

export async function logout() {
  document.querySelector(".loader_pop").classList.add("active");
  try {
    const res = await fetch(`${window.origin}/api/auth/logout`, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({}),
      cache: "no-cache",
      headers: new Headers({
        "content-type": "application/json",
      }),
    });

    if (!res.ok) alert("Something went wrong!");
    else location.reload();
  } catch (error) {
    alert(error.message);
  } finally {
    document.querySelector(".loader_pop").classList.remove("active");
  }
}
