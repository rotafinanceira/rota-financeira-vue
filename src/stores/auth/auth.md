# Prompt: Generic Auth Store for Any Provider

Implemente uma store Pinia para autenticação genérica em Vue 3, usando Composition API e Axios, com persistência em sessionStorage.

## Requisitos:

- Armazene o usuário autenticado (`user`) e suas permissões (`permissions`).
- Permita login automático ou manual, conforme o fluxo do provedor.
- Busque a foto do usuário, se o provedor suportar.
- Busque permissões do usuário em `/users/me/roles`, mapeando para um array de strings únicos.
- Forneça um método `iCan` para checar se o usuário possui ao menos uma das permissões passadas.
- Permita logout (limpar usuário).
- Persista o estado no sessionStorage (ou outro storage).
- Inclua tratamento de erros simples.
- Exemplo de uso dos métodos principais.

## Observações

- Adapte os endpoints e o fluxo de login/logout conforme seu backend/provedor.
- O método `getUserPhoto` é opcional.
- O plugin `pinia-plugin-persistedstate` pode ser usado para persistência automática.
- Trate loading e error no seu componente conforme necessário.

Pronto para adaptar para qualquer autenticação!
