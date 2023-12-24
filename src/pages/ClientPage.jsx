import { useContext } from "react";
import Loading from "../components/Loading";
import Error from "./Error";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import ContactList from "../components/ContactList";

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
      <header className="p-5 bg-slate-500 text-cyan-200 flex justify-around items-center">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <div className="">
          <code className="text-xl block capitalize">{newUser.name}</code>
          <code className="text-md">{newUser.email}</code>
        </div>
      </header>

      <section className="max-w-md mx-auto my-10">
        <h2 className="text-2xl font-semibold">Contact List</h2>
        {<ContactList />}
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
