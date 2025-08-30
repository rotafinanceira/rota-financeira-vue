# Prompt: Como implementar um Navigation Guard genérico para autenticação e autorização em SPAs

Implemente um navigation guard genérico para um SPA (Single Page Application) usando Vue Router (ou outro roteador de sua escolha), que seja facilmente adaptável para qualquer provedor de autenticação (OAuth2, JWT, SAML, SSO, etc).

## O guard deve:

- Integrar-se ao serviço de autenticação do projeto (ex: um hook ou singleton como useAuthClient()).
- Verificar se o usuário está autenticado antes de acessar rotas protegidas (meta.requiresAuth).
- Se não autenticado, redirecionar para o fluxo de login do provedor (ex: redirect, popup, etc).
- Após autenticação, garantir que o usuário esteja presente na store global.
- Verificar se o usuário possui as permissões ou roles necessárias para acessar a rota (meta.roles).
- Se não possuir permissão, redirecionar para uma rota de acesso negado (ex: /not-allowed).
- Tratar erros de autenticação e autorização de forma simples.

## Fluxo sugerido

- No início da navegação, obtenha o cliente de autenticação e o estado global do usuário.
- Tente recuperar o usuário autenticado e verificar se há sessão válida.
- Se a rota exigir autenticação e o usuário não estiver autenticado, inicie o fluxo de login e interrompa a navegação.
- Se autenticado, atualize o usuário na store global.
- Se a rota exigir roles/permissões, verifique se o usuário possui pelo menos uma delas.
- Se não possuir, redirecione para uma rota de acesso negado.
- Caso contrário, permita a navegação normalmente.

## Exemplo de assinatura

Adapte para seu provedor:

- Substitua chamadas específicas de MSAL/Azure por métodos equivalentes do seu SDK de autenticação.
- Ajuste a verificação de roles/permissões conforme a estrutura do seu sistema.
- O fluxo de login/logout pode variar conforme o provedor.

## Observações

- Sempre trate erros de autenticação silenciosamente para evitar loops de redirecionamento.
- O guard pode ser usado tanto em Vue Router quanto em outros roteadores SPA, bastando adaptar as assinaturas.
- Integre com sua store global para manter o usuário e permissões atualizados.

Pronto para adaptar para qualquer autenticação e autorização em SPA!
