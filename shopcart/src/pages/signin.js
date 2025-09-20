// src/pages/signin.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
  const navigate = useNavigate();
  const appId = process.env.REACT_APP_FB_APP_ID; // optional
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // Load Facebook SDK only if App ID provided
  useEffect(() => {
    if (!appId) return;
    window.fbAsyncInit = function () {
      window.FB.init({
        appId,
        cookie: true,
        xfbml: false,
        version: "v18.0",
      });
    };
    (function (d, s, id) {
      if (d.getElementById(id)) return;
      const js = d.createElement(s);
      js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      const fjs = d.getElementsByTagName(s)[0];
      fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");
  }, [appId]);

  const goCheckout = () => navigate("/checkout");

  // Basic form login (simulated)
  const handleFormLogin = (e) => {
    e.preventDefault();
    const safeName = (name || "").trim() || "Rich West"; // matches screenshot if empty
    localStorage.setItem("userName", safeName);
    localStorage.setItem("userEmail", (email || "").trim());
    goCheckout();
  };

  // Facebook login (real if App ID present, else simulated)
  const handleFBLogin = () => {
    // Simulate if no App ID or SDK not ready
    if (!appId || !window.FB) {
      localStorage.setItem("userName", "Rich West"); // screenshot name
      localStorage.setItem("userEmail", "");
      goCheckout();
      return;
    }

    // Real FB login
    window.FB.login(
      (res) => {
        if (!res.authResponse) return alert("Facebook login cancelled.");
        // Fetch basic profile to greet user
        window.FB.api("/me", { fields: "name,email" }, (profile) => {
          localStorage.setItem("userName", profile?.name || "Facebook User");
          localStorage.setItem("userEmail", profile?.email || "");
          goCheckout();
        });
      },
      { scope: "public_profile,email" }
    );
  };

  return (
    <div className="container py-3">
      <div className="card">
        <div className="card-header">
          <h4 className="mb-0">Sign In</h4>
        </div>
        <div className="card-body">
          <p className="mb-3">Please login using one of the following:</p>

          {/* small boxed form (left) */}
          <form
            onSubmit={handleFormLogin}
            className="border p-3 mb-3"
            style={{ maxWidth: 280 }}
          >
            <div className="mb-2">
              <label className="form-label mb-1">Name:</label>
              <input
                type="text"
                className="form-control form-control-sm"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="mb-2">
              <label className="form-label mb-1">Email:</label>
              <input
                type="email"
                className="form-control form-control-sm"
                placeholder="Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <button type="submit" className="btn btn-success btn-sm">
              Login
            </button>
          </form>

          {/* FB login button (blue) */}
          <button
            className="btn btn-primary"
            style={{ textTransform: "uppercase" }}
            onClick={handleFBLogin}
          >
            Login with Facebook
          </button>
        </div>
      </div>
    </div>
  );
}
