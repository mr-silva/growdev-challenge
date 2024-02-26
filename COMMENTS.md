# General Comments about the Development

## Arquitetura
__Backend__
* __Clean Architecture:__ Optei por utilizar os conceitos da arquitetura limpa, para a criação do backend deste projeto, além de possuir uma organização melhor, ela garante a escalabilidade do projeto, não criando dependências entre as camadas mais inferiores/core do projeto. Ou seja, a parte de casos de uso é independente de um banco de dados, se algum dia decidirmos trocar o banco de dados, seja ele relacional ou não relacional, toda a aplicação continua funcionando, sendo apenas necessário garantir passar a instância de repositório correta nas factories para os casos de uso.
* __SOLID:__ Utilizei dos conceitos de SOLID para criar essa aplicação, esses conceitos ajudam no desenvolvimento, confiabilidade e escalabilidade do projeto.
* __RestAPI:__ Optei por utilizar os conceitos de RestAPI, dado que as requisições desse projeto, não exigiam consultas mais robustas aos dados no banco, portanto uma API Rest dá conta do recado.

__Frontend__
* __Components:__ Utilizei o conceito de componentes no Vue, apesar de não ter aplicado tão extensivamente esse conceito como gostaria.
* __CompositionAPI:__ Utilizei os métodos de CompositionAPI para a construção dos scripts nos meus componentes.

## 3rd Party Libs
__Backend__
* __TypeORM:__ Lib mais robusta para utilizar em conjunto com um banco de dados relacional, como optei por utilizar MySQL e TypeScript, TypeORM é robusto e possui uma boa integração com ambos.
* __Zod:__ Lib para validação de dados e tipagens, hoje é a biblioteca com a melhor integração com TypeScript, seja para validação de dados ou para inferir tipagens no projeto.
* __Jest:__ Lib para execução de testes automatizados, optei por utilizar o Jest que é a maior lib de testes para JS, sua robustez, comunidade e suporte fizeram dele uma boa escolha para o projeto.

__Frontend__
* __Vuetify:__ Lib de componentes e templates para o Vue, torna mais fácil a construção de uma dashboard e telas de maneira dinâmica, acelerando o desenvolvimento.

## O que eu melhoraria no projeto
Obviamente TODO o Frontend, este é ainda o meu ponto mais fraco, antes desse projeto a ultima vez que tinha usado Vue foi em meados de 2020, isso misturado com o meu conhecimento em front, foi o maior desfalque, mas gostei bastante de trabalhar com Vue, é muito simples, muito prático e fácil. Mas certamente se tivesse mais tempo, entregaria um projeto de front muito melhor do que o apresentado.
Já no backend eu aplicaria alguns conceitos melhores de abertura e fechamento de conexão ao banco de dados por requisição, assim como aplicaria mais testes unitários e criaria testes e2e também.
Outra coisa que aplicaria seria uma parte de autenticação com tipos de usuário e soft-delete das entradas no banco.

## Quais requisitos obrigatórios não foram entregues:
* Editar: Editar um usuário não está funcionando no front, mas existe o endpoint no backend funcionando normalmente.
* Excluir: Excluir um usuário está funcionando no front, porém não conseguir fazer funcionar a refetch automático dos dados, para ver refletindo tem que recarregar a página manualmente.
* Cadastrar: O cadastro está funcionando no front, porém o refetch não funcionou, tem que recarregar a página para ver o novo usuário, também não há tratativas das mensagens de erro do back, apenas validação básica que apliquei no front, mas isso não impede a pessoa de cadastrar um usuário já existente e nem ver que deu erro.
* Listagem: Os filtros não funcionam no front.

Em resumo, falhei para entregar 100% de todos os requisitos no front, a API no backend está toda funcional, faltou mais tempo para deixar o front 100%. 
