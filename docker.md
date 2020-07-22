# Docker

Existe um problema conforme nossa aplicação cresce, ela fica monolítica, um grande monstro, e todas as partes são necessárias pra funcionar

isso é difícil de gerenciar e monitorar e ao mesmo tempo, o projeto não pode só funcionar no seu computador, tem que funcionar nos outros

Embora você tenha um OS diferente, uma versão diferente do DB, uma versão diferente do node...

Muitas das aplicações de hoje em dia são baseadas em containers, que são pequenas "caixas", pequenos ambientes que rodam em qualquer lugar

Ao invés de um grande monolito, aplicações gigantes como a Amazon quebram o sistema em pequenas partes, essas pequenas partes podem ser consideradas "serviços"

A idéia é manter cada serviço prevísivel, mais monitorável e no caso de um serviço parar de funcionar, a aplicação inteira não cai

O docker lida com a complicação de ter várias dependências, com vários requisitos de sistema, e transforma na facilidade de um comando, ele faz com que consigamos rodar as dependências em qualquer lugar, de um jeito fácil e rápido

# Docker Containers

Antes do docker nós tinhamos máquinas virtuais, que eram "sandbox environments", é como se cada app precisava ter um computador dedicado, esses ambientes eram mais trabalhosos e grandes porque rodavam em uma máquina virtual, rodavam em cima de um sistema operacional próprio

o docker veio e mudou as coisas, ele envolvia o software em um sistema completo de arquivos e fazia todo o necessário para o software rodar

O docker é uma opção super leve em comparação ao modelo com máquinas virtuais, ele é pensado para rodar softwares únicos em cada container, esse é o modelo de microserviços

Os containers não tem um sistema operacional inteiro pra eles (como no modelo anterior), eles usam o sistema operacional do host, por causa disso em alguns segundos sua aplicação começa a funcionar

Com docker nós temos acesso fácil e rápido à rodar essas pequenas aplicações, e nós podemos ter várias delas

Conforme a aplicação cresce mais e mais, podemos ir criando mais e mais containers, e ai vemos o conceito de "container orchestration" para gerenciar todos os containers (como kubernetes)

Ou seja, docker é uma plataforma de containers, porém diferente do modelo anterior, o docker roda apenas o software e as dependências, sem ter um sistema operacional inteiro em cada container e garantem que sua aplicação vai rodar em qualquer lugar

# Container

Nós temos um Host - que é um computador no qual nosso container vai rodar

Em cima do host, nós temos o container, que é algo que criamos com o docker

E dentro desse container, temos uma imagem, ou seja, o container consiste em uma imagem

A imagem é o que docker usa para criar nossa aplicação em dentro de um container - a imagem são as instruções para montar a aplicação

E o container é completamente isolado do host, ou seja, não importa o que o host roda, o container continuará isolado com suas próprias dependências

A imagem tem um "ridable filesystem" que é adicionado pelo docker automaticamente e é chamado de "volume"

Enfim, o docker "bundles" a aplicação em uma "image" que é um "standalone executable package" (pode rodar em qualquer computador) e executa nesse container

# Docker hub

É como se fosse um npm do docker, onde você pode baixar images criadas por outras pessoas, com node, postgres, mongo, etc images

# Dockerfile

Para criar uma imagem de uma aplicação, na raíz do projeto vamos criar um arquivo Dockerfile

dentro dele, escrevemos (por exemplo):

// Isso é um "parent image" da nossa image
FROM node:carbon

CMD ["/bin/bash"]

O primeiro comando diz ao docker para usar a node image "from" dockerhub

O CMD, ou "command" diz o que queremos rodar dentro desse container (node)

Agora no terminal podemos rodar "docker build -t name ."

-t significa tagname, e pode ser o nome que você quiser
o "." é porque temos que dizer o que ele deve "buildar", e no nosso caso, é a pasta inteira

se tudo der certo, você terá uma imagem "name:latest"

Agora, para rodar:

docker run -it name

-it nos permite entrar no container

isso vai levar a gente pra dentro do container que acabamos de criar, dentro de um terminal

isso aconteceu por que nosso "command" foi para executar o bash, esse comando nos leva ao terminal do nosso container

Caso a versão do node não tenha sido instalada corretamente, podemos atualizar na Dockerfile

FROM node:8.11.1

então saímos do container com "exit"
rodamos a build de novo
e rodamos de novo

Se quisermos rodar o container no background, podemos passar a flag -d

docker exec -it container_id bash - entra no container

Agora, voltando ao Dockerfile

FROM node:8.11.1

WORKDIR /usr/src/some-folder

COPY ./ ./

RUN npm install

CMD ["/bin/bash"]

o workdir diz aonde vamos estar quando abrirmos o bash
o COPY é para copiar, no caso acima copiamos tudo do diretório atual para o container

RUN é um "image build step", ou seja, o estado do container depois de um RUN vai ser colocado na image, então podemos executar vários comandos para formar a image que quisermos

já CMD é o que roda por padrão quando você chama "build image"

Quando nós temos um container, ele não sabe do local host, a gente tem que dizer aonde ele deve expor uma porta, não podemos nos comunicar com o container por padrão

Chamamos isso de port binding e port forwarding

para fazer isso, colocamos uma flag -p no docker run

	docker run -it -p HOST_PORT:CONTAINER_PORT name

# Docker Compose

Serve para orquestrar nossos containers durante o desenvolvimento

Docker compose te permite compor vários containers com apenas um comando, possibilitando você iniciar a aplicação facilmente, com um comando, vários containers vão ser iniciados

Para combinar os containers, precisamos criar um arquivo

docker-compose.yml

E dentro dela, vamos ter:

  // A versão do doc comp que vamos utilizar
  version "3.6"

  // Os services que vamos orquestrar
  services: 
    backend-api: 
      container_name: backend
      build: ./
      command: npm start
      working_dir: /test
      ports:
        - "3333:3333"

Agora para rodar isso: docker-compose build

Quando fizemos as mudanças, vamos rodar build e run
para facilitar isso, podemos rodar:

docker-compose up --build ou docker-compose up

E para desligar containers executando no background, usamos:

docker-compose down
