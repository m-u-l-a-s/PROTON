import { useState } from "react";
import "./Cadastro.css";
import FormInput from "./FormInput";
import Swal from "sweetalert2";
import { MenuSuperiorCadastro } from "../../shared/components/menu_superior/MenuSuperiorCadastro";

export const Cadastro = () => {
    type FormValues = {
        username: string;
        email: string;
        password: string;
        confirmPassword: string;
        userLevel: string;
        [key: string]: string;
    };

    const [values, setValues] = useState<FormValues>({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        userLevel: "",
    });

    const limparDados = () => {
        setValues({
            username: " ",
            email: " ",
            password: "",
            confirmPassword: "",
            userLevel: "",
        });

        // Clear the text content of input fields
        inputs.forEach((input) => {
            const inputElement = document.getElementById(input.name);
            if (inputElement) {
                inputElement.textContent = "";
            }
        });
    };

    const inputs = [
        {
            id: 1,
            name: "username",
            type: "text",
            placeholder: "Nome",
            errorMessage: "Mínimo 4 caracteres e nenhum caractere especial.",
            pattern: "^\\s*[A-Za-z0-9]+\\s*$|^$| ", // Allow empty or 4-40 alphanumeric characters with optional space
            required: true,
        },
        {
            id: 2,
            name: "email",
            type: "email",
            placeholder: "Email",
            // errorMessage: "Por favor insira um email válido.",
            pattern: "^$|^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$| ",
            required: true,
        },
        {
            id: 4,
            name: "password",
            type: "password",
            placeholder: "Senha",
            // errorMessage: "Sua senha deve ter de 6 a 20 caracteres",
            pattern: `^.{0,20}$|^$| `,
            required: true,
        },
        {
            id: 5,
            name: "confirmPassword",
            type: "password",
            placeholder: "Confirmar Senha",
            // errorMessage: "Senhas não correspondem.",
            pattern: `^${values.password}.*$|^$| `, // Allow empty or match the password
            required: true,
        },
    ];

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        try {
            // Check if email is already registered
            const response = await fetch(
                `http://localhost:5000/get_usuario_id_by_email/${values.email}`
            );

            if (response.status === 200) {
                Swal.fire({
                    title: "Este email já foi cadastrado.",
                    customClass: "swalFire",
                    icon: "error",
                    confirmButtonText:
                        '<span class="poppins-text" style="font-size: 15px; color: black;">OK</span>',
                    confirmButtonColor: "#b6f3f8",
                });
                limparDados();
            } else if (response.status === 404) {
                // Email is not registered, proceed with registration
                const today = new Date();
                const yyyy = today.getFullYear();
                const mm = String(today.getMonth() + 1).padStart(2, "0");
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
                const registerResponse = await fetch(
                    "http://localhost:5000/insert_usuario",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(userData),
                    }
                );
                limparDados();

                if (registerResponse.status === 200) {
                    limparDados();

                    Swal.fire({
                        title: "Cadastro realizado com sucesso!",
                        customClass: "swalFire",
                        icon: "success",
                        confirmButtonText:
                            '<span class="poppins-text" style="font-size: 15px; color: black;">OK</span>',
                        confirmButtonColor: "#b6f3f8",
                    }).then((result) => {
                        // Check if the user clicked the "OK" button
                        if (
                            result.isDismissed ||
                            result.isConfirmed ||
                            result.isDenied
                        ) {
                            window.location.reload();
                        }
                    });
                } else {
                    Swal.fire({
                        title: "O cadastro falhou.",
                        customClass: "swalFire",
                        icon: "error",
                        confirmButtonText:
                            '<span class="poppins-text" style="font-size: 15px; color: black;">OK</span>',
                        confirmButtonColor: "#b6f3f8",
                    }).then((result) => {
                        // Check if the user clicked the "OK" button
                        if (
                            result.isDismissed ||
                            result.isConfirmed ||
                            result.isDenied
                        ) {
                            window.location.reload();
                        }
                    });
                }
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const validaCadastro = () => {
        if (
            values.username === "" ||
            values.email === "" ||
            values.password === "" ||
            values.userLevel === "" ||
            values.confirmPassword === ""
        ) {
            Swal.fire({
                title: "Por favor, insira todos os dados corretamente!",
                customClass: "swalFire",
                confirmButtonText:
                    '<span class="poppins-text" style="font-size: 15px; color: black;">OK</span>',
                confirmButtonColor: "#b6f3f8",
            });
        } else {
            Swal.fire({
                title: '<span class="poppins-text" style="font-size: 25px; color:#616161;">Cadastro efetuado com sucesso!</span>',
                customClass: "swalFire",
                confirmButtonText:
                    '<span class="poppins-text" style="font-size: 15px; color: black;">OK</span>',
                confirmButtonColor: "#b6f3f8",
            });
        }
    };

    const onChange = (e: any) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    return (
        <MenuSuperiorCadastro>
            <div className="container-cadastro">
                <form className="form-cadastro" onSubmit={handleSubmit}>
                    <h1 className="h1-cadastro">Novo usuário</h1>
                    {inputs.map((input) => (
                        <FormInput
                            key={input.id}
                            {...input}
                            value={values[input.name]}
                            onChange={onChange}
                        />
                    ))}
                    {/* salvaPerfil */}
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

                    <button
                        type="submit"
                        className="button-cadastro"
                        onClick={validaCadastro}
                    >
                        Cadastrar
                    </button>
                </form>
            </div>
        </MenuSuperiorCadastro>
    );
};
