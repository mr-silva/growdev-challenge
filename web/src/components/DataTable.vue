<template>
  <v-table hover class="mt-10">
    <thead class="bg-grey-lighten-1">
      <tr>
        <th class="text-left">Registro Acadêmico</th>
        <th class="text-left">Nome</th>
        <th class="text-left">CPF</th>
        <th class="text-left">Ações</th>
      </tr>
    </thead>
    <tbody :key="students.length">
      {{ console.log(students.length) }}
      <tr v-for="student in students" :key="student.id">
        <td>{{ student.academicRegistry }}</td>
        <td>{{ student.name }}</td>
        <td>{{ cpfMask(student.documentNumber) }}</td>
        <td>
          <v-btn size="small" color="#42A5F5"> Editar </v-btn>
          <v-btn @click="deleteStudent(student.id)" class="ml-2" size="small" color="#D32F2F">
            Excluir </v-btn>
        </td>
      </tr>
    </tbody>
  </v-table>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { getStudents, IStudent } from '../api/getStudents'

const baseUrl: string = 'http://localhost:3000'
const students = ref<IStudent[]>([])

const cpfMask = (value: string) => {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})/, '$1-$2')
    .replace(/(-\d{2})\d+?$/, '$1')
}

const deleteStudent = async (id: string) => {
  await fetch(`${baseUrl}/student/${id}`, {
    method: 'DELETE'
  })
}

students.value = await getStudents(baseUrl)

</script>
