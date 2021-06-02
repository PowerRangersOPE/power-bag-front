<template>
  <div class="q-mb-xl">
    <q-item-label class="text-h5" style="underline">
      Dúvidas? Leia esse breve tutorial.
    </q-item-label>
    <q-splitter
      v-model="splitterModel"
      style="height: 450px"
      class="q-mt-lg"
      >
      <template v-slot:before>
        <q-tabs
          v-model="tab"
          vertical
          class="text-primary"
        >
          <q-tab name="primeiro" icon="face" label="Primeiro Acesso" />
          <q-tab name="solicitarBag" icon="local_mall" label="Solicitar Bag" />
          <q-tab name="envioBag" icon="local_shipping" label="Envio da Bag" />
          <q-tab name="escolhaProduto" icon="multiple_stop" label="Itens Bag" />
          <q-tab name="devolucaoBag" icon="hail" label="Devolução Bag" />
        </q-tabs>
      </template>

      <template v-slot:after>
        <q-tab-panels
          v-model="tab"
          animated
          swipeable
          vertical
          transition-prev="jump-up"
          transition-next="jump-up"
        >
          <q-tab-panel name="primeiro">
            <div class="text-h4 q-mb-md">Primeiro Acesso</div>
            <p>Finalizar o cadastro em nosso site nas páginas:</p>
            <div>
              <li class="q-mb-sm">Dados Pessoais</li>
              <li class="q-mb-sm">Endereço</li>
              <li class="q-mb-sm">Cartão</li>
              <li class="q-mb-sm">Personalizar Bag</li>
            </div>
          </q-tab-panel>

          <q-tab-panel name="solicitarBag">
            <div class="text-h4 q-mb-md">Solicitar a Bag</div>
            <li class="q-mb-sm">Para a solicitação é necessário todos os dados cadastrados preenchidos e válidados pelo sistema.</li>
            <li class="q-mb-sm">Na página de Minhas Bags clique em "Solicitar Nova Bag".</li>
            <li class="q-mb-sm">Será realizado o débito total da Bag no cartão de crédito.</li>
            <li class="q-mb-sm">O Status da Bag será "Solicitado", agora é aguardar a chegada de sua Bag</li>
          </q-tab-panel>

          <q-tab-panel name="envioBag">
            <div class="text-h4 q-mb-md">Envio da Bag</div>
            <li class="q-mb-sm">Não possui custo de frete.</li>
            <li class="q-mb-sm">A Bag chegará em sua casa em até 24 horas.</li>
            <li class="q-mb-sm">Acompanhe a alteração do Status da Bag.</li>
          </q-tab-panel>

          <q-tab-panel name="escolhaProduto">
            <div class="text-h4 q-mb-md">Itens da Bag</div>
            <li class="q-mb-sm">Caso ficar com todos os itens da Bag altere o status para "Compra Total".</li>
            <li class="q-mb-sm">Caso for devolver um ou mais itens altere o status para "Solicitado a retirada".</li>
          </q-tab-panel>

          <q-tab-panel name="devolucaoBag">
            <div class="text-h4 q-mb-md">Devolução Bag</div>
            <li class="q-mb-sm">Aguarde que iremos buscar a Bag.</li>
            <li class="q-mb-sm">Após a retirada acompanhe o status da Bag.</li>
            <li class="q-mb-sm">Será realizado a validação dos itens devolvido.</li>
            <li class="q-mb-sm">Iremos realizar o devido estorno em seu Cartão de Crédito.</li>
          </q-tab-panel>
        </q-tab-panels>
      </template>
    </q-splitter>
  </div>
</template>
<script>
export default {
  name: "tutorial",
  data() {
    return {
      tab: 'primeiro',
      splitterModel: 20
    }
  }
}
</script>