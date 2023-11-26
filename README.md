<img src = "https://github.com/m-u-l-a-s/PROTON/blob/main/docs/Movimento%20Universit%C3%A1rio%20de%20L%C3%B3gica%20Aplicada%20%C3%A0%20Softwares.png" alt="newLogo"/>

# Proton - Project Tracker, Organizer and Notifier
## :bookmark_tabs: Objetivo do Produto:

A empresa parceira Ionic Health apresentou o desafio real enfrentado por eles na âmbito de organização e documentação dos processos que são desenvolvidos em uma empresa de tecnologia voltada à saúde. A solução desenvolvida se configura uma plataforma web de auxílio. Essa consiste em um sistema com 4 frentes: colaborador comum, que pode anexar pendências e evidências de um processo ao qual foi designado como responsável e acompanhar seu ciclo de vida; líderes de equipe que podem criar processos e designar etapas desses processos aos colaboradores ou outros líderes; C-levels, que poderão acompanhar como estão essas atividades através do dashboard e usuário Administrador que terá acesso a todos esses recursos, além de poder cadastrar novos usuários. 
<br>
A aplicação foi projetada para organizar e armazenar evidências desses processos e operar por meio de navegadores como o Google Chrome, Internet Explorer e Firefox, dependendo da conexão com a internet e do banco de dados em nuvem.
<br>
> _Projeto baseado na metodologia ágil SCRUM, procurando desenvolver a Proatividade, Autonomia, Colaboração e Entrega de Resultados dos estudantes envolvidos_
<br>

:pushpin: Status do Projeto: Em andamento.

## 🏁 Entregas de Sprints

Cada entrega foi realizada a partir do desenvolvimento priorizado seguindo o backlog. 

<br>
| 01 | 04/09/2023 - 24/09/2023 | ✔️ Concluída    | <a href="https://github.com/m-u-l-a-s/PROTON/tree/Sprint_01"> [Veja o Relatório]</a> |
<br>
| 02 | 25/10/2023 - 15/10/2023 | ✔️ Concluída    | <a href="https://github.com/m-u-l-a-s/PROTON/blob/Sprint_02/README.md"> [Veja o Relatório]</a> |
<br>
| 03 | 16/10/2023 - 05/11/2023 | ✔️ Concluída    | <a href="https://github.com/m-u-l-a-s/PROTON/tree/Sprint_03"> [Veja o Relatório]</a> |
<br>
| 04 | 06/11/2023 - 26/11/2023 | ✔️ Concluída   | <a href="https://github.com/m-u-l-a-s/PROTON/tree/Sprint_04"> [Veja o Relatório]</a> |
<br>

## :dart: User Stories 

