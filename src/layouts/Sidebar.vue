<template>
  <!-- BEGIN Left Aside -->
  <aside class="page-sidebar">
    <div class="page-logo">
      <router-link
        class="page-logo-link press-scale-down d-flex align-items-center position-relative"
        data-toggle="modal"
        data-target="#modal-shortcut"
        to="/"
      >
        <img
          src="statics/img/logo.png"
          alt="Optionstrats"
          aria-roledescription="logo"
          style="width: 30px; height: 30px"
        />
        <span class="page-logo-text mr-1">Optionstrats WebApp</span>
        <span class="position-absolute text-white opacity-50 small pos-top pos-right mr-2 mt-n2"></span>
        <i class="fal fa-angle-down d-inline-block ml-1 fs-lg color-primary-300"></i>
      </router-link>
    </div>
    <!-- BEGIN PRIMARY NAVIGATION -->
    <nav id="js-primary-nav" class="primary-nav" role="navigation">
      <div class="nav-filter">
        <div class="position-relative">
          <!-- FILTER MENU -->
          <input
            type="text"
            id="nav_filter_input"
            placeholder="Filter menu"
            class="form-control"
            tabindex="0"
          />
          <a
            href="#"
            onclick="return false;"
            class="btn-primary btn-search-close js-waves-off"
            data-action="toggle"
            data-class="list-filter-active"
            data-target=".page-sidebar"
          >
            <i class="fal fa-chevron-up"></i>
          </a>
        </div>
      </div>

      <div class="info-card">
        <img
          src="statics/img/user-avatar.png"
          class="profile-image rounded-circle"
          alt="Dr. John Doe"
        />
        <div class="info-card-text">
          <a href="#" class="d-flex align-items-center text-white">
            <span class="text-truncate text-truncate-sm d-inline-block">Dr. John Doe</span>
          </a>
          <span class="d-inline-block text-truncate text-truncate-sm">Dallas, Texas</span>
        </div>
        <img src="statics/img/sidebar-bg.png" class="cover" alt="cover" />
        <a
          href="#"
          onclick="return false;"
          class="pull-trigger-btn"
          data-action="toggle"
          data-class="list-filter-active"
          data-target=".page-sidebar"
          data-focus="nav_filter_input"
        >
          <i class="fal fa-angle-down"></i>
        </a>
      </div>

      <ul class="nav-menu" id="js-nav-menu">
        <router-link active-class="active" tag="li" :to="{ name: 'main_dashboard' }" exact>
          <a>
            <i class="fal fa-chart-pie"></i>
            <span class="nav-link-text" data-i18n="nav.dashboards_main">Dashboard</span>
          </a>
        </router-link>

        <router-link
          active-class="active"
          tag="li"
          :to="{ name: 'ticker_dashboard', params: { ticker: 'IBM' } }"
          exact
        >
          <a>
            <i class="fal fa-chart-pie"></i>
            <span class="nav-link-text" data-i18n="nav.dashboards_main">Ticker Dashboard</span>
          </a>
        </router-link>

        <router-link
          active-class="active"
          tag="li"
          :to="{ name: 'pnl_calculator', params: { ticker: 'IBM' } }"
          exact
        >
          <a>
            <i class="fal fa-calculator"></i>
            <span class="nav-link-text" data-i18n="nav.dashboards_main">PNL Calculator</span>
          </a>
        </router-link>

        <router-link active-class="active" tag="li" :to="{ name: 'backtest' }" exact>
          <a>
            <i class="fal fa-chart-line"></i>
            <span class="nav-link-text" data-i18n="nav.backtest">Backtest</span>
          </a>
        </router-link>

        <router-link active-class="active" tag="li" :to="{ name: 'advice' }" exact>
          <a>
            <i class="ni ni-eyeglasses"></i>
            <span class="nav-link-text" data-i18n="nav.advide">Advice</span>
          </a>
        </router-link>

        <router-link
          active-class="active"
          tag="li"
          :to="{ name: 'ComponentTest' }"
          exact
        >
          <a>
            <!-- <i class="fal fa-hard-hat"></i> -->
            <span class="nav-link-text" data-i18n="nav.dashboards_main">Component Test Page</span>
          </a>
        </router-link>
      </ul>

      <div class="filter-message js-filter-message bg-success-600"></div>
    </nav>
    <!-- END PRIMARY NAVIGATION -->
    <!-- NAV FOOTER -->
    <div class="nav-footer shadow-top">
      <a
        href="#"
        onclick="return false;"
        data-action="toggle"
        data-class="nav-function-minify"
        class="hidden-md-down"
      >
        <i class="ni ni-chevron-right"></i>
        <i class="ni ni-chevron-right"></i>
      </a>
      <ul class="list-table m-auto nav-footer-buttons">
        <li>
          <a
            href="javascript:void(0);"
            data-toggle="tooltip"
            data-placement="top"
            title="Chat logs"
          >
            <i class="fal fa-comments"></i>
          </a>
        </li>
        <li>
          <a
            href="javascript:void(0);"
            data-toggle="tooltip"
            data-placement="top"
            title="Support Chat"
          >
            <i class="fal fa-life-ring"></i>
          </a>
        </li>
        <li>
          <a
            href="javascript:void(0);"
            data-toggle="tooltip"
            data-placement="top"
            title="Make a call"
          >
            <i class="fal fa-phone"></i>
          </a>
        </li>
      </ul>
    </div>
    <!-- END NAV FOOTER -->
  </aside>
  <!-- END Left Aside -->
</template>