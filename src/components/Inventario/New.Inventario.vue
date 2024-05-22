<template>
    <div class="container text-start">
        <h1 class="text-primary fw-bold">Nuevo Inventario</h1>
        <div class="card">
            <div class="card-header fw-bold">
                Inventario
            </div>
            <div class="card-body">
                <form @submit.prevent="saveInventario">
                    <div class="row mb-3">
                        <label for="producto_id" class="form-label">Producto</label>
                        <div class="input-group">
                            <div class="input-group-text">
                                <font-awesome-icon icon="folder" />
                            </div>
                            <select class="form-select" id="producto_id" v-model="inventario.producto_id">
                                <option v-for="producto in productos" :key="producto.id" :value="producto.id">{{ producto.nombre }}</option>
                            </select>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="proveedor_id" class="form-label">Proveedores</label>
                        <div class="input-group">
                            <div class="input-group-text">
                                <font-awesome-icon icon="folder" />
                            </div>
                            <select class="form-select" id="proveedor_id" v-model="inventario.proveedor_id">
                                <option v-for="proveedor in proveedores" :key="proveedor.id" :value="proveedor.id">{{ proveedor.nombre }}</option>
                            </select>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="cantidad" class="form-label">Cantidad : </label>
                        <div class="input-group">
                            <div class="input-group-text"><font-awesome-icon icon="building" /></div>
                            <input type="number" class="form-control" id="cantidad" placeholder="Cantidad" v-model="inventario.cantidad">
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
    name: 'NewInventario',
    data() {
        return {
            inventario: {
                id: '',
                producto_id: '',
                proveedor_id: '',
                cantidad: '',
            },
            productos: [],
            proveedores: [],
            errorMessage: ''
        };
    },
    methods: {
        cancelar() {
            this.$router.push({ name: 'inventarios' });
        },
        async saveInventario() {
            try {
                const res = await axios.post('http://127.0.0.1:8000/api/inventarios', this.inventario);
                if (res.status === 200) {
                    this.$router.push({ name: 'inventarios' });
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Inventario creado exitosamente',
                        showConfirmButton: false,
                        timer: 2000
                    });
                }
            } catch (error) {
                if (error.response && error.response.status === 422) {
                    this.errorMessage = 'El nombre del inventario ya existe.';
                } else {
                    this.errorMessage = 'Ocurrió un error al crear el inventario.';
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
        },
        async loadProveedores() {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/proveedores');
                this.proveedores = response.data.proveedores;
            } catch (error) {
                this.errorMessage = 'Ocurrió un error al cargar los proveedores.';
            }
        }
    },
    mounted() {
        this.loadProductos();
        this.loadProveedores();
    }
}
</script>
