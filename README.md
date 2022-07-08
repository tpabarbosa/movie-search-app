# Movie-search-app

Aplicativo que utiliza a API do [The Movie Database](https://www.themoviedb.org/documentation/api) para fazer buscas de filmes e gerenciar Listas que o usuário cria.

Foi codificado em Typescript, HTML e CSS, sem o uso de frameworks ou bibliotecas. De uma maneira geral utilizei o paradigma de **programação orientada a objetos**, sendo que a principal classe criada foi chamada de *AbstractComponent* que os componentes implementam, promovendo assim um **"contrato"** entre as diferentes partes do aplicativo. 

Ao longo do desenvolvimento precisei *"criar"* algumas soluções para problemas comuns:

- **Roteamento**: fiz o roteamento das páginas utilizando *URLSearchParams*

- **Requisições à API**: criei uma classe chamada de *HTTPClient* que utiliza internamente *XMLHttpRequest*

- **Autenticação/Autorização**: o token de sessão do usuário é armazenado em *cookie* e é enviado para a API com a requisição

Apesar de ser um aplicativo simples, posso dizer que foi desafiador fazê-lo sem o uso de bibliotecas. Considero um projeto ainda em construção, pois algumas partes do código precisam ser melhor organizadas, e, muito provavelmente, algumas novos componentes precisam ser criados para aumentar a abstração e para dividir as responsabilidades, de forma a tornar o código mais claro e limpo. Também é necessário rever algumas interfaces, para que as tipagens fiquem mais fáceis de serem mantidas como o tempo.

> #### 👀
> ##### [Veja o resultado clicando aqui!](https://tpabarbosa.github.io/movie-search-app/)
> #### 👆
