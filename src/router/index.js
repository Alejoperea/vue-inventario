  import { createRouter, createWebHashHistory } from 'vue-router'

  import EditarCategoria from '../components/Categoria/EditarCategoria.vue';
  import NewCategoria from '../components/Categoria/NewCategoria.vue';

  import EditarProducto from '../components/Producto.vue/EditarProducto.vue';
  import NewProducto from '@/components/Producto.vue/NewProducto.vue';

  import EditarTransaccion from '../components/Transaccion/EditarTransaccion.vue';
  import NewTransaccion from '../components/Transaccion/NewTransaccion.vue';

  import EditarProveedor from '../components/Proveedor/EditarProveedor.vue';
  import NewProveedor from '../components/Proveedor/NewProveedor.vue';

  import EditarInventario from '../components/Inventario/EditarInventario.vue';
  import NewInventario from '../components/Inventario/New.Inventario.vue';

  import Categoria from '../views/Categorias.vue';
  import Proveedor from '../views/Proveedores.vue';
  import Producto from '../views/Productos.vue';
  import Transaccion from '../views/Transacciones.vue';
  import Inventario from '../views/Inventarios.vue';
  import HomeView from '../views/HomeView.vue'

  const routes = [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/categorias',
      name: 'categorias',
      component: Categoria
    },

    {
      path: '/categorias/editar/:id',
      name: 'EditarCategoria',
      component: EditarCategoria 
    },

    {
      path: '/categorias/nueva',
      name: 'NewCategoria',
      component: NewCategoria
    },

    {
      path: '/productos',
      name: 'productos',
      component: Producto
    },

    {
      path: '/productos/editar/:id',
      name: 'EditarProducto',
      component: EditarProducto 
    },

    {
      path: '/productos/nueva',
      name: 'NewProducto',
      component: NewProducto
    },

    {
      path: '/transacciones',
      name: 'transacciones',
      component: Transaccion
    },

    {
      path: '/transacciones/editar/:id',
      name: 'EditarTransaccion',
      component: EditarTransaccion 
    },

    {
      path: '/transaccion/nueva',
      name: 'NewTransaccion',
      component: NewTransaccion
    },

    {
      path: '/proveedores',
      name: 'proveedores',
      component: Proveedor
    },

    {
      path: '/proveedores/editar/:id',
      name: 'EditarProveedor',
      component: EditarProveedor 
    },

    {
      path: '/proveedores/nueva',
      name: 'NewProveedor',
      component: NewProveedor
    },

    {
      path: '/inventarios',
      name: 'inventarios',
      component: Inventario
    },

    {
      path: '/inventarios/editar/:id',
      name: 'EditarInventario',
      component: EditarInventario 
    },

    {
      path: '/inventarios/nueva',
      name: 'NewInventario',
      component: NewInventario
    },

    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
    }
  ]

  const router = createRouter({
    history: createWebHashHistory(),
    routes
  })

  export default router
