import React from "react";
import { useRoutes } from "react-router-dom";
import NotFound from "pages/NotFound";
import SandboxSurvival from "pages/SandboxSurvival";
import Login from "pages/Login";
import Register from "pages/Register";

const ProjectRoutes = () => {
  let element = useRoutes([
    {
      path: "/*",
      element: <NotFound />,
    },
    
    {
      path: "/sandboxsurvival",
      element: <SandboxSurvival />,
    },
    
    {
      path: "/Register",
      element: <Register />,
    },{
      path: "/",
      element: <Login />,
    },
  ]);

  return element;
};

export default ProjectRoutes;
