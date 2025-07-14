<template>
  <AppBar show-logo />
  <section class="terms-content">
    <h3>Termos de Uso e Privacidade</h3>
    <div class="terms-card">
      <p>
        <strong>1. ACEITAÇÃO DOS TERMOS</strong><br />
        Ao instalar e utilizar o aplicativo Rota Financeira, o usuário tem total
        aceitação das condições deste termo ao realizar a instalação do
        aplicativo em seu dispositivo móvel.
      </p>
      <p>
        <strong>2. OBJETO</strong><br />
        O Rota Financeira proporciona aos USUÁRIOS o acesso a diversos serviços
        relacionados aos seus veículos (automotores) cadastrados no sistema,
        denominados, respectivamente SERVIÇOS. Alguns dos serviços ofertados
        somente serão passíveis de serem usados mediante o cadastro de dados
        referentes aos veículos bem como interações dos próprios usuários.
      </p>
      <p>
        <strong>3. CONDIÇÕES DE ACESSO E USO</strong><br />
        APLICATIVO: software de gestão de despesas de veículos motorizados.<br />
        CADASTRO: processo necessário e prévio para a utilização de todos os
        serviços ofertados.<br />
        DESPESAS: registro pelo USUÁRIO das despesas realizadas em seu veículo
        tais como estacionamento, impostos, seguros, multas, dentre outros.<br />
        SERVIÇOS: registro pelo USUÁRIO dos serviços referentes à manutenção de
        seu veículo tais como peças, troca de óleo, pneus, dentre outros.<br />
        LEMBRETES: registro pelo USUÁRIO das despesas e serviços a serem
        realizados em seu veículo.
      </p>
      <p>
        <strong>4. OBRIGAÇÕES DO USUÁRIO</strong><br />
        O Usuário compromete-se a utilizar o Rota Financeira de acordo com as
        leis vigentes e os termos aqui estabelecidos. Fica vedado:<br />
        - Utilizar o Aplicativo para fins ilegais ou que violem direitos de
        terceiros;<br />
        - Reproduzir, modificar, distribuir ou criar obras derivadas com base no
        Aplicativo sem autorização prévia dos desenvolvedores;<br />
        - Fornecer informações falsas no Cadastro ou em registros financeiros.
      </p>
      <p>
        <strong>5. PROPRIEDADE INTELECTUAL</strong><br />
        O conteúdo do Aplicativo, incluindo textos, imagens, ícones, design e
        marca Rota Financeira, está protegido pelas leis de propriedade
        intelectual. A reprodução ou utilização do conteúdo sem autorização
        expressa dos detentores dos direitos é proibida.
      </p>
      <p>
        <strong>6. PRIVACIDADE E DADOS PESSOAIS</strong><br />
        A privacidade do Usuário é uma prioridade. As informações coletadas são
        utilizadas exclusivamente para fornecer e aprimorar os serviços do
        Aplicativo. O Usuário tem o direito de acessar, corrigir e excluir seus
        dados mediante solicitação. Caso não concorde com alguma alteração que
        venha a ocorrer nesta Política de Privacidade, você pode encerrar sua
        conta em área específica.
      </p>
      <p>
        <strong>7. RESPONSABILIDADES</strong><br />
        O Rota Financeira não se responsabiliza por eventuais perdas financeiras
        decorrentes do uso do Aplicativo. O Aplicativo pode conter links para
        serviços de terceiros, sendo esses exclusivamente responsáveis pelo seu
        conteúdo e funcionamento. O Rota Financeira reserva-se o direito de
        modificar ou descontinuar funcionalidades a qualquer momento, sem aviso
        prévio.
      </p>
      <p>
        <strong>8. ALTERAÇÕES DOS TERMOS</strong><br />
        Os presentes Termos de Uso podem ser atualizados periodicamente. O
        Usuário será informado sobre alterações relevantes, sendo sua
        responsabilidade manter-se atualizado.
      </p>
      <p>
        <strong>9. CONTATO</strong><br />
        Para dúvidas ou solicitações relacionadas ao uso do Aplicativo, o
        Usuário pode entrar em contato pelo e-mail de suporte indicado no
        próprio Aplicativo. Ao continuar utilizando o Rota Financeira, o Usuário
        declara estar ciente e de acordo com os termos descritos neste
        documento.
      </p>
    </div>
  </section>
</template>

<script setup lang="ts">
import AppBar from '@/shared/components/AppBar.vue';

// No additional logic is required for this static page.
</script>

<style scoped>
.terms-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 1.5rem 1rem 1rem;
  height: 599px;
  align-self: stretch;

  & :first-child {
    margin-top: 0;
  }
}

.terms-card {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 1rem;
  background-color: #fff;
  border-radius: 8px;
  border: 1px solid #e0e5e7;
  max-width: 800px;
  line-height: var(--Body-Small-Line-Height, 16px);
  color: var(--Cores-Cinza-800, #33373c);
  font-family: var(--Body-Small-Font, Roboto);
  font-size: var(--Body-Small-Size, 12px);
  font-style: normal;
  font-weight: 400;
  letter-spacing: var(--Body-Small-Tracking, 0.4px);
}

.terms-card p {
  margin-bottom: 1rem;
}

.terms-card strong {
  font-weight: 700;
  line-height: var(--Body-Small-Line-Height, 16px);
  letter-spacing: var(--Body-Small-Tracking, 0.4px);
}

h3 {
  align-self: stretch;
  color: var(--Cores-Cinza-800, #33373c);
  text-align: center;

  font-size: var(--Tipo-Tamanho-Xl, 20px);
  font-style: normal;
  font-weight: 700;
  line-height: 120%; /* 24px */
  letter-spacing: -0.4px;
}
.header {
  padding: 1rem;
  background-color: #ffffff;
  text-align: center;
  font-weight: bold;
}
</style>
