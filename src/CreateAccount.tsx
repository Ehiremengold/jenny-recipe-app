import { useState, type ChangeEvent } from "react";
import Layout from "./component/Layout";

const CreateAccount = () => {
  const [errors, setErrors] = useState({
    emailError: "",
    usernameError: "",
    passwordError: "",
    confirmPasswordError: "",
  });
  const [passwordRequirements, setPasswordRequirements] = useState({
    minLength: false,
    uppercase: false,
    lowercase: false,
    number: false,
    specialCharacter: false,
  });
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  function validateEmail(email: string) {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  function validateUsername(username: string) {
    return username.length > 1;
  }

  function validatePassword(password: string) {
    const newRequirements = {
      minLength: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      specialCharacter: /[\W_]/.test(password),
    };
    setPasswordRequirements(newRequirements);
    return Object.values(newRequirements).every(Boolean);
  }

  function validateConfirmPassword(confirmPassword: string) {
    return confirmPassword === formData.password;
  }

  const handleEmailInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormData((prev) => ({ ...prev, email: value }));
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

  const handleUsernameInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormData((prev) => ({ ...prev, username: value }));
    if (!validateUsername(value)) {
      setErrors((prev) => ({
        ...prev,
        usernameError: "Username must be at least 2 characters",
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        usernameError: "",
      }));
    }
  };

  const handlePasswordInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormData((prev) => ({ ...prev, password: value }));
    const passwordValid = validatePassword(value);
    if (!passwordValid) {
      setErrors((prev) => ({
        ...prev,
        passwordError: "Complete Password Requirements",
      }));
    } else {
      setErrors((prev) => ({ ...prev, passwordError: "" }));
    }
  };

  const handleConfirmPasswordInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormData((prev) => ({ ...prev, confirmPassword: value }));
    const confirmPasswordValid = validateConfirmPassword(value);
    if (!confirmPasswordValid) {
      setErrors((prev) => ({
        ...prev,
        confirmPasswordError: "Passwords do not match",
      }));
    } else {
      setErrors((prev) => ({ ...prev, confirmPasswordError: "" }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      errors.emailError ||
      errors.usernameError ||
      errors.passwordError ||
      errors.confirmPasswordError
    ) {
      return;
    }
    console.log("Submitted Data: ", formData);
  };

  return (
    <Layout>
      <div className="mt-10 flex flex-col mx-auto w-full">
        <div className="bg-white rounded-2xl p-5 my-8 max-w-xl mx-auto w-full">
          <div className="text-center text-black mt-6">
            <h1 className="text-xl font-medium">Create Account</h1>
            <p className="text-gray-500">Sign up to save your recipes</p>
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
              <p
                className={`text-sm text-red-500 ${
                  errors.emailError ? "opacity-100" : "opacity-0"
                } transition-opacity duration-300 `}
              >
                {errors.emailError}
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="username" className="text-gray-600 text-sm">
                Username
              </label>
              <input
                value={formData.username}
                onChange={handleUsernameInput}
                type="text"
                placeholder="username"
                className="border p-2 rounded border-gray-400 text-black placeholder:text-sm placeholder:text-gray-400"
              />
              <p
                className={`text-sm text-red-500 ${
                  errors.usernameError ? "opacity-100" : "opacity-0"
                } transition-opacity duration-300 `}
              >
                {errors.usernameError}
              </p>
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
                  errors.passwordError ? "opacity-100" : "opacity-0"
                } transition-opacity duration-300 `}
              >
                {errors.passwordError}
              </p>
            </div>
            <div className="gap-1 flex flex-col">
              <label
                htmlFor="confirmPassword"
                className="text-gray-600 text-sm"
              >
                Confirm Password
              </label>
              <input
                value={formData.confirmPassword}
                onChange={handleConfirmPasswordInput}
                type="password"
                placeholder="Repeat Password"
                className="border p-2 rounded text-black border-gray-400 placeholder:text-sm placeholder:text-gray-400"
              />

              <p
                className={`text-sm text-red-500 ${
                  errors.confirmPasswordError ? "opacity-100" : "opacity-0"
                } transition-opacity duration-300 `}
              >
                {errors.confirmPasswordError}
              </p>
            </div>
            <ul className="text-xs text-gray-400 list-disc list-inside">
              <li
                className={` ${
                  passwordRequirements.minLength
                    ? "text-green-500"
                    : "text-gray-400"
                }`}
              >
                Must be at least 8 characters long
              </li>
              <li
                className={` ${
                  passwordRequirements.uppercase
                    ? "text-green-500"
                    : "text-gray-400"
                }`}
              >
                Must contain at least one uppercase letter
              </li>
              <li
                className={` ${
                  passwordRequirements.lowercase
                    ? "text-green-500"
                    : "text-gray-400"
                }`}
              >
                Must contain at least one lowercase letter
              </li>
              <li
                className={` ${
                  passwordRequirements.number
                    ? "text-green-500"
                    : "text-gray-400"
                }`}
              >
                Must contain at least one number
              </li>
              <li
                className={` ${
                  passwordRequirements.specialCharacter
                    ? "text-green-500"
                    : "text-gray-400"
                }`}
              >
                Must contain at least one special character
              </li>
            </ul>
            <button
              type="submit"
              className="bg-blue-500 text-white p-3 rounded-lg mt-2 hover:bg-blue-600 transition"
            >
              Login
            </button>
            <div className="text-center text-gray-500 text-sm mt-4">
              Already have an account?{" "}
              <a href="#" className="text-blue-500 hover:underline">
                Sign in
              </a>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default CreateAccount;
