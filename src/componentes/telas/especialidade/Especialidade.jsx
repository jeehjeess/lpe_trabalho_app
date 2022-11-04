import React, { useState, useEffect } from 'react';
import EspecialidadeContext from './EspecialidadeContext';
import Tabela from './Tabela';
import Form from './Form';
import Carregando from '../../Carregando';
import WithAuth from "../../seg/WithAuth";
import Autenticacao from "../../seg/Autenticacao";
import { useNavigate } from "react-router-dom";

function Especialidade() {
    let navigate = useNavigate();

    const [alerta, setAlerta] = useState({ status: "", message: "" });
    const [listaObjetos, setListaObjetos] = useState([]);
    const [editar, setEditar] = useState(false);
    const [objeto, setObjeto] = useState({
        codigo: "", nome: "",
        descricao: ""
    });
    const [carregando, setCarregando] = useState(true);

    const recuperar = async codigo => {  
        try {
            await fetch(`${process.env.REACT_APP_ENDERECO_API}/especialidades/${codigo}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "x-access-token": Autenticacao.pegaAutenticacao().token
                }
            })
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    }
                    throw new Error('Erro código: ' + response.status);
                })
                .then(data => setObjeto(data))
        }
        catch (err) {
            setAlerta({ "status": "error", "message": err })
            window.location.reload();
            navigate("/login", { replace: true });
        }
        
               
    }

    const acaoCadastrar = async e => {
        e.preventDefault();
        const metodo = editar ? "PUT" : "POST";
        try {
            await fetch(`${process.env.REACT_APP_ENDERECO_API}/especialidades`,
                {
                    method: metodo,
                    headers: { "Content-Type": "application/json",
                    "x-access-token": Autenticacao.pegaAutenticacao().token
                 },
                    body: JSON.stringify(objeto)
                }).then(response => {
                    if (response.ok) {
                        return response.json();
                    }
                    throw new Error('Erro código: ' + response.status)
                })
                .then(json => {
                    setAlerta({ status: json.status, message: json.message });
                    setObjeto(json.objeto);
                    if (!editar) {
                        setEditar(true);
                    }
                })
        } catch (err) {
            console.log(err.message);
            window.location.reload();
            navigate("/login", { replace: true });
        }
        recuperaEspecialidades();
    }

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setObjeto({ ...objeto, [name]: value })
    }

    const recuperaEspecialidades = async () => {
        setCarregando(true);
        try {
            await fetch(`${process.env.REACT_APP_ENDERECO_API}/especialidades`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "x-access-token": Autenticacao.pegaAutenticacao().token
                }
            })
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    }
                    throw new Error('Erro código: ' + response.status)
                })
                .then(data => setListaObjetos(data))
                .catch(err => setAlerta({ "status": "error", "message": err }))
        } catch (err) {
            setAlerta({ "status": "error", "message": err })
            window.location.reload();
            navigate("/login", { replace: true });
        }
        setCarregando(false);       
    }

    const remover = async objeto => {
        if (window.confirm('Deseja remover este objeto?')) {
            try {
                // chamada ao método de remover da api
                await
                    fetch(`${process.env.REACT_APP_ENDERECO_API}/especialidades/${objeto.codigo}`,{
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        "x-access-token": Autenticacao.pegaAutenticacao().token
                    }
                })
                        .then(response => response.json())
                        .then(json =>
                            setAlerta({ 
                                status: json.status, 
                                message: json.message.toString().split(' ').includes('violates') ?
                                    'Erro ao excluir Especialidade pois existe um Médico cadastrado nela!'
                                    : json.message
                            }))
                
                recuperaEspecialidades();

            } catch (err) {
                console.log('Erro: ' + err);
                window.location.reload();
                navigate("/login", { replace: true });
            }
        }
    }

    useEffect(() => {
        recuperaEspecialidades()
    }, []);

    return (

        <EspecialidadeContext.Provider value={
            {
                alerta, setAlerta,
                listaObjetos, setListaObjetos,
                recuperaEspecialidades, remover,
                objeto, setObjeto,
                editar, setEditar,
                recuperar,
                acaoCadastrar,
                handleChange
            }
        }>
            { !carregando ? <Tabela /> : <Carregando/> }
            <Form />

        </EspecialidadeContext.Provider>

    )
}

export default WithAuth(Especialidade);