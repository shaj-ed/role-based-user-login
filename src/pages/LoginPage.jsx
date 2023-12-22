import LoginForm from "../components/LoginForm";
import { UserContextProvider } from "../context/userContext";

const LoginPage = () => {
  return (
    <UserContextProvider>
      <main className="w-full">
        <LoginForm />
      </main>
    </UserContextProvider>
  );
};

export default LoginPage;
