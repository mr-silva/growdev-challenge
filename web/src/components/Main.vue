
<template>
  <v-app-bar title="Consulta de Alunos"></v-app-bar>

  <v-main>
    <Toolbar />
    <v-divider :thickness="5" class="border-opacity-100 mt-12"></v-divider>

    <Suspense>
      <DataTable />
    </Suspense>

  </v-main>
</template>

<script setup lang="ts">
import DataTable from './DataTable.vue'

</script>

