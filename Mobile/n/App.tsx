import User from "./src/components/user/user";
import Login from './src/components/login/login';
import Ranking from './src/components/ranking/ranking';
import Progress from "./src/components/progress/Progress";
import { useState } from "react";

export default function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(!true);
  const [user, setUser] = useState()


  return (
    <>
      {!isAuthenticated ? <Login user={setUser} authenticate={setIsAuthenticated} /> :

        <>
          <User logout ={setIsAuthenticated} user={user} />
          <Progress user={user} />
          <Ranking />
          
        </>
      }
    </>
  );
}
