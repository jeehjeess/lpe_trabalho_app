import { useContext } from 'react';
import MedicoContext from './MedicoContext';
import Alerta from '../../Alerta';
import Titulo from "../../comuns/Titulo";

function Tabela() {

    
    const { setObjeto, alerta, setAlerta,
        listaObjetos, remover, setEditar, recuperar } = useContext(MedicoContext);

    return (
        <div style={{ padding: '20px' }}>
            <Titulo texto="Médicos"/>
            <Alerta alerta={alerta} />
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalEdicao"
                onClick={() => {
                    setObjeto({
                        codigo: 0,
                        nome: "",
                        crm: "",
                        cpf: "", 
                        especialidade : ""
                    });
                    setEditar(false);
                    setAlerta({ status: "", message: "" });
                }}>
                 <i className="bi bi-file-earmark-plus"></i> Novo
            </button>
            <Alerta alerta={alerta} />
            {listaObjetos.length === 0 &&
                <h1>Nenhum médico encontrado</h1>}
            {listaObjetos.length > 0 && (
                <div className="table-responsive">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col"
                                    style={{ textAlign: 'center' }}>Ações</th>
                                <th scope="col">Código</th>
                                <th scope="col">Nome</th>
                                <th scope="col">CRM</th>
                                <th scope="col">CPF</th>
                                <th scope="col">Especialidade</th>
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
                                    <td>{objeto.crm}</td>
                                    <td>{objeto.cpf}</td>
                                    <td>{objeto.nomeespecialidade}</td>
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