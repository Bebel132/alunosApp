import styles from './App.module.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Modal from './components/Modal';

function App() {
  const [data, setData] = useState([]);
  const [aluno, setAluno] = useState([]);
  const [abrirModal, setAbrirModal] = useState(false);
  const [tipoModal, setTipoModal] = useState("");

  const url="https://localhost:7087/api/Alunos";

  const getAllData = async () => {
    try {
      const response = await axios.get(url);
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getAlunoById = async (id) => {
    try {
      const response = await axios.get(`${url}/${id}`);
      setAluno(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  const createNewAluno = async (newAluno) => {
    try {
      await axios.post(url, newAluno);
    } catch (error) {
      console.log(error);
    }
  }

  const updateAluno = async (id, alunoUpdated) => {
    try {
      await axios.put(`${url}/${id}`, alunoUpdated);
    } catch (error) {
      console.log(error);
    }
  }

  const deleteAluno = async (id) => {
    try {
      await axios.delete(`${url}/${id}`);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAllData();
  }, [data]);

  const toggleModal = (tipo, id) => {
    setAbrirModal(!abrirModal)
    setTipoModal(tipo)

    if(tipo == 'editar' || tipo == 'apagar') {
      getAlunoById(id)
    }
  };

  return (
    <>
      <div className={styles.App}>
        <h1>Cadastro de Alunos</h1>
        <button className={styles.btn} onClick={() => toggleModal('novo')}>Novo aluno</button>
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Nome</th>
              <th>Email</th>
              <th>Idade</th>
              <th>Operação</th>
            </tr>
          </thead>
          <tbody>
            {data.map(row => (
              <tr key={row.id}>
                <td>{row.id}</td>
                <td>{row.nome}</td>
                <td>{row.email}</td>
                <td>{row.idade}</td>
                <td>
                  <button className={`${styles.btn} ${styles.editar}`} onClick={() => toggleModal('editar', row.id)}>Editar</button>
                  <button className={`${styles.btn} ${styles.apagar}`} onClick={() => toggleModal('apagar', row.id)}>Apagar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <Modal 
        abrirModal={abrirModal} toggleModal={toggleModal} tipoModal={tipoModal}
        createNewAluno={createNewAluno} updateAluno={updateAluno} deleteAluno={deleteAluno}
        data={data} aluno={aluno}
      />
    </>
    
  )
}

export default App