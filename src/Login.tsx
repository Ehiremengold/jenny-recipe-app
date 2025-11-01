import { useState, type ChangeEvent } from "react";
import Layout from "./component/Layout";

const Login = () => {
  const [errors, setErrors] = useState({
    emailError: "",
    passwordError: "",
  });

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  function validateEmail(email: string) {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  function validatePassword(password: string) {
    return password.length >= 6;
  }

  const handleEmailInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormData((prev) => ({
      ...prev,
      email: value,
    }));
    if (!validateEmail(value)) {
      setErrors((prev) => ({
        ...prev,
        emailError: "Please enter valid email address",
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        emailError: "",
      }));
    }
  };
  const handlePasswordInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setFormData((prev) => ({
      ...prev,
      password: value,
    }));

    if (!validatePassword(value)) {
      setErrors((prev) => ({
        ...prev,
        passwordError: "Password must be at least 6 characters",
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        passwordError: "",
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const emailIsValid = validateEmail(formData.email);
    const passwordIsValid = validatePassword(formData.password);

    if (!emailIsValid || !passwordIsValid) {
      setErrors({
        emailError: emailIsValid ? "" : "Please enter a valid email",
        passwordError: passwordIsValid
          ? ""
          : "Password must be at least 6 characters",
      });
      return; // stops the form submission if there are any invalid fields
    }

    console.log("Submitted Data: ", formData);
  };

  return (
    <Layout>
      <div className="mt-10 flex flex-col mx-auto w-full">
        <div className="bg-white rounded-2xl p-5 my-8 max-w-xl mx-auto w-full">
          <div className="text-center text-black mt-6">
            <h1 className="text-xl font-medium">Login</h1>
            <p className="text-gray-500">Sign in to see saved recipes</p>
          </div>
          <form className="flex flex-col gap-4 mt-6" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-1">
              <label htmlFor="email" className="text-gray-600 text-sm">
                Email
              </label>
              <input
                value={formData.email}
                onChange={handleEmailInput}
                type="email"
                placeholder="eriso@yopmail.com"
                className="border p-2 rounded border-gray-400 text-black placeholder:text-sm placeholder:text-gray-400"
              />
              {errors.emailError && (
                <p className="text-sm text-red-500">{errors.emailError}</p>
              )}
            </div>
            <div className="gap-1 flex flex-col">
              <label htmlFor="password" className="text-gray-600 text-sm">
                Password
              </label>
              <input
                value={formData.password}
                onChange={handlePasswordInput}
                type="password"
                placeholder="Password"
                className="border p-2 rounded text-black border-gray-400 placeholder:text-sm placeholder:text-gray-400"
              />

              <p
                className={`text-sm text-red-500 ${
                  errors.passwordError ? "opacity-100" : "opaci"
                } transition-opacity duration-300 `}
              >
                {errors.passwordError}
              </p>
            </div>
            <div className="flex justify-end">
              <a href="#" className="text-sm text-blue-500 hover:underline">
                Forgot password?
              </a>
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white p-3 rounded-lg mt-2 hover:bg-blue-600 transition"
            >
              Login
            </button>
            <div className="text-center text-gray-500 text-sm mt-4">
              Don't have an account?{" "}
              <a href="#" className="text-blue-500 hover:underline">
                Sign up
              </a>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
