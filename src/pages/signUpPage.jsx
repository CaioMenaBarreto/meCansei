import { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

export default function SignUpPage() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [cpf, setCpf] = useState("");
    const [phone, setPhone] = useState("");
    const navigate = useNavigate();

    function signUp(e) {
        e.preventDefault();

        function formatCpf(value) {
            const numericValue = value.replace(/\D/g, '');

            const formattedCpf = numericValue.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4');

            return formattedCpf;
        };

        function formatPhone(value) {
            const numericValue = value.replace(/\D/g, '');

            const formattedPhone = numericValue.replace(/^(\d{2})(\d{5})(\d{4})$/, '$1 $2-$3');

            return formattedPhone;
        }


        const data = {
            name: name,
            email: email,
            password: senha,
            cpf: formatCpf(cpf),
            phone: formatPhone(phone)
        };

        const promise = axios.post("https://mecansei.onrender.com/signUp", data)
        promise.then(() => {
            navigate("/");
        }).catch(error => {
            Swal.fire({
                title: 'Erro',
                text: error.response.data.message,
                icon: 'error',
                confirmButtonText: 'Ok'
            });
        });
    };

    return (
        <SignUpConteiner>
            <LogoConteiner>
                <LogoImg src="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRdPmhNa0zJrX0rXeQSo9UVSeE5eQxz_4X4g_15HflV0EtHjK4Q" alt="Logo da empresa" />
                <LogoText>Cadastre-se</LogoText>
            </LogoConteiner>
            <FormConteiner onSubmit={signUp}>
                <input type="text" required value={name} onChange={e => setName(e.target.value)} placeholder="Nome" />
                <input type="text" required value={email} onChange={e => setEmail(e.target.value)} placeholder="E-mail" />
                <input type="password" required value={senha} onChange={e => setSenha(e.target.value)} placeholder="Senha" />
                <input type="text" required value={cpf} onChange={e => setCpf(e.target.value)} placeholder="Cpf" />
                <input type="text" required value={phone} onChange={e => setPhone(e.target.value)} placeholder="Telefone com DDD" />
                <button type="submit">Realizar cadastro</button>
                <Link to={`/`} >
                    <p>Já possui cadastro? Faça login</p>
                </Link>
            </FormConteiner>
        </SignUpConteiner>
    );
}

const SignUpConteiner = styled.div`
    width: 100%;
    height: 100vh;
    overflow-x: hidden;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    background-color: #1670df;
`;

const LogoConteiner = styled.div`
    width: 300px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: -70px;
`;

const LogoImg = styled.img`
    background-image: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRdPmhNa0zJrX0rXeQSo9UVSeE5eQxz_4X4g_15HflV0EtHjK4Q";
    border-radius: 100%;
    width: 130px;
    height: 100px;
    margin-bottom: 25px;
`;

const LogoText = styled.p`
    font-size: 50px;
    color: #ffffff;
    font-family: 'Vollkorn', serif;
`;

const FormConteiner = styled.form`
    width: 300px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;

    input {
        width: 500px;
        height: 50px;
        margin-bottom: 20px;
        font-size: 24px;
        font-family: 'Vollkorn', serif;
        padding-left: 8px;
        ::placeholder{
            font-size: 35px;
        };
        background-color: white;
        border: none;
        border-radius: 7px;
    };

    button {
        width: 510px;
        height: 45px;
        border: none;
        background-color: #ffffff;
        border-radius: 7px;
        font-size: 24px;
        font-family: 'Vollkorn', serif;
        color: #1670df;
        margin-bottom: 15px;
        box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.8);
        cursor: pointer;
        &:hover {
            background-color: #1670df;
            color: #ffffff;
        }
    };

    a{
        font-size: 23px;
        font-family: 'Vollkorn', serif;
        text-decoration-line: none ;
        color: #ffffff;
        cursor: pointer;
    };
`;