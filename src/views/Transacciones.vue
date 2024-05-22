<template>
    <div class="container"> 
        <h1 class="text-start">Listado Transacciones 
            <button @click="newTransaccion()"
                    class="btn btn-success mx-2">
                    <font-awesome-icon icon="plus" />
            </button>
        </h1>
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Tipo</th>
                    <th scope="col">Producto</th>
                    <th scope="col">Cantidad</th>
                    <th scope="col">Fecha </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(transaccion, index) in transacciones" :key="index">
                    <th scope="row">{{ transaccion.id }}</th>
                    <td>{{ transaccion.tipo }}</td>
                    <td>{{ transaccion.producto_nombre  }}</td>
                    <td>{{ transaccion.cantidad }}</td>
                    <td>{{ transaccion.fecha }}</td>

                    <td>
                        <button @click="deleteTransaccion(transaccion.id)"
                            class="btn btn-danger mx-2">
                            <font-awesome-icon icon="trash" />
                        </button>

                        <button @click="editTransaccion(transaccion.id)"
                            class="btn btn-warning mx-2">
                            <font-awesome-icon icon="pencil" />
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";

export default {
    name: 'Transacciones',
    data() {
        return {
            transacciones: []
        }
    },
    methods: {
        deleteTransaccion(codigo){
            Swal.fire({
                title: `Quieres Eliminar la Transaccion con el id ${codigo}?`,
                showCancelButton: true,
                confirmButtonText: 'Delete',
            }).then((result) =>{
                if(result.isConfirmed){
                    axios.delete(`http://127.0.0.1:8000/api/transacciones/${codigo}`)
                    .then(response =>{
                        if (response.data.success) {
                            Swal.fire('Deleted!!','', 'success');
                            this.transacciones = this.transacciones.filter(tra => tra.id !== codigo);
                        }
                    })
                }
            })
        },

        editTransaccion(id){
            this.$router.push({name: 'EditarTransaccion', params: {id: `${id}`}});
        },
        newTransaccion(){
            this.$router.push({name: 'NewTransaccion'});
        }
    },
    mounted() {
        axios
            .get(`http://127.0.0.1:8000/api/transacciones`)
            .then(response => {
            
                this.transacciones = response.data.transacciones;
            })
    },
}
</script>
