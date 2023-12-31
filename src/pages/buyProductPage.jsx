import { useContext, useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { useQuickOut } from "../hooks/useQuickOut";
import AuthContext from "../contexts/AuthContext";
import { IonIcon } from '@ionic/react';
import { logOutOutline } from 'ionicons/icons';
import Swal from "sweetalert2";

export default function buyProductPage() {
    const { name, logout, token } = useContext(AuthContext);
    const [product, setProduct] = useState({});
    const { id } = useParams();
    const navigate = useNavigate();
    const APIURL = import.meta.env.VITE_REACT_APP_BASE_URL;

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

    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`${APIURL}/buyProduct/${id}`, config);
                setProduct(res.data);
                console.log(res.data);
            } catch (error) {
                console.log(error);
                if (error.response && error.response.status === 401) {
                    useQuickOut();
                }
                Swal.fire({
                    title: 'Erro',
                    text: error.response.data.message,
                    icon: 'error',
                    confirmButtonText: 'Ok'
                });
            }
        };

        fetchData();
    }, [id]);


    function goStorePage() {
        navigate("/storePage");
    };

    const data = {
        vendido: true
    }

    function buyProduct() {
        const promise = axios.put(`${APIURL}/buyProduct/${id}`, data, config);
        promise
            .then(() => {
                    Swal.fire({
                        title: 'Successo',
                        text: "Compra realizada com sucesso!",
                        icon: 'success',
                        confirmButtonText: 'Ok'
                    });
                    navigate("/storePage");
            })
            .catch(error => {
                console.log(error.response.data);
                if (error.response.data.message === "Você não pode comprar os produtos que você mesmo está vendendo.") {
                    Swal.fire({
                        title: 'Erro',
                        text: error.response.data.message,
                        icon: 'error',
                        confirmButtonText: 'Ok'
                    });
                    navigate("/storePage");
                };

                if (error.response && error.response.status === 401) {
                    useQuickOut();
                }
                Swal.fire({
                    title: 'Erro',
                    text: error.response.data.message,
                    icon: 'error',
                    confirmButtonText: 'Ok'
                });
            });
    };

    return (
        <BuyProductConteiner>
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
                <IonIcon icon={logOutOutline} style={{ fontSize: '38px', marginRight: '30px', color: '#1670df' }} onClick={handleLogout} />
            </NavBar>
            <ProductConteiner>
                <ProductImage src={product.photo} key={product.id} />
                <ProductName>
                    {product.name}
                </ProductName>
                <ProductPrice>
                    Preço: {product.value}
                </ProductPrice>
                <ProductDescription>
                    Descrição: {product.description}
                </ProductDescription>
                <button onClick={buyProduct}>
                    Comprar
                </button>
            </ProductConteiner>
        </BuyProductConteiner>
    );
};

const BuyProductConteiner = styled.div`
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

const ProductConteiner = styled.div`
    font-family: 'Vollkorn', serif;
    background-color: #ffffff;
    font-size: 33px;
    width: 70%;
    height: 750px;
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    flex-wrap: wrap;
    margin-top: 50px;   
    border-radius: 8px;
    box-shadow: 4px 8px 12px rgba(0, 0, 0, 0.8);
    button {
        width: 90%;
        height: 50px;
        font-family: 'Vollkorn', serif;
        font-size: 33px;
        background-color: #1670df;
        color: #ffffff;
        border: none;
        border-radius: 8px;
        margin-left: 50px;
        margin-bottom: 20px;
        box-shadow: 4px 8px 12px rgba(0, 0, 0, 0.8);
        cursor: pointer;
    }
`;

const ProductImage = styled.img`
    width: 90%;
    height: 500px;
    border-radius: 8px;
    margin-top: 20px;
    margin-left: 50px;
`;

const ProductName = styled.p`
    font-family: 'Vollkorn', serif;
    font-size: 33px;
    margin-top: -35px;
    margin-left: 50px;
    color: #244874;
`;

const ProductPrice = styled.p`
    font-family: 'Vollkorn', serif;
    font-size: 33px;
    margin-top: -45px;
    margin-left: 50px;
    color: #244874;
`;

const ProductDescription = styled.p`
    font-family: 'Vollkorn', serif;
    font-size: 33px;
    margin-top: -45px;
    margin-left: 50px;
    color: #244874;
`