<template>
    <div class="container"> 
        <h1 class="text-start">Listado Proveedores
            <button @click="newProveedor()"
                    class="btn btn-success mx-2">
                    <font-awesome-icon icon="plus" />
            </button>
        </h1>
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Contacto</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(proveedor, index) in proveedores" :key="index">
                    <th scope="row">{{ proveedor.id }}</th>
                    <td>{{ proveedor.nombre }}</td>
                    <td>{{ proveedor.contacto }}</td>

                    <td>
                        <button @click="deleteProveedor(proveedor.id)"
                            class="btn btn-danger mx-2">
                            <font-awesome-icon icon="trash" />
                        </button>

                        <button @click="editProveedor(proveedor.id)"
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
    name: 'Proveedores',
    data() {
        return {
            proveedores: []
        }
    },
    methods: {
        deleteProveedor(codigo){
            Swal.fire({
                title: `Quieres Eliminar el proveedor con el id ${codigo}?`,
                showCancelButton: true,
                confirmButtonText: 'Delete',
            }).then((result) =>{
                if(result.isConfirmed){
                    axios.delete(`http://127.0.0.1:8000/api/proveedores/${codigo}`)
                    .then(response =>{
                        if (response.data.success) {
                            Swal.fire('Deleted!!','', 'success');
                            this.proveedores = this.proveedores.filter(prov => prov.id !== codigo);
                        }
                    })
                }
            })
        },

        editProveedor(id){
            this.$router.push({name: 'EditarProveedor', params: {id: `${id}`}});
        },
        newProveedor(){
            this.$router.push({name: 'NewProveedor'});
        }
    },
    mounted() {
        axios
            .get(`http://127.0.0.1:8000/api/proveedores`)
            .then(response => {
            
                this.proveedores = response.data.proveedores;
            })
    },
}
</script>