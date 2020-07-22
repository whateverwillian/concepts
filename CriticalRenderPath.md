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

CSS é render blocking, por isso vamos querer que ele seja bem leve

HTML
  #1 Load <style> in <head>
  #2 Load <script> right before /body

CSS
  #3 Load only what is needed
  #4 Above the fold loading
  #5 Media attributes
  #6 Less specificity

O javascript é uma das partes mais pesadas desse fluxo, porque ele mexe tanto no DOM quanto no CSSOM e assim que uma script tag é encontrada, o código é bloqueado, e a request é feita

Após o CSSOM ser carregado, o Javascript bloqueia o arquivo até ser executado e finalizado, mas temos como melhorar:
  # Load scripts asynchronously
  # Defer loading of scripts
  # Minimize Dom manipulation
  # Avoid long running javascript

<scrip>
  - Precisa baixar o arquivo (bloqueia a execução)
  - Precisa ser executado (bloqueia a execução)

<script async>
  - Baixa em segundo plano (não bloqueia)
  - Precisa ser executado (bloqueia a execução)

<script defer>
  - Baixa em segundo plano (não bloqueia)
  - Executa no final (não bloqueia)

* usar async quando não tiver nenhum código que mexe na DOM ou no CSS Object Model,como qualquer código terceiro que não tenha contato com nosso código, external scripts
* defer é bom para scripts que vão mexer com a render tree, mas não são tão importantes para carregar a página
* se a principal funcionalidade precisa de javascript, use async
* se a principal funcionalidade não usa javascript, use defer
* critical scripts => <script>

Aplicativos para testar velocidade dos sites:
- PageSpeed Insights (by google)
- WebPageTest
