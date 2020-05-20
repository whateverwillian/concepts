# SSH ou secure shell

É um protocolo que permite a comunicação entre dois computadores pela internet

Foi criado como uma fonte segura e encriptada de conexão
é chamado de secure shell porque é um protocolo utilizado no terminal (shell) que permite a comunicação com o sistema operacional

A vantagem oferecida pelo SSH perante seus predecessores é a encriptação entre o host e o client (secure shell protocol)
host => sistema remoto
client => o seu sistema

ssh {user}@{host}

ao criador o servidor, recebemos o ipv4

ssh root@{ipv4}

por padrão, o usuário criado é root, e o ip do servidor é nosso host

ssh => informa ao sistema que você quer começar uma encrypted secure shell connection
user => representa a conta que você quer acessar, como root por exemplo, que é basicamente o administrador do sistema
host => o computador que você quer acessar, pode ser um ip address, ou um domínio

# Encryption Techniques

Existem três tecnicas de encriptação utilizadas em ssh

- Symmetrical Encryption
- Asymmetrical Encryption
- Hashing

# Symmetrical Encryption..

Usa uma chave para encriptação e para decriptação
Nesse tipo de encriptação, qualquer um que tem a key consegue ler a mensagem encriptada

o ssh se comunica por essa key, é assim que nos comunicamos com um servidor remoto
porém, qualquer um que tem a chave, tem acesso...

Precisamos de uma forma na qual, mesmo outras pessoas tendo acesso à chave, não vão ter acesso à informação sigilosa, e fazemos isso através do Key Exchange Algorithm

# Asymmetrical Encryption..

Esse Key Exchange Algorithm precisa da nossa segunda forma de encriptação, a chamada asymmetrical encryption, ao invés de uma só key, a AE utiliza duas keys

A public key e a private key, juntas formam a public-private key pair

a public é pública, lógica
a private é um segredo

Uma mensagem que é encriptada por a public key de uma máquina só pode ser decriptada pela private key daquela mesma máquina, é uma "one way relationship" porque só podemos encriptar... (com a public key)

Se eu criar uma public key no computador A, qualquer pessoa do mundo pode usar essa public key para encriptar os arquivos, mas o único jeito de decriptar é tendo a private key do meu computador A

Esse algoritmo é utilizado apenas no Key Exchange algorithm

O que acontece é que antes de toda conexão ssh, os dois computadores da conexão criam temporariamente uma public key e uma private key, e eles trocam suas public keys, assim o computador A encripta para o computador B, e só o computador B consegue decriptar, nem mesmo o próprio computador A conseguiria

E ai nós podemos pegar a symmetric key, através do Difiie hellman key exchange
é complexo, mas basicamente, com um conjunto de informações, cada um dos computadores consegue gerar a key, sem nunca transmitir ela 

Esse algoritmo permite que cada computador use seus próprios dados privados + dados públicos para gerar uma mesma chave idêntica nos dois lados da conexão ssh, cool shit

O nome talvez não seja conciso, porque nós não trocamos a key (do symmetric), nós geramos eles separadamente em cada uma das máquinas

Bom, até agora ssh usa symmetric e asymmetric encryptions já que AE consome mais tempo, a maioria das conexões usam SE

A idéia é que AE é utilizada apenas para trocar uma public key, (falando mais uma vez porque sim) para que a public key nunca seja transmitida, e sim, gerada em cada um dos computadores, assim evitando que alguém a descubra

ao solicitar uma ssh connection, o server usa a public key do client para gerar uma "desafio" de autenticação, se o client conseguir resolver, significa que ele tem a private key, e a conexão começa

Obs: Pela décima vez, a conexão é feita pela primeira vez, usando o algoritmo Exchange para criar a chave nos dois computadores, depois a conexão é feita apenas pela chave (symmetric encryption) por ser mais rápida a conexão

mesmo assim, alguém ainda pode estar entre o client e o host, tendo acesso à toda comunicação, para resolver isso, utilizamos hashing

# Hashing

É a terceira forma de encriptação usada no ssh
a diferença do hash é que ele não consegui desencriptar, ele é um bagunçador
e o que ele faz é verificar a autenticidade das comunicações, assim, se alguem no meio da comunicação mudar um mínimo detalhe, um hash totalmente diferente vai ser gerado, e no host side, em que a gente faz o hash de novo e compara os resultados do hash do client e do host, podemos ver se a mensagem foi mudada

Isso é feito com  Hashbase Message Authentication Codes(HMAC)

Então: 

1. A conexão é estabelecida, client e host trocam key publica
2. Baseado nessa key pública, ambos os lados tem acesso à symmetric key
3. A symmetric key é utilizada para a conexão, porém um hash é utilizado para checar a integridade dos dados
4. Por último, senha, mas para evitar o uso de senha podemos:

Vamos criar um key-pair, para isso vamos para ~/.ssh e lá usamos o cogio
ssh-keygen -C "willianliketavares@gmail.com"

assim, criamos uma public e uma private rsa key-pair
id_rsa => private
id_rsa.pub => public

agora vamos trocar as public keys entre o client e o host

pbcopy < ~/.ssh/id_rsa.pub // Para copiar a pub key

agora, vamos no servidor, vamos em ~/.ssh
lá dentro deve ter authorized_keys e known_hosts
dentro de authorized_keys vamos colar a key

caso você só tenha um id_rsa ok
caso tenha mais que uma, precisamos registrar a private key

rodamos ssh-add ~/.ssh/id_rsa

e ao tentar ssh into the server, vai funcionar
