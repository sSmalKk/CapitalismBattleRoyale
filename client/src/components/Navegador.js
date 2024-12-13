import { useNavigate } from "react-router-dom"; // Hook do React Router para navegação

const Navegador = () => {
  const navigate = useNavigate();

  const navegar = (path) => {
    navigate(path);
  };

  return { navegar };
};

export default Navegador;
