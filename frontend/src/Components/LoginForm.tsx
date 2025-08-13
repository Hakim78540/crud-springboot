import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [showPwd, setShowPwd] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        throw new Error("Identifiants invalides");
      }

      const data = await res.json();
      // Persistance du token : localStorage si "se souvenir", sinon sessionStorage
      const storage = remember ? localStorage : sessionStorage;
      storage.setItem("token", data.token);

      navigate("/persons", { replace: true });
    } catch (err: any) {
      setError(err.message || "Échec de la connexion");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-10 col-lg-8 col-xl-7">
            <div className="card shadow-lg border-0 overflow-hidden">
              <div className="row g-0">
                {/* Bandeau gauche (branding) */}
                <div className="col-md-5 d-none d-md-flex flex-column justify-content-center bg-primary text-white p-4">
                  <div>
                    <div className="fs-4 fw-bold mb-2">
                      <i className="bi bi-people me-2" />
                      PeopleApp
                    </div>
                    <p className="mb-0 text-white-50">
                      Connectez-vous pour gérer vos contacts en toute simplicité.
                    </p>
                  </div>
                </div>

                {/* Formulaire */}
                <div className="col-md-7 bg-body p-4 p-md-5">
                  <h1 className="h4 fw-semibold mb-3">Connexion</h1>
                  <p className="text-secondary mb-4">
                    Entrez vos identifiants pour accéder à l’application.
                  </p>

                  {error && (
                    <div className="alert alert-danger d-flex align-items-center" role="alert">
                      <i className="bi bi-exclamation-triangle me-2" />
                      <div>{error}</div>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} noValidate>
                    {/* Username */}
                    <div className="mb-3">
                      <label className="form-label" htmlFor="username">
                        Nom d’utilisateur
                      </label>
                      <div className="input-group">
                        <span className="input-group-text">
                          <i className="bi bi-person" />
                        </span>
                        <input
                          id="username"
                          className="form-control"
                          type="text"
                          autoComplete="username"
                          placeholder="votre.email@example.com"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          required
                          disabled={loading}
                        />
                      </div>
                    </div>

                    {/* Password */}
                    <div className="mb-3">
                      <label className="form-label" htmlFor="password">
                        Mot de passe
                      </label>
                      <div className="input-group">
                        <span className="input-group-text">
                          <i className="bi bi-lock" />
                        </span>
                        <input
                          id="password"
                          className="form-control"
                          type={showPwd ? "text" : "password"}
                          autoComplete="current-password"
                          placeholder="••••••••"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                          disabled={loading}
                        />
                        <button
                          type="button"
                          className="btn btn-outline-secondary"
                          onClick={() => setShowPwd((s) => !s)}
                          tabIndex={-1}
                          disabled={loading}
                          aria-label={showPwd ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                        >
                          <i className={`bi ${showPwd ? "bi-eye-slash" : "bi-eye"}`} />
                        </button>
                      </div>
                    </div>

                    {/* Options */}
                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <div className="form-check">
                        <input
                          id="remember"
                          className="form-check-input"
                          type="checkbox"
                          checked={remember}
                          onChange={(e) => setRemember(e.target.checked)}
                          disabled={loading}
                        />
                        <label className="form-check-label" htmlFor="remember">
                          Se souvenir de moi
                        </label>
                      </div>
                      <a href="#" className="link-secondary text-decoration-none">
                        Mot de passe oublié ?
                      </a>
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      className="btn btn-primary w-100"
                      disabled={loading || !username || !password}
                    >
                      {loading ? (
                        <>
                          <span
                            className="spinner-border spinner-border-sm me-2"
                            role="status"
                            aria-hidden="true"
                          />
                          Connexion…
                        </>
                      ) : (
                        <>
                          <i className="bi bi-box-arrow-in-right me-2" />
                          Se connecter
                        </>
                      )}
                    </button>
                  </form>

                  <div className="text-center mt-4 text-secondary small">
                    Besoin d’un compte ? <a href="#" className="text-decoration-none">Contactez l’admin</a>.
                  </div>
                </div>
              </div>
            </div>

            {/* Footer discret */}
            <div className="text-center text-secondary small mt-3">
              © {new Date().getFullYear()} PeopleApp • Sécurité par JWT
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
