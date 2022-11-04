import { useContext } from 'react';
import Alerta from '../../Alerta';
import MedicoContext from './MedicoContext';
import CampoEntrada from "../../comuns/CampoEntrada";
import Dialogo from "../../comuns/Dialogo";

function Form() {

    const { objeto, handleChange, acaoCadastrar, alerta, listaEspecialidades } =
    useContext(MedicoContext);
    // Example starter JavaScript for disabling form submissions if there are invalid fields
    (() => {
        'use strict'

        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        var forms = document.querySelectorAll('.needs-validation')

        // Loop over them and prevent submission
        Array.from(forms).forEach(form => {
            form.addEventListener('submit', event => {
                if (!form.checkValidity()) {
                    event.preventDefault()
                    event.stopPropagation()
                }

                form.classList.add('was-validated')
            }, false)
        })
    })()


    return (
        <Dialogo id="modalEdicao" titulo="Médico" idform="formulario"
            acaoCadastrar={acaoCadastrar}>
            <Alerta alerta={alerta} />
            <CampoEntrada id="txtCodigo" label="Código" tipo="number"
                name="codigo" value={objeto.codigo}
                onchange={handleChange} requerido={false}
                readonly={true} tamanho={5}
                msgvalido=""
                msginvalido="" />
            <CampoEntrada id="txtNome" label="Nome" tipo="text"
                name="nome" value={objeto.nome}
                onchange={handleChange} requerido={true}
                readonly={false} tamanho={50}
                msgvalido="Campo nome OK"
                msginvalido="Campo nome é obrigatório" />
            <CampoEntrada id="txtCRM" label="CRM" tipo="text"
                name="crm" value={objeto.crm}
                onchange={handleChange} requerido={true}
                readonly={false} tamanho={10}
                msgvalido="Campo CRM OK"
                msginvalido="Campo CRM é obrigatório" />
            <CampoEntrada id="txtCPF" label="CPF"
                tipo="text"
                name="cpf" value={objeto.cpf}
                onchange={handleChange} requerido={true}
                readonly={false} tamanho={11}
                msgvalido="Campo CPF OK"
                msginvalido="Campo CPF é obrigatório" />
            <div className="form-group">
                <label htmlFor="selectEspecialidade" className="form-label">
                    Especialidade
                </label>
                <select required className="form-control"
                    name="especialidade" value={objeto.predio} id="selectEspecialidade"
                    onChange={handleChange}>
                    <option disable="true" value="">
                        (Selecione a especialidade)
                    </option>
                    {listaEspecialidades.map((especialidade) => (
                        <option
                            key={especialidade.codigo} value={especialidade.codigo}>
                            {especialidade.nome}
                        </option>
                    ))
                    }
                </select>
                <div className="valid-feedback">
                    Campo Especialidade OK
                </div>
                <div className="invalid-feedback">
                    Selecione uma Especialidade
                </div>
            </div>
        </Dialogo>
    )
}

export default Form;