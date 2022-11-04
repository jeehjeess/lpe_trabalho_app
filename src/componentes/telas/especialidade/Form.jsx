import { useContext } from 'react';
import Alerta from '../../Alerta';
import EspecialidadeContext from './EspecialidadeContext';
import CampoEntrada from "../../comuns/CampoEntrada";
import Dialogo from "../../comuns/Dialogo";

function Form() {

    const { objeto, handleChange, acaoCadastrar, alerta } =
        useContext(EspecialidadeContext);
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
        <Dialogo id="modalEdicao" titulo="Especialidade" idform="formulario"
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
                readonly={false} tamanho={40}
                msgvalido="Campo nome OK"
                msginvalido="Campo nome é obrigatório" />
            <CampoEntrada id="txtDescricao" label="Descrição" tipo="text"
                name="descricao" value={objeto.descricao}
                onchange={handleChange} requerido={true}
                readonly={false} tamanho={40}
                msgvalido="Campo descrição OK"
                msginvalido="Campo descrição é obrigatório" />
        </Dialogo>
    )
}

export default Form;