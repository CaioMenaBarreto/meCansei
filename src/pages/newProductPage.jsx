import axios from "axios";
import styled from "styled-components";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";
import { useQuickOut } from "../hooks/useQuickOut";
import Swal from "sweetalert2";
import { IonIcon } from '@ionic/react';
import { logOutOutline } from 'ionicons/icons';

export default function newProductPage() {
    const { name, token, logout } = useContext(AuthContext);
    const [productName, setProductName] = useState("");
    const [description, setDescription] = useState("");
    const [value, setValue] = useState("");
    const [photo, setPhoto] = useState("");
    const navigate = useNavigate();
    useQuickOut();

    function goStorePage() {
        navigate("/storePage");
    };

    async function handleLogout() {
        const confirmLogout = await Swal.fire({
            title: 'Cuidado',
            text: 'Deseja realmente sair?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sim, sair!',
            cancelButtonText: 'Cancelar'
        });

        if (confirmLogout.isConfirmed) {
            await logout();
            window.location.href = "/";
        };
    };

    function postNewProduct(e) {
        e.preventDefault();

        const data = {
            name: productName,
            description: description,
            value: value,
            photo: photo
        };

        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };

        const promise = axios.post("http://localhost:5000/newProduct", data, config);
        promise.then(res => {
            Swal.fire({
                title: 'Successo',
                text: "Produto criado com sucesso!",
                icon: 'success',
                confirmButtonText: 'Ok'
            });
            navigate("/storePage");
        }).catch(error => {
            console.log(error.response.data.message);
            Swal.fire({
                title: 'Erro',
                text: error.response.data.message,
                icon: 'error',
                confirmButtonText: 'Ok'
            });
        });
    };

    return (
        <NewProductConteiner>
            <NavBar>
                <LogoConteiner>
                    <LogoImg src="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRdPmhNa0zJrX0rXeQSo9UVSeE5eQxz_4X4g_15HflV0EtHjK4Q" alt="Logo da empresa" />
                    <LogoName>MeCansei</LogoName>
                </LogoConteiner>
                <button onClick={goStorePage}>
                    Voltar para a loja
                </button>
                <NameUser>
                    Olá, {name}!
                </NameUser>
                <IonIcon icon={logOutOutline} style={{ fontSize: '38px', marginRight: '30px', color: '#1670df'}} onClick={handleLogout}/>
            </NavBar>
            <NewProduct>
                <p>
                    Novo Produto
                </p>
                <FormConteiner onSubmit={postNewProduct}>
                    <input type="text" required value={productName} id="productName" onChange={e => setProductName(e.target.value)} placeholder="Nome do seu novo produto" />
                    <input type="text" required value={description} id="description" onChange={e => setDescription(e.target.value)} placeholder="Descrição do seu novo produto" />
                    <input type="text" required value={value} id="value" onChange={e => setValue(e.target.value)} placeholder="Valor do seu novo produto" />
                    <input type="text" required value={photo} id="photo" onChange={e => setPhoto(e.target.value)} placeholder="Url da foto do seu produto" />
                    <button type="submit">
                        Criar novo produto
                    </button>
                </FormConteiner>
            </NewProduct>
        </NewProductConteiner >
    );
}

const NewProductConteiner = styled.div`
    width: 100%;
    height: 100vh;
    overflow-x: hidden;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #1670df;
`;

const NavBar = styled.div`
    width: 100%;
    height: 70px;
    position: fixed;
    top: 0;
    left: 0;
    overflow-x: hidden;
    overflow-y: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #ffffff;
    button {
        position: absolute;
        width: 80px;
        height: 40px;
        background-color: #1670df;
        border: none;
        border-radius: 7px;
        color: #ffffff;
        font-size: 13px;
        font-family: 'Vollkorn', serif;
        right: 90px;
        cursor: pointer;
    }
`;


const NameUser = styled.div`
    position: absolute;
    left: 30px;
    font-size: 25px;
    font-family: 'Vollkorn', serif;
    color: #1670df;
`

const LogoConteiner = styled.div`
    width: 100%;
    overflow-x: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const LogoImg = styled.img`
    background-image: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRdPmhNa0zJrX0rXeQSo9UVSeE5eQxz_4X4g_15HflV0EtHjK4Q";
    border-radius: 100%;
    width: 53px;
    height: 50px;
    margin-bottom: 15px;
    z-index: 2;
`;

const LogoName = styled.p`
    font-size: 23px;
    color: #1670df;
    font-family: 'Vollkorn', serif;
    z-index: 2;
`;

const NewProduct = styled.div`
    width: 50%;
    height: 700px;
    margin-top: 100px;
    background-color: #ffffff;
    color: #1670df;
    border-radius: 7px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    p {
        font-family: 'Vollkorn', serif;
        font-size: 30px;
        margin-top: -30px;
        margin-bottom: 30px;
    }
`;

const FormConteiner = styled.form`
    width: 100%;
    height: 510px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;

    input {
        width: 90%;
        height: 50px;
        margin-bottom: 20px;
        font-size: 24px;
        font-family: 'Vollkorn', serif;
        padding-left: 8px;
        ::placeholder{
            font-size: 35px;
        };
        background-color: white;
        border-color: #1670df;
        border-radius: 7px;
    };

    button {
        width: 90%;
        height: 45px;
        border: none;
        background-color: #ffffff;
        border-radius: 7px;
        font-size: 24px;
        font-family: 'Vollkorn', serif;
        color: #1670df;
        margin-bottom: -15px;
        box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.8);
        cursor: pointer;
        &:hover {
            background-color: #1670df;
            color: #ffffff;
        }
    };
`