import { useState } from "react";
import "./Cadastro.css";
import FormInput from "./FormInput";

export const Cadastro = () => {
    const [values, setValues] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        userLevel: "",
    });

    const inputs = [
        {
            id: 1,
            name: "username",
            type: "text",
            placeholder: "Nome",
            errorMessage:
                "Seu nome deve ter de 4 a 40 caracteres e não pode incluir nenhum caractere especial!",
            // label: "Nome",
            pattern: "^[A-Za-z0-9 ]{4,40}$",
            required: true,
        },
        {
            id: 2,
            name: "email",
            type: "email",
            placeholder: "Email",
            errorMessage: "Por favor insira um email válido.",
            // label: "Email",
            required: true,
        },

        {
            id: 4,
            name: "password",
            type: "password",
            placeholder: "Senha",
            errorMessage: "Sua senha deve ter de 6 a 20 caracteres",
            // "Sua senha deve ter de 6 a 20 caracteres e incluir pelo menos uma letra, um número e um caractere especial.",

            // Padrão que detecta todas as condições:
            // pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,20}$`,
            // Padrão que detecta apenas se tem entre 6 e 20 caracteres:
            pattern: `^.{6,20}$`,
            required: true,
        },
        {
            id: 5,
            name: "confirmPassword",
            type: "password",
            placeholder: "Confirmar Senha",
            errorMessage: "Senhas não correspondem.",
            // label: "Confirm Password",
            pattern: values.password,
            required: true,
        },
    ];
    const handleSubmit = (e: any) => {
        e.preventDefault();

        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, "0"); // January is 0!
        const dd = String(today.getDate()).padStart(2, "0");
        const usuario_data_cadastro = `${yyyy}-${mm}-${dd}`;

        // Prepare the data to be sent to the server
        const userData = {
            usuario_nome: values.username,
            usuario_email: values.email,
            usuario_senha: values.password,
            usuario_data_cadastro,
            usuario_nivel: values.userLevel,
        };

        // Make an HTTP POST request to the server
        fetch("http://localhost:5000/insert_usuario", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        })
            .then((response) => response.json())
            .then((data) => {
                // Handle the response from the server if needed
                console.log(data);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };

    const onChange = (e: any) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    return (
        <div className="container">
            <form className="form-cadastro" onSubmit={handleSubmit}>
                <h1 className="h1-cadastro">Novo usuário</h1>
                {inputs.map((input) => (
                    <FormInput
                        key={input.id}
                        {...input}
                        // value={values[input.name]}
                        onChange={onChange}
                    />
                ))}
                <select
                    name="userLevel"
                    className="select-cadastro"
                    onChange={onChange} // Add onChange event handler
                    value={values.userLevel} // Set the value from state
                >
                    <option value="" disabled selected hidden>
                        Nível de Usuário
                    </option>
                    <option value="CL">C-Level</option>
                    <option value="LE">Líder</option>
                    <option value="CO">Colaborador</option>
                </select>

                <button type="submit" className="button-cadastro">
                    Cadastrar
                </button>
            </form>
        </div>
    );
};
