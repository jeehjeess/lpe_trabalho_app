import { useState, useEffect } from 'react';
import MedicoContext from './MedicoContext';
import Tabela from './Tabela';
import Form from './Form';
import Carregando from '../../Carregando';
import WithAuth from "../../seg/WithAuth";
import Autenticacao from "../../seg/Autenticacao";
import { useNavigate } from "react-router-dom";

function Medico() {

    let navigate = useNavigate();

    const [alerta, setAlerta]             = useState({ status: "", message: "" });
    const [listaObjetos, setListaObjetos] = useState([]);
    const [editar, setEditar]             = useState(false);
    const [objeto, setObjeto]             = useState({
        codigo: "", nome: "",
        crm: "", cpf: "", especialidade: ""
    });
    const [listaEspecialidades, setListaEspecialidades] = useState([]);
    const [carregando, setCarregando] = useState(true);

    const recuperar = async codigo => {
        try {
            await fetch(`${process.env.REACT_APP_ENDERECO_API}/medicos/${codigo}`)
            .then(response => response.json())
            .then(data => setObjeto(data))
            .catch(err => setAlerta({ status: "error", message: err }))
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
            await fetch(`${process.env.REACT_APP_ENDERECO_API}/medicos`,
            {
                method : metodo,
                headers : {"Content-Type": "application/json", 
                "x-access-token": Autenticacao.pegaAutenticacao().token            
            },
                body : JSON.stringify(objeto)
            }).then(response => response.json())
              .then(json => {
                    setAlerta({status : json.status, message : json.message});
                    setObjeto(json.objeto);
                    if (!editar){
                        setEditar(true);
                    }
              })
        } catch(err){
            console.log(err.message);
            window.location.reload();
            navigate("/login", { replace: true });
        }
        recuperaMedicos();
    }

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setObjeto({...objeto, [name] : value})
    }

    const recuperaEspecialidades = async () => {
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
                .then(data => setListaEspecialidades(data))
                .catch(err => setAlerta({ "status": "error", "message": err }))
        } catch (err) {
            setAlerta({ "status": "error", "message": err })
            window.location.reload();
            navigate("/login", { replace: true });
        }

    }

    const recuperaMedicos = async () => {
        setCarregando(true);
        try {
            await fetch(`${process.env.REACT_APP_ENDERECO_API}/medicos`, {
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
                    fetch(`${process.env.REACT_APP_ENDERECO_API}/medicos/${objeto.codigo}`,
                    {method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        "x-access-token": Autenticacao.pegaAutenticacao().token
                    }
                })
                        .then(response => response.json())
                        .then(json =>
                            setAlerta({ status: json.status, message: json.message }))
                // consulto a api novamente para trazer os registros do banco atualizados
                recuperaMedicos();

            } catch (err) {
                console.log('Erro: ' + err);
                window.location.reload();
                navigate("/login", { replace: true });
            }
        }
    }

    useEffect(() => {
        recuperaEspecialidades();
        recuperaMedicos();
    }, []);

    return (
        <MedicoContext.Provider value={
            {
                alerta, setAlerta,
                listaObjetos, setListaObjetos,
                recuperaEspecialidades, remover, 
                objeto, setObjeto, 
                editar, setEditar, 
                recuperar, 
                acaoCadastrar, 
                handleChange, listaEspecialidades
            }
        }>
            { !carregando ? <Tabela /> : <Carregando/> }
            <Form/>
        </MedicoContext.Provider>
    )
}

export default WithAuth(Medico);