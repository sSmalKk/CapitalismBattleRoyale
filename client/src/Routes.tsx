import React from "react";
import { useRoutes } from "react-router-dom";
import NotFound from "pages/NotFound";
import SandboxSurvival from "pages/SandboxSurvival";
import Login from "pages/Login";

const ProjectRoutes = () => {
  let element = useRoutes([
    {
      path: "/*",
      element: <NotFound />,
    },
    
    {
      path: "/sandboxsurvival",
      element: <SandboxSurvival />,
    },{
      path: "/",
      element: <Login />,
    },
  ]);

  return element;
};

export default ProjectRoutes;
