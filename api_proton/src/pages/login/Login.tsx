import { useEffect, useState } from "react";
import "./Login.css";
import FormInput from "./FormInput";
import Swal from "sweetalert2";
// import {
//     useEffectSession,
//     useSessionStorageOrDefault,
// } from "../../control/useSessionStorage";
import { useNavigate } from "react-router-dom";
import { MenuSuperiorLogin } from "../../shared/components/menu_superior/MenuSuperiorLogin";
import { BaseURL } from "../../control/BaseURL";

export const Login = () => {
  const [user, setUser] = useState({
    usuario_id: 1,
    usuario_nome: "",
    usuario_senha: "",
    usuario_data_cadastro: new Date(),
    usuario_nivel: "",
    usuario_email: "",
  });

  const Efeito = async () => {
    navigate("/home");
    window.location.reload();
  };

  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const [usuarioAtual, setUsuarioAtual] = useState(user);
  const [isSucesso, setIsSucesso] = useState(false);
  //useEffectSession("perfil", usuarioAtual);

  const inputs = [
    {
      id: 1,
      name: "email",
      type: "email",
      placeholder: "Email",
      errorMessage: "Por favor, insira um email válido.",
      // label: "Email",
      required: true,
    },
    {
      id: 2,
      name: "password",
      type: "password",
      placeholder: "Senha",
      errorMessage: "Por favor, insira a senha correta",
      // "Sua senha deve ter de 6 a 20 caracteres e incluir pelo menos uma letra, um número e um caractere especial.",

      // Padrão que detecta todas as condições:
      // pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,20}$`,
      // Padrão que detecta apenas se tem entre 5 e 20 caracteres:
      pattern: `^.{5,20}$`,
      required: true,
    },
  ];
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (login.email === "" || login.password === "") {
      Swal.fire({
        title: "Por favor, insira todos os dados corretamente!",
        customClass: "swalFire",
        confirmButtonText: '<span style="font-size: 15px; color: black;">OK</span>',
        confirmButtonColor: "#b6f3f8",
      });
    } else {
      // Prepare the data to be sent to the server
      const email = login.email;
      const senha = login.password;
      try {
        // Make an HTTP GET request to the server
        const response = await fetch(`${BaseURL()}/get_usuario_login/${email}/${senha}`);
        const jsonData = await response.json();
        setUser(jsonData);
        setUsuarioAtual(jsonData);
        setIsSucesso(true);
        setTimeout(Efeito, 1000);
      } catch (error: any) {
        setIsSucesso(false);
        console.log(error.message);
        Swal.fire({
          title: "Não foi possível encontrar este usuário",
          customClass: "swalFire",
          icon: "error",
          confirmButtonText: '<span style="font-size: 15px; color: black;">OK</span>',
          confirmButtonColor: "#b6f3f8",
        });
      }
    }
  };

  useEffect(() => {
    //"{\"usuario_id\":2,\"usuario_nome\":\"Samuel Henrique (CB)\",\"usuario_senha\":\"fatec123\",\"usuario_data_cadastro\":\"2023-09-08T03:00:00.000Z\",\"usuario_nivel\":\"CB\",\"usuario_email\":\"samuel.henrique@fatec.com\"}"

    //"{\"usuario_id\":1,\"usuario_nome\":\"Alexandre Jonas (LE)\",\"usuario_senha\":\"fatec\",\"usuario_data_cadastro\":\"2023-09-07T03:\00:\00.000Z\",\"usuario_nivel\":\"LE\",\"usuario_email\":\"alexandre.jonas@fatec.com"}"

    sessionStorage.setItem(
      "perfil",
      JSON.stringify(usuarioAtual)
        .replaceAll("{", `"{\\`)
        .replace('"}', `\\"}"`)
        .replaceAll("usuario_id", "usuario_id\\")
        .replaceAll(",", ",\\")
        .replaceAll("usuario_nome", "usuario_nome\\")
        .replaceAll("usuario_senha", "usuario_senha\\")
        .replaceAll("usuario_data_cadastro", "usuario_data_cadastro\\")
        .replaceAll("usuario_nivel", "usuario_nivel\\")
        .replaceAll("usuario_email", "usuario_email\\")
        .replaceAll(":", ":\\")
        .replace(":\\", ":")
        .replaceAll(`",`, `\\",`)
        .replaceAll(":\\00:\\00.000Z", ":00:00.000Z")
    );
  }, [usuarioAtual]);

  // const onChange = (e: any) => {
  //     setLogin({ ...login, [e.target.name]: e.target.value });
  // };

  const onChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setLogin((prevLogin) => ({
      ...prevLogin,
      [name]: value,
    }));
  };

  //   const idk = async () => {
  //     setTimeout(validaCadastro, 1000);
  //   };

  return (
    <MenuSuperiorLogin>
      <div className="container-login">
        <form className="form-cadastro" onSubmit={handleSubmit}>
          <h1 className="h1-cadastro">Login</h1>
          {inputs.map((input) => (
            <FormInput
              key={input.id}
              {...input}
              // value={values[input.name]}
              onChange={onChange}
            />
          ))}

          <button type="submit" className="button-cadastro">
            Login
          </button>
        </form>
      </div>
    </MenuSuperiorLogin>
  );
};
