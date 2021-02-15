<template>
  <div class="page-inner">
    <sidebar />

    <div class="page-content-wrapper">
      <layout-header />
      <!-- <q-header elevated class="bg-primary text-white"> -->
        <!-- <q-toolbar>
          <q-btn
            v-if="logged_in"
            dense
            flat
            round
            icon="menu"
            @click="left = !left"
          />

          <q-toolbar-title clickable to="/">
            <q-icon class="q-pb-lg q-pt-lg" name="monetization_on" />
            OptionStrats
          </q-toolbar-title>
          <q-btn v-if="logged_in" flat round icon="notifications">
            <q-menu>
              <div class="q-pa-md">
                <q-list>
                  <q-item-section
                    v-for="notification in notifications"
                    :key="notification.id"
                  >
                    <q-item>
                      <q-toolbar class="bg-primary text-white shadow-2">
                        <q-toolbar-title>{{ notification.day }}</q-toolbar-title>
                      </q-toolbar>
                    </q-item>
                    <q-item
                      v-for="alert in notification.alerts"
                      :key="alert.id"
                      clickable
                      v-ripple
                    >
                      <div class="row">
                        <q-icon name="arrow_upward" v-if="alert.up" />
                        <q-icon name="arrow_downward" v-if="!alert.up" />
                      </div>
                      <div class="row">
                        <q-item-label>{{ alert.message }}</q-item-label>
                      </div>
                    </q-item>
                  </q-item-section>
                </q-list>
              </div>
            </q-menu>
          </q-btn>
          <q-btn
            v-if="logged_in"
            flat
            round
            icon="forum"
            @click="right = !right"
          />
          <q-btn v-if="logged_in" flat round icon="face">
            <q-menu>
              <div class="row no-wrap q-pa-md">
                <div class="column items-center q-lg">
                  <q-list padding class="rounded-borders text-primary">
                    <q-item clickable v-ripple to="account_settings">
                      <q-item-section avatar>
                        <q-icon name="settings" />
                      </q-item-section>

                      <q-item-section>Account Settings</q-item-section>
                    </q-item>

                    <q-item clickable v-ripple to="payment_accounts">
                      <q-item-section avatar>
                        <q-icon name="payment" />
                      </q-item-section>

                      <q-item-section>Payment Information</q-item-section>
                    </q-item>

                    <q-item clickable v-ripple to="subscription">
                      <q-item-section avatar>
                        <q-icon name="autorenew" />
                      </q-item-section>

                      <q-item-section>Subscription</q-item-section>
                    </q-item>

                    <q-item clickable v-ripple to="invoices">
                      <q-item-section avatar>
                        <q-icon name="account_balance" />
                      </q-item-section>

                      <q-item-section>Invoices</q-item-section>
                    </q-item>

                    <q-item clickable v-ripple to="privacy">
                      <q-item-section avatar>
                        <q-icon name="verified_user" />
                      </q-item-section>

                      <q-item-section>Privacy</q-item-section>
                    </q-item>
                  </q-list>
                </div>

                <q-separator vertical class="q-mx-sm" />

                <div class="column items-center q-pa-xs">
                  <div class="row items-center">
                    <q-avatar size="72px">
                      <img src="https://cdn.quasar.dev/img/avatar4.jpg" />
                    </q-avatar>
                  </div>
                  <div class="row items-center">
                    <div class="text-subtitle1 q-mtb-xs">Mr Admin</div>
                  </div>
                  <q-separator dark class="q-mx-sm" />
                  <div class="row q-pa-sm items-center verticle-bottom">
                    <q-toggle v-model="dark_theme" label="Dark Theme" />
                  </div>
                  <q-separator dark class="q-mx-sm" />
                  <div class="row items-center">
                    <q-btn
                      color="primary"
                      label="Logout"
                      push
                      size="sm"
                      v-close-popup
                    />
                  </div>
                </div>
              </div>
            </q-menu>
          </q-btn>
          <q-btn v-else color="blue" label="Log In"></q-btn>
        </q-toolbar> -->

        <!-- <q-tabs v-if="$q.platform.is.mobile" align="center">
          <q-route-tab to="/dashboard" label="Dashboard" />
          <q-route-tab to="/backtest" label="Backtest" />
          <q-route-tab to="/advice" label="Advice" />
          <q-route-tab to="/api" label="API" />
        </q-tabs> -->
      <!-- </q-header> -->

      <!-- <q-drawer v-if="logged_in" v-model="right" side="right" overlay bordered>
        <div class="q-pa-md col full-height no-wrap justify-center">
          <div style="width: 100%; max-width: 400px">
            <q-list row dense>
              <q-item v-for="message in message_log" :key="message.id">
                <q-item-section>
                  <q-chat-message :text="message.text" sent v-if="message.sent" />
                  <q-chat-message :text="message.text" v-else />
                </q-item-section>
              </q-item>
            </q-list>
            <q-space />
            <div row>
              <q-input />
              <q-btn label="send" color="primary" />
            </div>
          </div>
        </div>
      </q-drawer> -->

      <main id="js-page-content" role="main" class="page-content">
        <router-view />
      </main>
      <!-- this overlay is activated only when mobile menu is triggered -->
      <div class="page-content-overlay" data-action="toggle" data-class="mobile-nav-on"></div> <!-- END Page Content -->
    </div>
  </div>
</template>

<script>
// import { Platform } from "quasar";
import LayoutHeader from './Header'
import Sidebar from './Sidebar'

export default {
  components: {
    LayoutHeader,
    Sidebar
  },
  data() {
    return {
      dark_theme: false,
      link: "dashboard",
      left: true,
      right: true,
      message_log: [
        {
          id: 1,
          text: ["How much money did you make?"],
          sent: false
        },
        {
          id: 2,
          text: ["All of it!", "It was great :)"],
          sent: true
        }
      ],
      notifications: [
        {
          id: 1,
          day: "Aug 8th",
          alerts: [
            {
              id: 1,
              message: "IBM stock price dropped",
              up: false
            },
            {
              id: 2,
              message: "APPL stock price dropped",
              up: false
            }
          ]
        },
        {
          id: 2,
          day: "Aug 9th",
          alerts: [
            {
              id: 1,
              message: "APPL stock price increased",
              up: true
            }
          ]
        },
        {
          id: 3,
          day: "Aug 10th",
          alerts: [
            {
              id: 1,
              message: "IMB stock price increased",
              up: true
            }
          ]
        }
      ]
    };
  },
  computed: {
    //logged_in: function(){ return this.$store.getters.isLoggedIn }
    logged_in: function() {
      return true;
    }
  }
};
</script>

<style scoped></style>
