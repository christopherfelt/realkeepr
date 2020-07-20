import Vue from "vue";
import Router from "vue-router";
// @ts-ignore
import Home from "./views/Home.vue";
// @ts-ignore
import Dashboard from "./views/Dashboard.vue";
// @ts-ignore
import VaultDetail from "./views/VaultDetail.vue";
// @ts-ignore
import KeepDetail from "./views/KeepDetail.vue";
// @ts-ignore
import KeepDetailPublic from "./views/KeepDetailPublic.vue";
import { authGuard } from "@bcwdev/auth0-vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: Dashboard,
      beforeEnter: authGuard,
    },
    {
      path: "/vault/:vaultId",
      name: "vaultDetail",
      component: VaultDetail,
      beforeEnter: authGuard,
    },
    {
      path: "/keep/:keepId",
      name: "keepDetail",
      component: KeepDetail,
      beforeEnter: authGuard,
    },
    {
      path: "/keepPublic/:keepId",
      name: "keepDetailPublic",
      component: KeepDetailPublic,
    },
  ],
});
