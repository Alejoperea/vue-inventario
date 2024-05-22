<template>
    <div class="container text-start">
        <h1 class="text-primary fw-bold">Editar Transaccion</h1>
        <div class="card">
            <div class="card-header fw-bold">
                Transaccion
            </div>
            <div class="card-body">
                <form @submit.prevent="updateTransaccion">
                    <div class="row mb-3">
                        <label for="id" class="form-label">Codigo</label>
                        <div class="input-group">
                            <div class="input-group-text"><font-awesome-icon icon="tag" /></div>
                            <input type="text" class="form-control" id="id" placeholder="Id Transaccion" disabled
                                v-model='transaccion.id'>
                        </div>
                    </div>

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
                        <label for="producto_id " class="form-label">Producto</label>
                        <div class="input-group">
                            <div class="input-group-text">
                                <font-awesome-icon icon="folder" />
                            </div>
                            <select class="form-select" id="producto_id " v-model="transaccion.producto_id">
                                <option v-for="producto in productos" :value="producto.id">{{ producto.nombre }}
                                </option>
                            </select>
                        </div>
                    </div>

                    <div class="row mb-3">
                        <label for="cantidad" class="form-label">Cantidad : </label>
                        <div class=" input-group">
                            <div class="input-group-text"><font-awesome-icon icon="building" /></div>
                            <input type="number" class="form-control" id="cantidad" placeholder="Cantidad" 
                                v-model='transaccion.cantidad'>
                        </div>
                    </div>

                    <div class="row mb-3">
                        <label for="fecha" class="form-label">Fecha : </label>
                        <div class=" input-group">
                            <div class="input-group-text"><font-awesome-icon icon="building" /></div>
                            <input type="date" class="form-control" id="fecha" placeholder="Fecha" 
                                v-model='transaccion.fecha'>
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
    name: 'EditarTransaccion',
    data() {
        return {
            transaccion: {
                id: 0,
                tipo: '',
                producto_id : '',
                cantidad: '',
                fecha: ''
            },
            productos: []

        }
    },
    methods: {
      cancelar() {
        this.$router.push({ name: 'transacciones' })
      },
      async updateTransaccion() {
        const res = await axios.put(`http://127.0.0.1:8000/api/transacciones/${this.transaccion.id}`, this.transaccion)
        if (res.status === 200) {
          this.$router.push({ name: 'transacciones' })
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Transaccion ha sido actualizado',
            showConfirmButton: false,
            timer: 2000
          })
        }
      },
      loadTransaccion() {
        axios.get(`http://127.0.0.1:8000/api/transacciones/${this.$route.params.id}`)
          .then(response => {
            this.transaccion = response.data.transaccion;
          });
      },
      loadProductos() {
        axios.get(`http://127.0.0.1:8000/api/productos`)
          .then(response => {
            this.productos = response.data.productos;
          });
      }
    },
    mounted() {
      this.loadTransaccion();
      this.loadProductos();
    }
}

</script>
