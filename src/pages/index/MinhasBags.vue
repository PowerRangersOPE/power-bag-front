<template>
<div>
    <div>
        <q-item-label class="text-h5 q-mb-md q-mt-md q-ml-sm">
            Minhas Bags
        </q-item-label>
        <div class="col q-mb-sm">
            <q-btn color="green" label="Solicitar nova Bag" @click="solicitarBag()" />
        </div>
    </div>
    <q-table title="" dense row-key="id" v-table-ext :columns="[
        {
          name: 'data',
          label: 'Data do Pedido',
          field: 'data',
          sortable: true,
          type: 'date',
          width: '50px'
        },
        {
          name: 'status',
          label: 'Status do Pedido',
          field: 'status',
          sortable: true,
          type: 'text',
          width: '50px'
        },
        {
          name: 'solicitarDevolucao',
          label: 'Solicitar Devolução',
          type: 'text',
          width: '50px'
        }
      ]">
        <q-td slot="body-cell-actions" class="no-padding" slot-scope="props" :props="props">
            <q-btn small flat icon="delete" @click="deleteCadastro(props.row)" title="Remover" />
        </q-td>
        <q-td slot="body-cell-cor" class="no-padding" slot-scope="props" :props="props">
        </q-td>
    </q-table>
</div>
</template>

<script>
import axios from "axios";

export default {
    name: "minhasBags",
    data: () => ({
        tableModel: {},
        searchReq: null,
        token: localStorage.getItem("token"),
        baseUrl: "https://power-bag.herokuapp.com"
    }),
    created() {
        this.tableModel = null;
    },
    methods: {
        deleteCadastro(props) {
            console.log(props);
        },
        solicitarBag() {
            axios({
                method: "POST",
                url: `${this.baseUrl}/bag`,
                headers: {
                    Authorization: `${this.token}`
                }
            }).then(response => {
                localStorage.setItem("bag", JSON.stringify(response.data));
            });
        }
    }
};
</script>
