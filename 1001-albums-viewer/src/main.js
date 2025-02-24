import { createApp } from 'vue'
import {createVuetify } from "vuetify"
import App from './App.vue'
import "vuetify/styles"
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'

const customTheme = {
  dark: true,
  colors: {
    background: '#242424',
    surface: '#242424',
    'surface-bright': '#FFFFFF',
    'surface-light': '#EEEEEE',
    'surface-variant': '#424242',
    'on-surface-variant': '#EEEEEE',
    primary: '#646cff',
    'primary-darken-1': '#1F5592',
    secondary: '#48A9A6',
    'secondary-darken-1': '#018786',
    secondary: '#48A9A6',
    error: '#B00020',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FB8C00',
  }
}


const vuetify = createVuetify({
  theme: {
    defaultTheme: "customTheme",
    themes: {
      customTheme
    }
  },
  components,
  directives,
  })

const app = createApp(App)
            .use(vuetify);

app.mount('#app')
