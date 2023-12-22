import { useContext, useState } from "react";
import { UserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const { login, setErrorMessage, setNewUser } = useContext(UserContext);

  const [userRole, setUserRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userRole) {
      setError(true);
    } else {
      setNewUser([]);
      setError(false);
      setErrorMessage({
        isError: false,
        message: null,
      });
      login(userRole, email, password);
      navigate(`/user/${userRole}`);
    }
  };

  return (
    <section className="w-full p-5 max-w-md mx-auto px-8 py-6">
      <h2 className="text-3xl font-bold">Login</h2>
      <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
        <div onChange={(e) => setUserRole(e.target.value)} className="mt-8">
          <label className="cursor-pointer">
            <input type="radio" value="client" name="user-role" />
            <span className="ml-2 text-base font-semibold">Client</span>
          </label>

          <label className="ml-5 cursor-pointer">
            <input type="radio" value="admin" name="user-role" />
            <span className="ml-2 text-base font-semibold">Admin</span>
          </label>

          {error ? (
            <span className="ml-2 text-base font-semibold text-red-500">
              User role required!
            </span>
          ) : null}
        </div>

        <label className="block">
          <span className="block text-md font-semibold mb-2">Email</span>
          <input
            className="py-2 px-4 border-solid border-2 border-slate-600 font-semibold text-md outline-none w-full placeholder:font-normal"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="ex: Jhon@email.com"
            required
          />
        </label>

        <label className="block">
          <span className="block text-md font-semibold mb-2">Password</span>
          <input
            className="py-2 px-4 border-solid border-2 border-slate-600 font-semibold text-md outline-none w-full placeholder:font-normal"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="******"
            required
          />
        </label>

        <button
          type="submit"
          className="text-lg font-semibold px-7 py-3 bg-slate-700 text-slate-50 cursor-pointer hover:opacity-90"
        >
          Login
        </button>
      </form>
    </section>
  );
};

export default LoginForm;
