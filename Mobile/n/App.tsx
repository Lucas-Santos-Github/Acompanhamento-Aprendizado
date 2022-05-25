import User from "./src/components/user/user";
import Login from './src/components/login/login';
import Ranking from './src/components/ranking/ranking';
import Progress from "./src/components/progress/Progress";
import React, { useState } from "react";
import { AppContextProvider } from "./src/components/contexts/appContext";


export default function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(!true);


  return (
    <>
      <AppContextProvider>
        {!isAuthenticated ? <Login authenticate={setIsAuthenticated} /> :

          <>
            <User logout={setIsAuthenticated} />
            <Progress />
            <Ranking />
          </>
        }
      </AppContextProvider>
    </>
  );
}
