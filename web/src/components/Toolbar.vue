<template>
  <v-row justify="center" class="mt-5">
    <v-col cols="6">
      <v-toolbar dense floating>
        <v-text-field hide-details single-line>
          <v-icon start icon="mdi-magnify"></v-icon>
        </v-text-field>
        <v-btn class="bg-grey-darken-4" size="x-large">
          Pesquisar
        </v-btn>

      </v-toolbar>
    </v-col>
    <v-col cols="2">
      <v-toolbar dense floating>
        <v-btn @click="isDialogOpen = true" class="bg-blue-grey-darken-1" size="x-large">
          Cadastrar Aluno
        </v-btn>

        <v-dialog v-model="isDialogOpen" width="600px" height="800px">
          <v-form @submit.prevent="submit">
            <v-card>
              <v-card-title primary-title>
                Adicionar Aluno
              </v-card-title>

              <v-card-text>
                <v-row>
                  <v-col>
                    <v-text-field v-model="name.value.value" name="Nome" label="Nome" id="nome" variant="outlined"
                      :rulse="nameRules"></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12">
                    <v-text-field v-model="email.value.value" name="Email" label="Email" id="email" variant="outlined"
                      :rules="emailRules"></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12">
                    <v-text-field v-model="documentNumber.value.value" name="CPF" label="CPF" id="documentNumber"
                      variant="outlined" :rules="documentNumberRules"></v-text-field>
                  </v-col>
                </v-row>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn @click="handleCancel" variant="text">Cancelar</v-btn>
                <v-btn color="success" type="submit">Salvar</v-btn>
              </v-card-actions>
            </v-card>
          </v-form>
        </v-dialog>
      </v-toolbar>
    </v-col>
  </v-row>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useField, useForm } from 'vee-validate'
import { postStudent } from '../api/postStudent'

const isDialogOpen = ref(false)

const validateEmtpyField = (value: string): boolean | string => {
  if (value) return true
  return 'O campo é obrigatório.'
}

const validateInvalidEmail = (value: string): boolean | string => {
  if (value.includes('@')) return true
  return 'E-mail inválido.'
}

const validateInvalidDocumentNumber = (value: string): boolean | string => {
  const pattern = /^[0-9]{11}$/

  if (pattern.test(value)) return true
  return 'CPF inválido, apenas números.'
}

const nameRules = [
  validateEmtpyField
]

const emailRules = [
  validateEmtpyField,
  validateInvalidEmail
]

const documentNumberRules = [
  validateEmtpyField,
  validateInvalidDocumentNumber
]

const { handleSubmit, handleReset } = useForm()

const name = useField<string>('name')
const email = useField<string>('email')
const documentNumber = useField<string>('documentNumber')

const submit = handleSubmit(async values => {
  await postStudent('http://localhost:3000', {
    name: name.value.value, email: email.value.value, documentNumber: documentNumber.value.value
  })

  alert("Dados salvos com sucesso!")
  handleReset()
})

const handleCancel = (() => {
  handleReset()
  isDialogOpen.value = false
})

</script>