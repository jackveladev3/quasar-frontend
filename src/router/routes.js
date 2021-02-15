
const routes = [
  {
    path: "/",
    component: () => import("layouts/Layout.vue"),
    children: [
      {
        path: "/",
        component: () => import("pages/Backtest.vue"),
        name: 'home'
      },
      {
        path: "/main_dashboard",
        component: () => import("pages/Dashboard.vue"),
        name: 'main_dashboard'
      },
      {
        path: "/backtest",
        component: () => import("pages/Backtest.vue"),
        name: 'backtest'
      },
      {
        path: "/dashboard/:ticker",
        name: 'ticker_dashboard',
        component: () => import("../pages/TickerDashboard.vue"),
      },
      {
        path: "/pnl_calculator/:ticker",
        name: 'pnl_calculator',
        component: () => import("../pages/OptionPNLCalculator.vue"),
      },
      {
        path: "/component_test",
        name: 'ComponentTest',
        component: () => import("pages/ComponentTest.vue"),
      },
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
