<script setup>
import Header from './components/Header.vue';
import DataTable from './components/DataTable.vue';
</script>

<template>
  <v-app>
    <v-app-bar color="primary" title="1001 Albums Viewer"></v-app-bar>
    <v-main>
      <v-container fluid>
        <v-row >
          <v-col align="center" cols="12">
            <Header></Header>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col align="left" cols="12">
            <DataTable></DataTable>
          </v-col>
        </v-row>
        
      </v-container>
    </v-main>
  </v-app>
</template>


<style scoped>

</style>