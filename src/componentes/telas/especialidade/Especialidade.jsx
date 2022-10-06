import React, { useState, useEffect } from 'react';
import EspecialidadeContext from './EspecialidadeContext';
import Tabela from './Tabela';
import Form from './Form';
import Carregando from '../../Carregando';

function Especialidade() {

    const [alerta, setAlerta] = useState({ status: "", message: "" });
    const [listaObjetos, setListaObjetos] = useState([]);
    const [editar, setEditar] = useState(false);
    const [objeto, setObjeto] = useState({
        codigo: "", nome: "",
        descricao: ""
    });
    const [carregando, setCarregando] = useState(true);

    const recuperar = async codigo => {        
        await fetch(`${process.env.REACT_APP_ENDERECO_API}/especialidades/${codigo}`)
            .then(response => response.json())
            .then(data => setObjeto(data))
            .catch(err => setAlerta({ status: "error", message: err }))        
    }

    const acaoCadastrar = async e => {
        e.preventDefault();
        const metodo = editar ? "PUT" : "POST";
        try {
            await fetch(`${process.env.REACT_APP_ENDERECO_API}/especialidades`,
                {
                    method: metodo,
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(objeto)
                }).then(response => response.json())
                .then(json => {
                    setAlerta({ status: json.status, message: json.message });
                    setObjeto(json.objeto);
                    if (!editar) {
                        setEditar(true);
                    }
                })
        } catch (err) {
            console.log(err.message);
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
        await fetch(`${process.env.REACT_APP_ENDERECO_API}/especialidades`)
            .then(response => response.json())
            .then(data => setListaObjetos(data))
            .catch(err => setAlerta({ status: "error", message: err }));
        setCarregando(false);
        
    }

    const remover = async objeto => {
        if (window.confirm('Deseja remover este objeto?')) {
            try {
                // chamada ao método de remover da api
                await
                    fetch(`${process.env.REACT_APP_ENDERECO_API}/especialidades/${objeto.codigo}`,
                        { method: "DELETE" })
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
                console.log('Erro: ' + err)
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

export default Especialidade;