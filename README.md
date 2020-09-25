<p align="center"><h1 align="center">Desafio PBMED-API</h1></p>
API desenvolvida em NodeJS utilizando Express, TypeScript, TypeORM, PostgreSQL e Swagger. Este projeto faz parte do processo seletivo e será utilizada para avaliação de código durante o processo seletivo da PEBMED. <br/><br/>

## Requisitos:
Os itens abaixo são requisitos para executar a aplicação:
* Docker
* Dcoker-compose

## Para executar a aplicação:
* ```git clone <this_repo>```: clonar este repositório.
* ```docker-compose up```: Irá buildar os containers (aplicação e banco de dados) caso não tenham sido buildados e iniciará os mesmos. Quando visualizar a mensagem: "Server started on port 8000!", acesse o seguinte endereço em sua máquina pelo browser "http://localhost:8000".

## Para executar a aplicação:
Para rodar os testes, execute o comando abaixo na raiz do projeto:
```yarn test```

## Documentação.
A documentação das API's do projeto, podem ser consultada na página incial do projeto pelo path principal do projeto: "http://localhost:8000". <br/><br/>

## Modelagem do Banco de Dados
![MER PEBMED-API](./docs/mer.png?raw=true "MER PEBMED-API")
