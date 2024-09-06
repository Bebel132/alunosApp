import React, { useState, useEffect } from 'react'
import Style from './Form.module.css'

const Form = (props) => {
    const [novoAluno, setNovoALuno] = useState({
        id: 0,
        nome: '',
        email: '',
        idade: 0,
    });

    const [editarAluno, setEditarAluno] = useState({
        id: 0,
        nome: '',
        email: '',
        idade: 0,
    });

    props.tipoForm == "editar" && (
        useEffect(() => {
            setEditarAluno({
                id: props.aluno.id,
                nome: props.aluno.nome,
                email: props.aluno.email,
                idade: props.aluno.idade,
            });
        }, [props.aluno])
    )

    const handleChangeNovoAluno = (event) => {
        const { name, value } = event.target;
        setNovoALuno((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleChangeEditarAluno = (event) => {
        const { name, value } = event.target;
        setEditarAluno((prevState) => ({ ...prevState, [name]: value }));
    };
    
    const submit = (e) => {
        e.preventDefault()

        if(props.tipoForm == "novo"){
            setNovoALuno((prevState) => ({
                ...prevState,
                id: props.count--,
            }));

            props.submitFunction(novoAluno);
        }
        
        if(props.tipoForm == "editar") {
            props.submitFunction(props.aluno.id, editarAluno);
        }

        props.toggleModal('');
    }

    return (
        <>
            {props.tipoForm == "novo" && (
                <>
                    <h3>Inserir novo aluno</h3>
                    <form method="post" onSubmit={submit}>
                        <label htmlFor="nome">Nome: </label>
                        <input type="text" name="nome" id="nome" onChange={handleChangeNovoAluno} required/>
                        <label htmlFor="email">Email: </label>
                        <input type="email" name="email" id="email" onChange={handleChangeNovoAluno} required/>
                        <label htmlFor="idade">Idade: </label>
                        <input type="number" name="idade" id="idade" onChange={handleChangeNovoAluno} required/>
                        <input type="submit" value="enviar" />
                    </form>
                </>
            )}
            {props.tipoForm == "editar" && (
                <>
                    <h3>Editar aluno</h3>
                    <form method="post" onSubmit={submit}>
                        <label htmlFor="nome">Nome: </label>
                        <input type="text" name="nome" id="nome" value={editarAluno.nome} onChange={handleChangeEditarAluno} />
                        <label htmlFor="email">Email: </label>
                        <input type="email" name="email" id="email" value={editarAluno.email} onChange={handleChangeEditarAluno} />
                        <label htmlFor="idade">Idade: </label>
                        <input type="number" name="idade" id="idade" value={editarAluno.idade} onChange={handleChangeEditarAluno} />
                        <input type="submit" value="enviar" />
                    </form>
                </>
            )}
        </>
    )
}

export default Form