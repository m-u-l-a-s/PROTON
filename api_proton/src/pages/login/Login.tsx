import { useState } from "react";
import "./Login.css";
import FormInput from "./FormInput";
import Swal from "sweetalert2";
import { useEffectSession, useSessionStorageOrDefault } from "../../control/useSessionStorage";

export const Login = () => {
    const [user, setUser] = useState(
    {
        usuario_id: 1,
        usuario_nome: "",
        usuario_senha: "",
        usuario_data_cadastro: new Date(),
        usuario_nivel: "",
        usuario_email: "",
    },
    )

    const [login,setLogin] = useState({
        email:"",
        password:"",
    })

    const [usuarioAtual, setUsuarioAtual] = useState(useSessionStorageOrDefault("perfil", user));

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
            // Padrão que detecta apenas se tem entre 6 e 20 caracteres:
            pattern: `^.{6,20}$`,
            required: true,
        }
    ];
    const handleSubmit = async (e: any) => {
        e.preventDefault();

        // Prepare the data to be sent to the server
        const userData = {
            email: login.email,
            senha: login.password,
        };

        // Testes de login e senha
        // console.log(login.email)
        // console.log(login.password)

        // Make an HTTP GET request to the server
        await fetch(`http://localhost:5000/get_usuario_login/${userData.email}/${userData.senha}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        })
            .then(async (response) => {
            const joselito:any = await response.json();
            setUser(joselito);
            setUsuarioAtual(user);

            //TESTES
            console.log(joselito)
            console.log(user);
            console.log(usuarioAtual)
            
            //Efeito();
            })
            .then((data) => {
                // Handle the response from the server if needed
                console.log(data);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };

    const Efeito = () =>{
        useEffectSession("perfil", usuarioAtual);
    }

    // validação do cadastro c/ uso do SweetAlert2
    const validaCadastro = () =>{
        if (login.email==="" || login.password === ""){
            Swal.fire({
                title: "Por favor, insira todos os dados corretamente!",
                customClass: "swalFire",
                confirmButtonText: '<span style="font-size: 15px; color: black;">OK</span>',
                confirmButtonColor: "#b6f3f8",
        })}
        else{
            Swal.fire({
                title: "Login efetuado com sucesso!",
                customClass: "swalFire",
                confirmButtonText: '<span style="font-size: 15px; color: black;">OK</span>',
                confirmButtonColor: "#b6f3f8",
        })
        }
    }    

    const onChange = (e: any) => {
        setLogin({ ...login, [e.target.name]: e.target.value });
    };

    return (
        <div className="container">
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

                <button type="submit" className="button-cadastro" onClick={validaCadastro} >
                    Login
                </button>
            </form>
        </div>
    );
};
