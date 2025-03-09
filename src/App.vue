<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'
</script>

<template>
  <header>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <RouterLink class="navbar-brand" to="/">
          <img alt="Vue logo" src="@/assets/logo.svg" width="30" height="30" class="d-inline-block align-top" />
          SårScore
        </RouterLink>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <RouterLink class="nav-link" to="/patient/27115743487">Tore</RouterLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>

  <main class="container">
    <RouterView />
  </main>
</template>

<style scoped>
/* No additional styles needed for Bootstrap integration */
</style>
