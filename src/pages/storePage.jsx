import { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';

export default function StorePage() {
    return (
        <StoreConteiner>
            <LogoConteiner>
                <LogoImg src="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRdPmhNa0zJrX0rXeQSo9UVSeE5eQxz_4X4g_15HflV0EtHjK4Q" alt="Logo da empresa" />
                <LogoName>MeCansei</LogoName>
            </LogoConteiner>
        </StoreConteiner>
    );
};

const StoreConteiner = styled.div`
    width: 100%;
    height: 100vh;
    overflow-x: hidden;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #1670df;
`

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