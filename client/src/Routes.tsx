import React from "react";
import { useRoutes } from "react-router-dom";
import NotFound from "pages/NotFound";
import SandboxSurvival from "pages/SandboxSurvival";

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
  ]);

  return element;
};

export default ProjectRoutes;
