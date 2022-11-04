import React, { useContext } from 'react';
import EspecialidadeContext from './EspecialidadeContext';
import Alerta from '../../Alerta';
import Carregando from '../../Carregando';
import Titulo from "../../comuns/Titulo";

function Tabela() {

    // pegando as variáveis e métodos do contexto
    const { setObjeto, alerta, setAlerta,
        listaObjetos, remover, setEditar, recuperar } = useContext(EspecialidadeContext);

    return (        
        <div style={{ padding: '20px' }}>
            <Titulo texto="Especialidades"/>
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalEdicao"
                onClick={() => {
                    setObjeto({
                        codigo: 0,
                        nome: "",
                        descricao: ""
                    });
                    setEditar(false);
                    setAlerta({ status: "", message: "" });
                }}>
               <i className="bi bi-file-earmark-plus"></i> Novo 
            </button>
            <Alerta alerta={alerta} />
            {listaObjetos.length === 0 &&
                <h1>Nenhuma especialidade encontrada</h1>}
            {listaObjetos.length > 0 && (
                <div className="table-responsive">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col"
                                    style={{ textAlign: 'center' }}>Ações</th>
                                <th scope="col">Código</th>
                                <th scope="col">Nome</th>
                                <th scope="col">Descrição</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listaObjetos.map(objeto => (
                                <tr key={objeto.codigo}>
                                    <td align="center">
                                        <button className="btn btn-info" type="button"
                                            data-bs-toggle="modal"
                                            data-bs-target="#modalEdicao"
                                            onClick={() => {
                                                recuperar(objeto.codigo);
                                                setEditar(true);
                                                setAlerta({ status: "", message: "" });
                                            }}>
                                            <i className="bi bi-pencil-square"></i>
                                        </button>
                                        <button className="btn btn-danger" title="Remover"
                                            onClick={() => { remover(objeto); }}>
                                            <i className="bi bi-trash"></i>
                                        </button>
                                    </td>
                                    <td>{objeto.codigo}</td>
                                    <td>{objeto.nome}</td>
                                    <td>{objeto.descricao}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>    
    )
}

export default Tabela;