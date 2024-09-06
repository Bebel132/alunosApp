import Style from './Modal.module.css'
import Form from './Form'

const Modal = (props) => {
    return (
        <>
            {props.abrirModal && (
                <div className={Style.modal}>
                    <div className={Style.modalContainer}>
                        <span onClick={() => props.toggleModal('')}>x</span>
                        
                        {
                            props.tipoModal == 'novo' && (
                                <>
                                    <Form 
                                        tipoForm={props.tipoModal}
                                        toggleModal={props.toggleModal}
                                        submitFunction={props.createNewAluno}
                                        count={props.data.length}
                                    />
                                </>
                            )
                        }
                        {
                            props.tipoModal == 'editar' && (
                                <>
                                    <Form
                                        tipoForm={props.tipoModal}
                                        toggleModal={props.toggleModal}
                                        submitFunction={(id, alunoUpdated) => props.updateAluno(id, alunoUpdated)}
                                        aluno={props.aluno}
                                    />
                                </>
                            )
                        }
                        {
                            props.tipoModal == 'apagar' && (
                                <>
                                    <h3>Tem certeza que quer apagar esse aluno?</h3>
                                    <div className={Style.apagarConfirmar}>
                                        <button className={Style.opcao} id={Style.nao} onClick={() => props.toggleModal('')}>Não</button>
                                        <button className={Style.opcao} id={Style.sim} onClick={() => {props.deleteAluno(props.aluno.id), props.toggleModal('')}}>Sim</button>
                                    </div>
                                </>
                            )
                        }
                    </div>
                </div>
            )}
        </>
    )
}

export default Modal