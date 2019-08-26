## Comentários sobre a implementação

### Descrição do código

Dividi a aplicação em módulos (componentes) para que estes pudessem ser reutilizados em várias partes do código. Como nenhum framework ou biblioteca eram permitidos (com exceção de bibliotecas de build e teste), o código foi feito em Javascript puro (ES6). Utilizei o Jest para testes e o Webpack para tasks de build e para rodar o servidor da aplicação (webpack-dev-server). Além disso, como o próprio enunciado sugere, utilizei um pré-processador de CSS: Stylus.

O ponto inicial da aplicação é o `index.js`. Nele, há um router bem simples usando o hash da url. Dependendo do valor do hash, o router renderiza o componente apropriado.

As funções principais dos componentes são `render` e `postRender`. A função `render` sempre retorna um template string com a estrutura básica do componente. Na função `postRender` são adicionados event listeners aos elementos necessários do componente, assim como são chamados os métodos de `postRender` dos elementos filhos.

No store é onde estão concentrados os métodos para o gerenciamento de dados da aplicação com o localStorage.


### Descrição do funcionamento

Uma vez que a aplicação esteja rodando, o usuário pode listar, criar, editar ou deletar usuários, que são persistidos no localStorage. Se a aplicação for iniciada com o localStorage nulo (isto é, está sendo iniciada pela primeira vez), a aplicação fará um fetch do estado inicial dado no enunciado. Decidi deixar o fetch só nesse momento inicial para que fosse possível deletar todos os usuários sem ter que fazer o fetch sempre.

