import { useState } from "react";
import "./Cadastro.css";
import FormInput from "./FormInput";

const App = () => {
    const [values, setValues] = useState({
        username: "",
        email: "",
        birthday: "",
        password: "",
        confirmPassword: "",
    });

    const inputs = [
        {
            id: 1,
            name: "username",
            type: "text",
            placeholder: "Nome",
            errorMessage:
                "Seu nome deve ter de 3 a 16 caracteres e não pode incluir nenhum caractere especial!",
            // label: "Nome",
            pattern: "^[A-Za-z0-9]{3,16}$",
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
            errorMessage:
                "Sua senha deve ter de 6 a 20 caracteres e incluir pelo menos uma letra, um número e um caractere especial.",
            // label: "Password",
            pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,20}$`,
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
    };

    const onChange = (e: any) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    return (
        <div className="app">
            <form onSubmit={handleSubmit}>
                <h1>Novo usuário</h1>
                {inputs.map((input) => (
                    <FormInput
                        key={input.id}
                        {...input}
                        // value={values[input.name]}
                        onChange={onChange}
                    />
                ))}
                <button>Cadastrar</button>
            </form>
        </div>
    );
};

export default App;
