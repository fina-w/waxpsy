import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";
import { loginUser } from "../services/api";

interface LoginProps {
  onSuccess?: () => void;
  onClose?: () => void;
}

const Login: React.FC<LoginProps> = ({ onSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuthStore();

  // Load saved email if remember me was checked
  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberedEmail");
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setMessage("All fields are required");
      return;
    }
    try {
      const user = await loginUser(email, password);

      // Normalize the user object stored in the auth store
      const userToStore = {
        id: Number(user.id),
        nom: user.nom || user.name || "",
        email: user.email,
        role: user.role,
        avatar: user.imageUrl || user.avatar || undefined,
      };
      login(userToStore);

      // Handle remember me functionality
      if (rememberMe) {
        localStorage.setItem("rememberedEmail", email);
      } else {
        localStorage.removeItem("rememberedEmail");
      }

      if (onSuccess) {
        onSuccess();
      } else {
        const from = (location.state as Record<string, unknown>)
          ?.from as string;
        if (from) {
          navigate(from);
        } else {
          // Redirect based on detected role
          if (user.role === "administrateur") {
            navigate("/admin");
          } else if (user.role === "professionnel") {
            navigate("/dashbordprofessionnal");
          } else {
            navigate("/home");
          }
        }
      }
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : "Erreur lors de la connexion"
      );
    }
  };

  return (
    <div className="flex h-screen bg-[#C8FACC]  justify-center items-center font-sans">
      <div className="flex bg-white shadow-lg overflow-hidden w-[900px] h-[550px] rounded-[40px]">
        {/* Image à gauche */}
        <div className="w-1/2 bg-gray-100 flex justify-center items-center rounded-l-[40px] overflow-hidden">
          <img
            src="/login-register.png"
            alt="Mental Health Awareness"
            className="w-[90%] h-[90%] object-contain"
            loading="lazy"
          />
        </div>

        {/* Formulaire */}
        <div className="w-1/2 flex flex-col items-center justify-center p-10 rounded-r-[40px]">
          {/* Logo */}
          <div className="flex items-center mb-5">
            <img
              src="public/black-logo.png"
              alt="Logo"
              className="w-55 h-auto mr-3"
            />
          </div>

          <h2 className="font-bold text-2xl mb-5">Connexion</h2>

          <form onSubmit={handleSubmit} className="w-full max-w-xs">
            <label className="block mb-1 font-semibold text-sm">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 mb-3 rounded-full border border-gray-300 text-sm"
            />

            <label className="block mb-1 font-semibold text-sm">
              Mot de passe
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 mb-2 rounded-full border border-gray-300 text-sm"
            />

            {/* Remember Me Checkbox and Forgot Password Link */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="rememberMe"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="mr-2"
                />
                <label htmlFor="rememberMe" className="text-sm text-gray-600">
                  Se souvenir de moi
                </label>
              </div>
              <button
                type="button"
                onClick={() => setShowForgotPassword(true)}
                className="text-sm text-red-600 hover:underline"
              >
                Mot de passe oublié ?
              </button>
            </div>

            <button
              type="submit"
              className="w-full bg-green-800 text-white py-2 rounded-full text-lg hover:bg-green-900 transition-colors"
            >
              Se Connecter
            </button>
          </form>

          {message && <p className="mt-4 text-sm text-red-600">{message}</p>}

          <p className="mt-4 text-xs">
            Pas de compte ?{" "}
            <Link
              to="/register"
              className="text-green-800 font-bold hover:underline"
            >
              S'inscrire
            </Link>
          </p>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {showForgotPassword && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Mot de passe oublié</h3>
            <p className="text-sm text-gray-600 mb-4">
              Entrez votre adresse email et nous vous enverrons un lien pour
              réinitialiser votre mot de passe.
            </p>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                  placeholder="votre.email@example.com"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => {
                  setShowForgotPassword(false);
                  setForgotEmail("");
                }}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200"
              >
                Annuler
              </button>
              <button
                onClick={() => {
                  // TODO: Implement password reset logic
                  alert(
                    `Un email de réinitialisation a été envoyé à ${forgotEmail}`
                  );
                  setShowForgotPassword(false);
                  setForgotEmail("");
                }}
                className="px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md hover:bg-green-700"
              >
                Envoyer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
