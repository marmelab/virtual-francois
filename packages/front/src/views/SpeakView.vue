<script setup lang="ts">
import { ref } from 'vue'

const text = ref('Edit me')
const result = ref('Result')
const disabledSend = ref(false)

function sendText() {
    disabledSend.value = true
    fetch('http://localhost:3111/speak', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({text: text.value})
    }).then(response => response.json()).then(data => {
        result.value = data.error || data.video;
        disabledSend.value = false
    }).catch(error => {
        result.value = "GLOBAL ERROR";
        console.error('Error:', error)
        disabledSend.value = false
    })
}
</script>
<template>
  <div class="speak">
    <textarea v-model="text"></textarea>
    <p>{{result}}</p>
    <button @click="sendText" :disabled='disabledSend'>Send</button>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
