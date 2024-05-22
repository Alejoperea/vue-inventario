<template>
    <div class="container"> 
        <h1 class="text-start">Listado Inventarios 
            <button @click="newInventario()"
                    class="btn btn-success mx-2">
                    <font-awesome-icon icon="plus" />
            </button>
        </h1>
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Producto</th>
                    <th scope="col">Proveedor</th>
                    <th scope="col">Cantidad</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(inventario, index) in inventarios" :key="index">
                    <th scope="row">{{ inventario.id }}</th>
                    <td>{{ inventario.producto_nombre }}</td>
                    <td>{{ inventario.proveedor_nombre }}</td>
                    <td>{{ inventario.cantidad }}</td>
                    <td>
                        <button @click="deleteInventario(inventario.id)"
                            class="btn btn-danger mx-2">
                            <font-awesome-icon icon="trash" />
                        </button>
                        <button @click="editInventario(inventario.id)"
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
    name: 'Inventarios',
    data() {
        return {
            inventarios: []
        }
    },
    methods: {
        deleteInventario(id){
            Swal.fire({
                title: `Quieres Eliminar el Inventario con el id ${id}?`,
                showCancelButton: true,
                confirmButtonText: 'Delete',
            }).then((result) =>{
                if(result.isConfirmed){
                    axios.delete(`http://127.0.0.1:8000/api/inventarios/${id}`)
                    .then(response =>{
                        if (response.data.success) {
                            Swal.fire('Deleted!!','', 'success');
                            this.inventarios = this.inventarios.filter(inv => inv.id !== id);
                        }
                    })
                }
            })
        },

        editInventario(id){
            this.$router.push({name: 'EditarInventario', params: {id: `${id}`}});
        },
        newInventario(){
            this.$router.push({name: 'NewInventario'});
        }
    },
    mounted() {
        axios
            .get(`http://127.0.0.1:8000/api/inventarios`)
            .then(response => {
                this.inventarios = response.data.inventarios;
            })
    },
}
</script>
