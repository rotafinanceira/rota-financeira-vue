# Prompt: Como criar um wrapper de Axios genérico para múltiplos serviços e autenticação em SPAs

Implemente um wrapper de Axios para aplicações SPA (Single Page Application) que permita:

- Criar instâncias de Axios customizadas para diferentes serviços (ex: múltiplas APIs, microserviços, etc).
- Adicionar cabeçalhos customizados (ex: usuário autenticado, chaves de API, etc) em todas as requisições.
- Integrar com o sistema de autenticação do projeto para adicionar tokens de acesso (ex: OAuth2, JWT, SSO) automaticamente nos headers.
- Usar interceptors para garantir que o token de acesso correto seja adicionado antes de cada requisição, de acordo com o serviço alvo.
- Expor as instâncias de Axios globalmente na aplicação (ex: via app.config.globalProperties no Vue), facilitando o uso tanto na Options API quanto na Composition API.
- Permitir fácil extensão para novos serviços e fluxos de autenticação.

## Fluxo sugerido

- Crie uma função `api(serviceName?)` que retorna uma instância de Axios.
- Adicione headers globais (ex: usuário, chaves de API) ao criar a instância.
- Se um serviço for informado, adicione um interceptor de request que:
  - Obtém o token de acesso correto para o serviço (usando o sistema de autenticação do projeto).
  - Adiciona o token no header Authorization.
- Exporte a função `api` para uso na Composition API.
- No boot da aplicação, exponha tanto o Axios padrão (`$axios`) quanto o wrapper customizado (`$api`) nas propriedades globais do app, para uso na Options API.

## Adapte para seu projeto

- Substitua a lógica de obtenção de token pelo método do seu sistema de autenticação.
- Adicione/remova headers conforme a necessidade dos seus serviços.
- O padrão pode ser usado em qualquer framework SPA moderno (Vue, React, etc).

## Observações

- O uso de interceptors permite garantir que o token esteja sempre atualizado antes de cada requisição.
- Expor as instâncias globalmente facilita o uso em componentes sem necessidade de múltiplos imports.
- O padrão é facilmente extensível para múltiplos serviços e diferentes fluxos de autenticação.

Pronto para adaptar para qualquer cenário de múltiplos serviços e autenticação em SPA!