![image](https://github.com/m-u-l-a-s/PROTON/blob/main/docs/US.png)
<br>

## :dart: Backlog Do Produto:
![image](https://github.com/m-u-l-a-s/PROTON/blob/main/docs/%C3%A9picos.png)
<br>


## 🛠️ Tecnologias e ferramentas utilizadas:

-   HTML: Estrutura das páginas.
-   CSS: Estilização.
-   React e Typescript: Manipulação de input.
-   Pyhton/Flask: Backend do produto.
-   Bootstrap: Estilização.
-   Figma: Prototipagem.
-   GitHub: Controle de versionamento, documentação e colaboração.
-   MySQL: Banco de Dados utilizado.

<div style-"display=inline_block">
<img width="40px" src="https://raw.githubusercontent.com/devicons/devicon/1119b9f84c0290e0f0b38982099a2bd027a48bf1/icons/typescript/typescript-original.svg" title = "TypeScript"/>
<img width="40px" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" title = "JavaScript"/>
<img width="40px" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original-wordmark.svg" title = "HTML5"/>
<img width="40px" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original-wordmark.svg" title = "CSS3"/>
<img width="40px" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" title = "React"/>
<img width="40px" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" title = "Figma"/>
<img width="40px" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original-wordmark.svg" title = "PostgreSQL"/>
</div> <br>

## Estrutura geral do projeto:

```
 📁 Proton
   |
   |-  📁 src
   |    |- 📁 control
   |    |- 📁 pages
   |    |- 📁 routes
   |    |- 📁 shared
   |        |- 📁 charts
   |        |- 📁 components
   |        |- 📁 contexts
   |        |- 📁 environment
   |        |- 📁 hooks
   |        |- 📁 layouts
   |        |- 📁 services
   |        |- 📁 themes
 📁 Docs
 📁 Server


```
<br>

## :high_brightness: Passo a Passo de Execução em Sua Máquina:
<br>
- 1º Tenha o banco de dados PostgreSQL instalado em sua máquina (verifique os passo a passo da instalação deste na documentação oficial no site 'https://www.postgresql.org/'). 
<br>
- 2º Crie uma nova DataBase para hospedar os dados da aplicação.
<br>
- 3º Abra os scrips localizados na pasta 'docs', copie-os e os use para criar corretamente as tabelas e colunas necessários para a aplicação.
<br>
- 4º Abra o código em seu editor de código-fonte.
<br>
- 5º Conecte a aplicação ao seu Banco de Dados: na aplicação, entre manualmente na pasta 'serve' abra o arquivo 'db.js' mude os parametros 'host', 'user', 'port', 'password', 'database' para os valores corretos da database usado.
<br>
- 6º Abra um terminal em seu editor de código fonte, encaminhe o terminal para a pasta 'serve' com comando "cd .\server\" e depois passe os parâmetros: 1. "npm init", 2."npm install", 3."npm install -g nodemon", 4. "Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser", 5. "nodemon index" para deixar o servidor.
<br>
- 7º Abra um novo terminal e encaminhe para a pasta 'api_proton' com o comando "cd .\api_proton\", depois passe os parâmetros: 1. "npm install", 2. "npm start". 



## :busts_in_silhouette: Apresentação da Equipe:

Somos uma equipe de jovens programadores interessados em criar soluções simples para problemas complexos e em aprender o máximo possível no processo.
Nosso foco é em identificar o objetivo principal de um produto para desenvolver soluções de maneira gradual e modular em torno deste objetivo, de forma que cada passo possa ser validado pelo(a) cliente e/ou usuários e o produto evolua organicamente.


| Função        | Nome                             | LinkedIn & GitHub                                                                                                                                                                                                                                                                                                           |
| ------------- | -------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Product Owner | Alícea P. de Lima Rocha          | [![LinkedIn](https://img.shields.io/badge/LinkedIn-blue?style=flat-square&logo=LinkedIn&logoColor=white)](https://www.linkedin.com/in/al%C3%ADcea-paula-de-lima-rocha-bab682157/) [![GitHub](https://img.shields.io/badge/GitHub-111217?style=flat-square&logo=GitHub&logoColor=white)](https://github.com/alicearocha)     |
| Scrum Master  | Amanda Mendes Caldeira           | [![LinkedIn](https://img.shields.io/badge/LinkedIn-blue?style=flat-square&logo=LinkedIn&logoColor=white)](https://www.linkedin.com/in/amanda-mendes-caldeira-b24389210/) [![GitHub](https://img.shields.io/badge/GitHub-111217?style=flat-square&logo=GitHub&logoColor=white)](https://github.com/AmendoaM)                 |
| Tech Lead     | Alexandre Jonas de Souza Fonseca | [![LinkedIn](https://img.shields.io/badge/LinkedIn-blue?style=flat-square&logo=LinkedIn&logoColor=white)](https://www.linkedin.com/in/alexandre-jonas-de-souza-fonseca-989920181/) [![GitHub](https://img.shields.io/badge/GitHub-111217?style=flat-square&logo=GitHub&logoColor=white)](https://github.com/AlexandreJonas) |
| Backend       | Alita Willians da Silva Amancio  | [![LinkedIn](https://img.shields.io/badge/LinkedIn-blue?style=flat-square&logo=LinkedIn&logoColor=white)](https://www.linkedin.com/in/alitaamancio/) [![GitHub](https://img.shields.io/badge/GitHub-111217?style=flat-square&logo=GitHub&logoColor=white)](https://github.com/AlitaAmancio)                                 |
| Frontend      | Joice Araújo                     | [![LinkedIn](https://img.shields.io/badge/LinkedIn-blue?style=flat-square&logo=LinkedIn&logoColor=white)](https://www.linkedin.com/in/joice-aparecida-581226250/) [![GitHub](https://img.shields.io/badge/GitHub-111217?style=flat-square&logo=GitHub&logoColor=white)](https://github.com/Joice-Araujo)                    |
| Backend       | Jonas Alves Bueno                | [![LinkedIn](https://img.shields.io/badge/LinkedIn-blue?style=flat-square&logo=LinkedIn&logoColor=white)](https://www.linkedin.com/in/jonas-alves) [![GitHub](https://img.shields.io/badge/GitHub-111217?style=flat-square&logo=GitHub&logoColor=white)](https://github.com/dodekafonos)                                    |
| BDA           | Vitor F. Morais                  | [![LinkedIn](https://img.shields.io/badge/LinkedIn-blue?style=flat-square&logo=LinkedIn&logoColor=white)](https://www.linkedin.com/in/vitor-faria-morais-330b19204/) [![GitHub](https://img.shields.io/badge/GitHub-111217?style=flat-square&logo=GitHub&logoColor=white)](https://github.com/vmorais111)                   |
