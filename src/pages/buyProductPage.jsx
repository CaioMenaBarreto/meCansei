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
    const [product, setProduct] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();

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
                const res = await axios.get(`http://localhost:5000/buyProduct/${id}`, config);
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
                {product && (
                    <ProductImage src={product.photo} key={product.id} />
                )}
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
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    flex-wrap: wrap;
    margin-top: -100px;   
    border-radius: 8px;
`;

const ProductImage = styled.img`
    width: 100%;
    height: 500px;
    border-radius: 8px;
`