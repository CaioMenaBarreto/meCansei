import Swal from 'sweetalert2';
import AuthContext from "../contexts/AuthContext";
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function useQuickOut() {
    const { token, setToken } = useContext(AuthContext);
    const { name, setName } = useContext(AuthContext);
    const navigate = useNavigate();
    useEffect(() => {
        if (!token || !name) {
            setToken(null);
            setName(null);
            localStorage.removeItem("token");
            localStorage.removeItem("name");
            Swal.fire({
                title: 'Erro',
                text: 'Faça login para acessar o site',
                icon: 'error',
                confirmButtonText: 'Ok'
            });
            navigate("/");
        };
    }, []);
}