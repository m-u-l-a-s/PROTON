export function validarEdicao(pagina: string, id: number) {
  const isLoginPage =
    window.location.pathname === "/login" || window.location.pathname === "/" || window.location.pathname === "";

  if (isLoginPage) {
    return false;
  }

  let UsuarioID = puxaID().usuario_id;
  switch (pagina) {
    case "DetalheEtapa":
    case "VisualizarProjeto":
    case "Anexos":
      return !( (UsuarioID === id) || (puxaID().usuario_nivel === "AD"));

    case "MyProjects":
      return !(puxaID().usuario_nivel === "LE" || (puxaID().usuario_nivel === "AD"));

    case "MenuSuperior":
      return isLoginPage ? false : puxaID().usuario_nivel === "CL";

    case "btnCadastro":
      return isLoginPage ? false : puxaID().usuario_nivel === "AD";

    default:
  }
}

const puxaID = () => {
  try {
    const perfilJSON: any = sessionStorage.getItem("perfil");
    return JSON.parse(JSON.parse(perfilJSON));
  } catch (error) {
    return "ER";
  }
};
