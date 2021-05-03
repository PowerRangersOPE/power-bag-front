<template lang="pug">
    <q-slide-item class="q-mt-lg q-ml-sm">
        <q-item>
            <q-item-section avatar>
                <div>
                <img
                    src="https://static.thenounproject.com/png/3249063-200.png"
                    draggable="false"
                    style="width: 50px;"
                />
                </div>
            </q-item-section>
            <q-item-section>Nome do cliente</q-item-section>
        </q-item>

        <div class="q-mt-lg q-ml-lg">
            <q-item to="/perfil/dadosPessoais" >
                <q-item-section avatar>
                <q-avatar>
                    <q-btn size="lg" flat dense icon="person" color="primary" />
                </q-avatar>
                </q-item-section>
                <q-item-section>Dados pessoais</q-item-section>
            </q-item>
            <q-item to="/perfil/endereco">
                <q-item-section avatar>
                <q-avatar>
                    <q-btn size="lg" flat dense icon="home" color="primary" />
                </q-avatar>
                </q-item-section>
                <q-item-section>Endereço</q-item-section>
            </q-item>
            <q-item to="/perfil/cartao">
                <q-item-section avatar>
                <q-avatar>
                    <q-btn size="lg" flat dense icon="credit_card" color="primary" />
                </q-avatar>
                </q-item-section>
                <q-item-section>Cartão</q-item-section>
            </q-item>
            <q-item to="/perfil/perfilRoupa">
                <q-item-section avatar>
                <q-avatar>
                    <q-btn size="lg" flat dense icon="checkroom" color="primary" />
                </q-avatar>
                </q-item-section>
                <q-item-section>Perfil Roupa</q-item-section>
            </q-item>
        </div>
    </q-slide-item>
</template>
<script>
export default {
  name: "ComponentNavPerfil",
  data() {
    return {
      tab: "images"
    };
  }
};
</script>
