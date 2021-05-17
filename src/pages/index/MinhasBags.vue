<template>
<div>
    <div>
        <div class="col q-mb-sm">
            <q-btn color="green" label="Solicitar nova Bag" @click="confirmarPedido()" />
        </div>
    </div>
    <div class="q-pa-md">
        <q-table dense title="Minhas Bags" :data="bag" :columns="columns" />
    </div>
    <q-dialog v-model="confirm" persistent>
        <q-card>
            <q-card-section class="row items-center">
                <q-avatar icon="announcement" color="primary" text-color="white" />
                <span class="q-ml-sm">Deseja continuar com a solicitação da Bag?</span>
            </q-card-section>
            <q-card-actions align="right">
                <q-btn flat label="Sim" color="primary" @click="solicitarBag()" v-close-popup />
                <q-btn flat label="Não" color="primary" v-close-popup />
            </q-card-actions>
        </q-card>
    </q-dialog>

    <q-dialog v-model="modalCartao">
      <q-card>
        <q-card-section>
          <div class="text-h6">Alert</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum repellendus sit voluptate voluptas eveniet porro. Rerum blanditiis perferendis totam, ea at omnis vel numquam exercitationem aut, natus minima, porro labore.
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="OK" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

</div>
</template>

<script>
import axios from "axios";

export default {
    name: "minhasBags",
    data: () => ({
        token: localStorage.getItem("token"),
        baseUrl: "https://power-bag.herokuapp.com",
        confirm: false,
        modalCartao: false,
        columns: [{
                name: "createdAt",
                label: "Data",
                field: "createdAt",
                sortable: true,
                type: "date",
                width: "50px",
                align: "center",
                headerClasses: 'bg-primary text-white text-uppercase text-bold ',
                style: 'font-size: 15px;',
                format: val => `${val.replace(/(\d*)-(\d*)-(\d*).*/, "$3-$2-$1")}`
            },
            {
                name: "status",
                label: "Status",
                field: "status",
                type: "text",
                width: "50px",
                align: "center",
                style: 'font-weight: bold;',
                headerClasses: 'bg-primary text-white text-uppercase text-bold',
                style: 'font-size: 15px;',
            }
        ],
        bag: []
    }),
    mounted() {
        this.buscarBags();
    },
    methods: {
        confirmarPedido() {
            this.confirm = true
        },
        async solicitarBag() {
            const cadastroPreenchido = await axios({
                method: "GET",
                url: `${this.baseUrl}/cliente/validate`,
                headers: {
                    Authorization: `${this.token}`
                }
            });

            if(!cadastroPreenchido.data.available) {
                this.$q.dialog({
                    title: 'Atenção!',
                    message: 'Para solicitar a Bag é necessário ter todos os cadastros preenchidos.'
                })
                return false
            }



            axios({
                method: "POST",
                url: `${this.baseUrl}/bag`,
                headers: {
                    Authorization: `${this.token}`
                }
            }).then(response => {
                localStorage.setItem("bag", JSON.stringify(response.data));
            });

            setTimeout(() => {
                this.$q.dialog({
                    title: 'Parabéns!!!',
                    message: 'Sua bag foi solicitada com sucesso!'
                })
                this.buscarBags();
            }, 500); 
        },
        async buscarBags() {
            const response = await axios({
                method: "GET",
                url: `${this.baseUrl}/bag/detail`,
                headers: {
                    Authorization: `${this.token}`
                }
            });
            this.bag = Object.assign(response.data);
        }
    }
};
</script>
