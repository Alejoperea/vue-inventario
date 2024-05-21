<template>
    <div class="container text-start">
        <h1 class="text-primary fw-bold">Nuevo Producto</h1>
        <div class="card">
            <div class="card-header fw-bold">
                Producto
            </div>
            <div class="card-body">
                <form @submit.prevent="saveProducto">
                    <div class="row mb-3">
                        <label for="nombre" class="form-label">Nombre</label>
                        <div class="input-group">
                            <div class="input-group-text">
                                <font-awesome-icon icon="tag" />
                            </div>
                            <input type="text" class="form-control" id="nombre" placeholder="Nombre"
                                v-model="producto.nombre"/>
                        </div>
                    </div>

                    <div class="row mb-3">
                        <label for="descripcion" class="form-label">Descripcion</label>
                        <div class="input-group">
                            <div class="input-group-text">
                                <font-awesome-icon icon="building" />
                            </div>
                            <input type="text" class="form-control" id="descripcion" placeholder="Descripcion"
                                v-model="producto.descripcion" />
                        </div>
                    </div>

                    <div class="row mb-3">
                        <label for="precio" class="form-label">Precio</label>
                        <div class="input-group">
                            <div class="input-group-text">
                                <font-awesome-icon icon="dollar-sign" />
                            </div>
                            <input type="number" class="form-control" id="precio" placeholder="Precio"
                                v-model="producto.precio" />
                        </div>
                    </div>
                    
                    <div class="row mb-3">
                        <label for="categoria_id" class="form-label">Categoría</label>
                        <div class="input-group">
                            <div class="input-group-text">
                                <font-awesome-icon icon="folder" />
                            </div>
                            <select class="form-select" id="categoria_id" v-model="producto.categoria_id">
                                <option v-for="categoria in categorias" :value="categoria.id">{{ categoria.nombre }}
                                </option>
                            </select>
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
    name: 'NewProducto',
    data() {
        return {
            producto: {
                id: 0,
                nombre: '',
                descripcion: '',
                precio: '',
                categoria_id: ''
            },
            categorias: [],
            categoria_id: "0",

            errorMessage: ''
        };
    },
    methods: {
        cancelar() {
            this.$router.push({ name: 'productos' });
        },
        async saveProducto() {
            try {
                const res = await axios.post('http://127.0.0.1:8000/api/productos', this.producto);
                if (res.status === 200) {
                    this.$router.push({ name: 'productos' });
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Producto creado exitosamente',
                        showConfirmButton: false,
                        timer: 2000
                    });
                }
            } catch (error) {
                if (error.response && error.response.status === 422) {
                    this.errorMessage = 'El nombre del producto ya existe.';
                } else {
                    this.errorMessage = 'Ocurrió un error al crear el producto.';
                }
            }
        },
        async loadCategorias() {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/categorias');
                this.categorias = response.data.categorias;
            } catch (error) {
                this.errorMessage = 'Ocurrió un error al cargar las categorías.';
            }
        }
    },
    mounted() {
        this.loadCategorias();
    }
}
</script>
