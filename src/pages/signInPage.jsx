import { useContext, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import AuthContext from "../contexts/AuthContext";
import { ThreeDots } from "react-loader-spinner";

export default function SignInPage() {

    const {setToken} = useContext(AuthContext);
    const {setName} = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [isSubmiting, setIsSubmiting] = useState(false);
    const navigate = useNavigate();

    function signIn(e) {
        e.preventDefault();
        setIsSubmiting(true);
        const data = {
            email: email,
            password: senha
        };
        
        const promise = axios.post("https://mecansei.onrender.com/signIn", data);
        promise.then((response) => {
            setToken(response.data.token);
            setName(response.data.name);
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("name", response.data.name);
            navigate("/storePage");
        }).catch(error => {
            console.error("Erro:", error);
            Swal.fire({
                title: 'Erro',
                text: error.response.data.message,
                icon: 'error',
                confirmButtonText: 'Ok'
            });
        }).finally(() => {
			setIsSubmiting(false);
		});
    };
    return (
        <SignInConteiner>
            <LogoConteiner>
                <LogoImg src="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRdPmhNa0zJrX0rXeQSo9UVSeE5eQxz_4X4g_15HflV0EtHjK4Q" alt="Logo da empresa" />
                <LogoName>MeCansei</LogoName>
            </LogoConteiner>
            <FormConteiner onSubmit={signIn}>
                <input type="text" required value={email} onChange={e => setEmail(e.target.value)} placeholder="E-mail" />
                <input type="password" required value={senha} onChange={e => setSenha(e.target.value)} placeholder="Senha" />
                <button type="submit" disabled={isSubmiting}>
                    {isSubmiting ? <ThreeDots color="black" width="40" height="40" /> : "Realizar login"}
                </button>
                <Link to={`/signUp`} >
                    <p>Faça seu cadastro aqui</p>
                </Link>
            </FormConteiner>
        </SignInConteiner>
    );
}

const SignInConteiner = styled.div`
    width: 100%;
    height: 100vh;
    overflow-x: hidden;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #1670df;
`;

const LogoConteiner = styled.div`
    width: 300px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: -150px;
`;

const LogoImg = styled.img`
    background-image: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRdPmhNa0zJrX0rXeQSo9UVSeE5eQxz_4X4g_15HflV0EtHjK4Q";
    border-radius: 100%;
    width: 330px;
    height: 300px;
    margin-bottom: 15px;
`;

const LogoName = styled.p`
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
    margin-top: 75px;

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
        display: flex;
        align-items: center;
        justify-content: center;
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

