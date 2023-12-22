import { useContext } from "react";
import { UserContext } from "../context/userContext";
import { Link } from "react-router-dom";

const Error = () => {
  const { errorMessage } = useContext(UserContext);
  return (
    <main className="w-full text-center mt-10">
      <p className="text-xl font-semibold capitalize text-red-400">
        {errorMessage.message ? errorMessage.message : null}
      </p>

      <Link
        to="/"
        className="mt-4 font-semibold text-lg px-8 py-2 bg-slate-500 text-cyan-100 inline-block"
      >
        Back to Login
      </Link>
    </main>
  );
};

export default Error;
