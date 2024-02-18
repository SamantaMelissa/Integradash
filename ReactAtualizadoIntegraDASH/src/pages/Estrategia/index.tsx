import "./style.css"
import api from "../../utils/api"
import Pasta from "../../assets/img/folder-icon.png"
import MenuLateral from "../../components/MenuLateral"
import Header from "../../components/Header"
import Perfil from "../../components/Perfil"
// import { useState } from "react";
import { useEffect, useState } from "react";

export default function Estrategia() {

  // const [id_usuario, setUsuario] = useState<string>("")
  const [id_erro, setErro] = useState<any[]>([]);
  const [id_iderro, setidErro] = useState<string>("")
  const [nomeestrategia, setNome] = useState<string>("")
  const [data_estrategia, setData] = useState<string>("")
  const [descricao_estrategia, setDescricao] = useState<string>("")

  const [valorSelecionado, setValorSelecionado] = useState('');

  const [modalData, setModalData] = useState<any>(null);
  const [showModal, setShowModal] = useState<boolean>(false);


  const id_usuario = localStorage.getItem("idUsuario");

  function listarerro(){
    // get para criar listar os erros daquele usuario
    api.get("erro")
    .then((response: any) => {
        // console.log(response.data);
        // console.log(response.data.nomeerro);
        setErro(response.data)
        setidErro(response.data)
      
    })
    .catch((error: any) => {
        console.log("Error ao realizar um requisição:", error);
    })
  }

  useEffect(() => {
    //executa uma ação após o componente ser recarregado
    listarerro();
  }, [])
  // console.log(aa)
  function cadastrarEstrategia(event: any) {
    event.preventDefault();

    // const formData = new FormData()
    const formData = {
      "id_erro" : id_iderro,
      "id_usuario" :  id_usuario,
      "nomeestrategia" :  nomeestrategia,
      "data_estrategia" :  data_estrategia,
      "descricao_estrategia" :  descricao_estrategia

    }

   

    // post para criar novas estategias]
    api.post("estrategias", formData)
    .then((response: any) => {
        console.log(response);
        alert("Estratégia cadastrada com sucesso!😊🤗");
    })
    .catch((error: any) => {
        console.log(error);
        console.log(id_iderro);
        alert("Falha ao cadastrar uma nova estratégia");
    })

  }

  function descricaoestrategia(id: any){
    api.get("erro/"+id)
    .then((response: any) => {
        // console.log(response.data.descricao_erro);
        // console.log(response.data.nomeerro);
        // const aaa = response.data.descricao_erro;
        setModalData(response.data); // Define os dados do modal com os dados da API
        setShowModal(true); // Exibe o modal
    })
    .catch((error: any) => {
      console.log(id)
        console.log("Error ao realizar um requisição:", error);
    })
  }

  return (
    <>
      <MenuLateral />
      <Perfil />
      <section className="main_pagestrategia">
        <div className="container container_cad">
          <div className="cad_conteudo">
            {/* <h1>Cadastro</h1> */}
            {/* <hr/> */}
            <form onSubmit={cadastrarEstrategia} className="cad_formulario_estrategia" method="POST">
            <div className="cad_linha_select">
            <span>Selecione um erro para adicionar</span>
                <select
                    name=""
                    id="cad_select_erro"
                    onChange={(e) =>{ setidErro(e.target.value); descricaoestrategia(e.target.value);}}
                    defaultValue={"Selecione"}
                >
                    <option disabled value="Selecione">Selecione</option>
                    {
                        id_erro.map((erro: any, index_erro: number) => {
                            return <option key={index_erro} value={erro.id}>Erro: {erro.nomeerro}</option>
                        })
                    }
                </select>   
             
                 {/* Modal */}
                {showModal && (
                  <div className="desc">
                    <div className="desc-content">
                      {modalData && (
                        <>
                          <h2>Detalhes do erro</h2>
                          <p>Nome: {modalData.nomeerro}</p>
                          <p>Descrição: {modalData.descricao_erro}</p>
                        </>
                      )}
                    </div>
                  </div>
                )}   
                  
              </div>

              <div className="cad_box_input">
                <label htmlFor="nome">Nome da Estratégia:</label>
                <input
                  type="text"
                  id="nome"
                  onChange={(event) => { setNome(event.target.value) }}
                  placeholder="Digite aqui o nome da estratégia:"
                  required
                />
              </div>
              <div className="cad_box_input">
                <label htmlFor="date">Data:</label>
                <input
                  type="date"
                  id="date"
                  onChange={(event) => { setData(event.target.value) }}
                  placeholder="Selecione a data da estratégial:"
                  required
                />
              </div>
              <div className="cad_box_input">
                <label htmlFor="descricao">Descrição:</label>
                <input
                  type="text"
                  id="descricao"
                  onChange={(event) => { setDescricao(event.target.value) }}
                  placeholder="Digite aqui a descrição da estratégia:"
                  required
                />

              </div>
              <button type="submit" className="cad_botao">Cadastrar</button>
            </form>
          </div>
        </div>
      </section>
    </>
  )

}