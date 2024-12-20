import Head from "next/head";
import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { useState } from "react";
import axios from "axios";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {

  // Declarar a variável para receber o arquivo
  const [arquivo, setArquivo] = useState('');

  // Declarar a variável para receber a mensagem
  const [message, setMessage] = useState('');

  // Executar a função quando o usuário clicar no botão do formulário
  const uploadArquivo = async (e) => {

    // Bloquear o recarregamento da página
    e.preventDefault();

    //console.log("Upload");

    // Criar o objeto com os dados
    const formData = new FormData();
    formData.append('arquivo', arquivo);

    // Criar a constante com os dados do cabeçalho
    const headers = {
      'headers': {
        // Indicar que será enviado os dados em formato de objeto
        'Content-Type': 'multipart/form-data'
      }
    }

    // Fazer a requisição para o servidor utilizando axios, indicando o método da requisição, o endereço, enviar os dados do formulário e o cabeçalho
    await axios.post('http://localhost:8080/', formData, headers)
    .then((response) => { // Acessa o then quando a API retornar status 200

      // Atribuir a mensagem no state message
      setMessage(response.data.message);

    }).catch((err) => { // Acessa o catch quando a API retornar erro
      
      // Atribuir a mensagem no state message
      if(err.response){
        setMessage(err.response.data.message);
      } else {
        setMessage("Erro: Falha ao cadastrar arquivo CSV. Tente novamente mais tarde ou entre em contato com o Suporte da ASC Brazil.");
      }
    });

  }

  return (
    <>
      <Head>
        <title>ASC</title>
        <meta name="description" content="ASC Developer Project" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div
        className={`${styles.page} ${geistSans.variable} ${geistMono.variable}`}
      >
        <main className={styles.main}>

          <h1>ASC Developer Project</h1>

          <p>Criar uma tela para upload de arquivo CSV, que contém dados de um contato. O
          arquivo CSV anexado a este projeto deve ser utilizado como base de testes...</p>

          <ol>
            <li>
              Faça upload do arquivo CSV <code>./campanha.csv</code>
            </li>
            <li>Cadastre o arquivo para que os dados sejam inseridos no banco de dados</li>
          </ol>

          <div className={styles.ctas}>

            <form onSubmit={uploadArquivo}>
              
              <label for='arquivo'>Carregar Arquivo CSV: </label>
              <input type='file' accept='.csv' name='arquivo' onChange={(e) => setArquivo(e.target.files[0])}/><br /><br />

              <button type="submit">Cadastrar</button><br /><br />

              { message ? <p style={{color: "red"}}>{message}</p> : ""}

            </form>
          </div>
        </main>
        <footer className={styles.footer}>
          <a
            href="https://www.linkedin.com/in/samueljackbill/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              aria-hidden
              src="/linkedin-brands-solid.svg"
              alt="Linkedin icon"
              width={16}
              height={16}
            />
          </a>
          <a
            href="https://github.com/samueljackbill"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              aria-hidden
              src="/github-brands-solid.svg"
              alt="GitHUB icon"
              width={16}
              height={16}
            />
          </a>
          <a
            href="https://www.instagram.com/samueljackbill/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              aria-hidden
              src="/instagram-brands-solid.svg"
              alt="Instagram icon"
              width={16}
              height={16}
            />
          </a>
        </footer>
      </div>
    </>
  );
}
