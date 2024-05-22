<template>
    <div class="container text-start">
        <h1 class="text-primary fw-bold">Editar Proveedores</h1>
        <div class="card">
            <div class="card-header fw-bold">
                Proveedores
            </div>
            <div class="card-body">
                <form @submit.prevent="updateProveedor">
                    <div class="row mb-3">
                        <label for="id" class="form-label">Codigo</label>
                        <div class="input-group">
                            <div class="input-group-text"><font-awesome-icon icon="tag" /></div>
                            <input type="text" class="form-control" id="id" placeholder="Id Proveedor" disabled
                                v-model='proveedor.id'>
                        </div>
                    </div>

                    <div class="row mb-3">
                        <label for="nombre" class="form-label">Nombre: </label>
                        <div class=" input-group">
                            <div class="input-group-text"><font-awesome-icon icon="building" /></div>
                            <input type="text" class="form-control" id="nombre" placeholder="Nombre" 
                                v-model='proveedor.nombre'>
                        </div>
                    </div>

                    <div class="row mb-3">
                        <label for="contacto" class="form-label">Contacto : </label>
                        <div class=" input-group">
                            <div class="input-group-text"><font-awesome-icon icon="building" /></div>
                            <input type="number" class="form-control" id="contacto" placeholder="Contacto" 
                                v-model='proveedor.contacto'>
                        </div>
                    </div>

                    <button class="btn btn-primary" type="submit">Actualizar</button>
                    <button class="btn btn-secondary mx-2" @click="cancelar">Cancelar</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'


export default {
    name: 'EditarProveedor',
    data() {
        return {
            proveedor: {
                id: 0,
                nombre: '',
                contacto: ''
            }

        }
    },
    methods: {
        cancelar() {
            this.$router.push({ name: 'proveedores' })
        },

        async updateProveedor() {
            const res = await axios.put(`http://127.0.0.1:8000/api/proveedores/${this.proveedor.id}`, this.proveedor);

            if (res.status == 200) {
                this.$router.push({ name: 'proveedores' })
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Proveedor ha sido actualizada',
                    showConfirmButton: false,
                    timer: 2000
                })
            }
        }
    },
    mounted() {
        this.proveedor.id = this.$route.params.id
        axios.get(`http://127.0.0.1:8000/api/proveedores/${this.proveedor.id}`)
            .then(response => {
                this.proveedor = response.data.proveedor;
            })
    },
}

</script>