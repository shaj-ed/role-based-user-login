import { useContext } from "react";
import { UserContext } from "../context/userContext";
import Loading from "../components/Loading";
import Error from "./Error";
import { Link } from "react-router-dom";

const ClientPage = () => {
  const { newUser, errorMessage, loading } = useContext(UserContext);

  if (newUser.length === 0 && loading) {
    return <Loading />;
  }

  if (errorMessage.isError) {
    return <Error />;
  }

  return (
    <main className="w-full">
      <header className="p-5 bg-slate-500 text-cyan-200 flex justify-around">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <h2 className="text-2xl font-semibold">Client</h2>
      </header>

      <section className="text-center mt-10">
        <code className="text-xl block capitalize">{newUser.name}</code>
        <code className="text-xl">{newUser.email}</code>
      </section>

      <section className="text-center">
        <Link
          to="/"
          className="mt-8 font-semibold text-lg px-8 py-2 bg-slate-500 text-cyan-100 inline-block text-center"
        >
          Back to Login
        </Link>
      </section>
    </main>
  );
};

export default ClientPage;
