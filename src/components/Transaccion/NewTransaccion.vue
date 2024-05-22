<template>
    <div class="container text-start">
        <h1 class="text-primary fw-bold">Nueva Transaccion</h1>
        <div class="card">
            <div class="card-header fw-bold">
                Transaccion
            </div>
            <div class="card-body">
                <form @submit.prevent="saveTransaccion">
                    <div class="row mb-3">
                        <label for="tipo" class="form-label">Tipo: </label>
                        <div class="input-group">
                            <div class="input-group-text"><font-awesome-icon icon="building" /></div>
                            <select class="form-control" id="tipo" v-model="transaccion.tipo">
                                <option value="" disabled>Seleccionar tipo</option>
                                <option value="entrada">Entrada</option>
                                <option value="salida">Salida</option>
                            </select>
                        </div>
                    </div>

                    <div class="row mb-3">
                        <label for="producto_id" class="form-label">Producto</label>
                        <div class="input-group">
                            <div class="input-group-text">
                                <font-awesome-icon icon="folder" />
                            </div>
                            <select class="form-select" id="producto_id" v-model="transaccion.producto_id">
                                <option v-for="producto in productos" :key="producto.id" :value="producto.id">{{ producto.nombre }}</option>
                            </select>
                        </div>
                    </div>

                    <div class="row mb-3">
                        <label for="cantidad" class="form-label">Cantidad : </label>
                        <div class="input-group">
                            <div class="input-group-text"><font-awesome-icon icon="building" /></div>
                            <input type="number" class="form-control" id="cantidad" placeholder="Cantidad" v-model="transaccion.cantidad">
                        </div>
                    </div>

                    <div class="row mb-3">
                        <label for="fecha" class="form-label">Fecha : </label>
                        <div class="input-group">
                            <div class="input-group-text"><font-awesome-icon icon="building" /></div>
                            <input type="date" class="form-control" id="fecha" placeholder="Fecha" v-model="transaccion.fecha">
                        </div>
                    </div>

                    <button type="submit" class="btn btn-success">Agregar</button>
                    <button type="button" class="btn btn-secondary mx-2" @click="cancelar">Cancelar</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';

export default {
    name: 'NewTransaccion',
    data() {
        return {
            transaccion: {
                tipo: '',
                producto_id: '',
                cantidad: '',
                fecha: ''
            },
            productos: [],
            errorMessage: ''
        };
    },
    methods: {
        cancelar() {
            this.$router.push({ name: 'transacciones' });
        },
        async saveTransaccion() {
            try {
                const res = await axios.post('http://127.0.0.1:8000/api/transacciones', this.transaccion);
                if (res.status === 200) {
                    this.$router.push({ name: 'transacciones' });
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Transaccion creada exitosamente',
                        showConfirmButton: false,
                        timer: 2000
                    });
                }
            } catch (error) {
                if (error.response && error.response.status === 422) {
                    this.errorMessage = 'El nombre de la transaccion ya existe.';
                } else {
                    this.errorMessage = 'Ocurrió un error al crear la transaccion.';
                }
            }
        },
        async loadProductos() {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/productos');
                this.productos = response.data.productos;
            } catch (error) {
                this.errorMessage = 'Ocurrió un error al cargar los productos.';
            }
        }
    },
    mounted() {
        this.loadProductos();
    }
}
</script>
