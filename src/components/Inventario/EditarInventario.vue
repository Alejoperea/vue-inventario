<template>
    <div class="container text-start">
        <h1 class="text-primary fw-bold">Nuevo Inventario</h1>
        <div class="card">
            <div class="card-header fw-bold">
                Inventario
            </div>
            <div class="card-body">
                <form @submit.prevent="updateInventario">
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
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
    name: 'EditarInventario',
    data() {
        return {
            inventario: {
                id: 0,
                producto_id : '',
                proveedor_id : '',
                cantidad: '',
            },
            productos: [],
            proveedores: []

        }
    },
    methods: {
      cancelar() {
        this.$router.push({ name: 'inventarios' })
      },
      async updateInventario() {
        const res = await axios.put(`http://127.0.0.1:8000/api/inventarios/${this.inventario.id}`, this.inventario)
        if (res.status === 200) {
          this.$router.push({ name: 'inventarios' })
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'El Inventario ha sido actualizado',
            showConfirmButton: false,
            timer: 2000
          })
        }
      },
      loadInventario() {
        axios.get(`http://127.0.0.1:8000/api/inventarios/${this.$route.params.id}`)
          .then(response => {
            this.inventario = response.data.inventario;
          });
      },
      loadProductos() {
        axios.get(`http://127.0.0.1:8000/api/productos`)
          .then(response => {
            this.productos = response.data.productos;
          });
      },
      loadProveedores() {
        axios.get(`http://127.0.0.1:8000/api/proveedores`)
          .then(response => {
            this.proveedores = response.data.proveedores;
          });
      }
    },
    mounted() {
      this.loadInventario();
      this.loadProductos();
      this.loadProveedores();
    }
}

</script>