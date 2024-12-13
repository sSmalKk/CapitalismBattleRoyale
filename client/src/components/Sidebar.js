import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importa a função para navegação

// Estilos básicos para o Sidebar e layout de 12 colunas
const styles = {
  container: {
    display: "grid",
    gridTemplateColumns: "2fr 10fr", // 2 colunas para o Sidebar, 10 colunas para o conteúdo
    height: "100vh",
  },
  sidebarContainer: {
    display: "flex",
    flexDirection: "column", // Itens alinhados verticalmente
    justifyContent: "center", // Centraliza os itens verticalmente
    alignItems: "center", // Centraliza os itens horizontalmente
    backgroundColor: "#1d1f21",
    color: "#fff",
    padding: "10px",
    zIndex: 99,
    height: "100vh", // Sidebar ocupa toda a altura da tela
  },
  mainMenu: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    width: "100%",
  },
  menuItem: {
    marginBottom: "10px",
  },
  menuButton: {
    backgroundColor: "transparent",
    border: "none",
    color: "#fff",
    fontSize: "16px",
    cursor: "pointer",
    width: "100%",
    textAlign: "center", // Centraliza o texto dos botões
  },
  subMenu: {
    listStyle: "none",
    padding: "5px 0 0 20px",
  },
  subMenuItem: {
    marginBottom: "5px",
  },
  subMenuButton: {
    backgroundColor: "transparent",
    border: "none",
    color: "#ccc",
    fontSize: "14px",
    cursor: "pointer",
    textAlign: "left",
  },
};

// Lista de páginas principais e suas subpáginas
const pages = [
  {
    name: "Home",
    subPages: [],
    route: "/Dashboard", // Rota para a página Home
  },
  {
    name: "ItemCreator",
    subPages: [
      { name: "Item ", route: "/ItemCreator/Item" },
      { name: "ItemList", route: "/ItemCreator/ItemList" },
      { name: "Model", route: "/ItemCreator/Model" },
      { name: "ModelList", route: "/ItemCreator/ModelList" },
      { name: "Texture", route: "/ItemCreator/texture" },
      { name: "TextureList", route: "/ItemCreator/TextureList" },
      { name: "TextureMap", route: "/ItemCreator/TextureMap" },
      { name: "TextureMapList", route: "/ItemCreator/TextureMapList" },
      { name: "TexturePart", route: "/ItemCreator/TexturePart" },
      { name: "TexturePartList", route: "/ItemCreator/TexturePartList" },

    ],
  },
  {
    name: "Universe",
    subPages: [
      { name: "Chunks", route: "/world/chunks" },
      { name: "Biomes", route: "/world/biomes" },
      { name: "Settings", route: "/world/settings" },
    ],
  },
  // Adicione outras páginas conforme necessário
];

export function Sidebar() {
  const [activePage, setActivePage] = useState(null); // Para controlar a página aberta
  const [activeSubPage, setActiveSubPage] = useState(null); // Para controlar subpáginas
  const navigate = useNavigate(); // Hook do React Router para navegação

  const handlePageClick = (page) => {
    // Se a página for clicada novamente, fecha-a (com null)
    setActivePage(page === activePage ? null : page);
    setActiveSubPage(null); // Reseta o submenu ao abrir outra página

    // Se existir uma rota, navega para ela
    if (page.route) {
      navigate(page.route);
    }
  };

  const handleSubPageClick = (subPage) => {
    setActiveSubPage(subPage.name);

    // Se existir uma rota na subpágina, navega para ela
    if (subPage.route) {
      navigate(subPage.route);
    }
  };

  return (
    <div style={styles.sidebarContainer}>
      <ul style={styles.mainMenu}>
        {pages.map((page, index) => (
          <li key={index} style={styles.menuItem}>
            <button
              style={styles.menuButton}
              onClick={() => handlePageClick(page)}
            >
              {page.name}
            </button>
            {activePage === page && page.subPages.length > 0 && (
              <ul style={styles.subMenu}>
                {page.subPages.map((subPage, subIndex) => (
                  <li key={subIndex} style={styles.subMenuItem}>
                    <button
                      style={styles.subMenuButton}
                      onClick={() => handleSubPageClick(subPage)}
                    >
                      {subPage.name}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
