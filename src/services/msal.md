# Prompt: Generic Auth Service (adapt MSAL example)

Implemente um serviço de autenticação genérico para Vue 3, inspirado em exemplos de uso do MSAL (Microsoft Authentication Library), mas adaptável para qualquer provedor de autenticação (OAuth2, JWT, SAML, SSO, etc).

## O serviço deve:

- Inicializar o cliente de autenticação com as configurações do provedor.
- Gerenciar login e logout, incluindo redirecionamento e callbacks.
- Armazenar e atualizar o usuário autenticado na store global.
- Fornecer método para obter access token para diferentes serviços/escopos.
- Permitir adicionar callbacks para eventos de autenticação (login/logout).
- Tratar erros de autenticação de forma simples.

## Exemplo de assinatura dos métodos

Adapte os métodos abaixo para o seu provedor:

- Inicialização do cliente (ex: OAuth2, JWT, SAML, etc).
- Login (redirect, popup, etc).
- Logout.
- Obtenção de access token para escopos/serviços.
- Callback para eventos de login/logout.
- Atualização do usuário na store global.

## Observações

- Remova dependências específicas do MSAL/Azure e adapte para o SDK do seu provedor.
- O fluxo de login/logout e obtenção de token pode variar conforme o provedor.
- Sempre trate erros e estados de loading conforme necessário.
- Integre com sua store global (Pinia, Vuex, etc) para manter o usuário atualizado.

Pronto para adaptar para qualquer autenticação!
