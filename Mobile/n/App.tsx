import User from "./src/components/user/user";
import Login from './src/components/login/login';
import { useState } from "react";

export default function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(!true);
  const [user, setUser] = useState()


  return (
    <>
      {!isAuthenticated ? <Login user={setUser} authenticate={setIsAuthenticated} /> : <User user={user} />}
    </>
  );
}
