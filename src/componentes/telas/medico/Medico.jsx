import { useState, useEffect } from 'react';
import MedicoContext from './MedicoContext';
import Tabela from './Tabela';
import Form from './Form';
import Carregando from '../../Carregando';

function Medico() {

    const [alerta, setAlerta] = useState({ status: "", message: "" });
    const [listaObjetos, setListaObjetos] = useState([]);
    const [editar, setEditar] = useState(false);
    const [objeto, setObjeto] = useState({
        codigo: "", nome: "",
        crm: "", cpf: "", especialidade: ""
    });
    const [listaEspecialidades, setListaEspecialidades] = useState([]);
    const [carregando, setCarregando] = useState(true);

    const recuperar = async codigo => {
        await fetch(`${process.env.REACT_APP_ENDERECO_API}/medicos/${codigo}`)
            .then(response => response.json())
            .then(data => setObjeto(data))
            .catch(err => setAlerta({ status: "error", message: err }))
    }

    const acaoCadastrar = async e => {
        e.preventDefault();
        const metodo = editar ? "PUT" : "POST";
        try {
            await fetch(`${process.env.REACT_APP_ENDERECO_API}/medicos`, 
            {
                method : metodo,
                headers : {"Content-Type": "application/json"},
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
        }
        recuperaMedicos();
    }

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setObjeto({...objeto, [name] : value})
    }

    const recuperaEspecialidades = async () => {
        await fetch(`${process.env.REACT_APP_ENDERECO_API}/especialidades`)
            .then(response => response.json())
            .then(data => setListaEspecialidades(data))
            .catch(err => setAlerta({ status: "error", message: err }))
    }

    const recuperaMedicos = async () => {
        setCarregando(true);
        await fetch(`${process.env.REACT_APP_ENDERECO_API}/medicos`)
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
                    fetch(`${process.env.REACT_APP_ENDERECO_API}/medicos/${objeto.codigo}`,
                        { method: "DELETE" })
                        .then(response => response.json())
                        .then(json =>
                            setAlerta({ status: json.status, message: json.message }))
                // consulto a api novamente para trazer os registros do banco atualizados
                recuperaMedicos();

            } catch (err) {
                console.log('Erro: ' + err)
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

export default Medico;