# ![icon-read-me](https://github.com/rotafinanceira/rota-financeira-vue/assets/54909512/c86ac54d-1502-4c7d-8816-0578e90c4d35) Guia de instalação - Rota Financeira

### Instale as dependências

```bash
yarn
# ou
npm install
```

### Android Studio

Caso não tenha, instale o Android Studio:

```bash
https://developer.android.com/studio?hl=pt-br
```

### Inicie o aplicativo no modo de desenvolvimento (recarregamento rápido de código, relatórios de erros, etc.)

```bash
# executar no Android
quasar dev -m capacitor -T android

# executar no IOs
quasar dev -m capacitor -T ios
```

- Após rodar o comando, será solicitado um endereço IP para rodar o projeto.
  Selecione a opção que melhor lhe atender.

# ![icon-plus](https://github.com/rotafinanceira/rota-financeira-vue/assets/54909512/76f6db89-22da-4f80-9972-9e81042f51e5) Extras - Rota Financeira

### Lint nos arquivos

```bash
yarn lint
# ou
npm run lint
```

### Formate os arquivos

```bash
yarn format
# ou
npm run format
```

### Construa o aplicativo para produção

```bash
quasar build
```

### Personalize a configuração

Beja [Configuring quasar.config.js](https://v2.quasar.dev/quasar-cli-vite/quasar-config-js).
