Quando fazemos uma requisição:
- o HTML chega e o browser começa à ler ele e cria a dom, criando os "tree nodes"
- A dom descreve os elementos da página, e encontra "styles"
- então o css é requisitado ao servidor e é entregue
- Assim que o css chega, começa a gerar uma CSSOM, que também tem uma "tree" de estilização que é associada aos "tree nodes", que diz como a estilização será
- Até que encontra um arquivo js -> faz a requisição ao servidor e lê o arquivo
- Assim que esses processos terminam, o browser junta a DOM com o CSSOM e cria uma "rendering tree" e essa rendering tree tem as informações das tags e estilizações
- o Browser usa essa rendering tree para saber como a página será, e assim, pinta ela
- obs: ao encontrar img tags, o browser vai baixar no background, e mostrar quando estiver pronto

- Javascript files no final do html, porque eles bloqueiam os próximos elementos à serem carregados
- CSS o mais rápido possível, para que o CSSOM seja carregado rapidamente e consequentemente crie a render tree mais rápido

Critical Render Path

DOM > CSSOM > Render Tree > Layout > Paint

