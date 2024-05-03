<script setup lang="ts">
import { ref } from 'vue'
import Loader from '../components/Loader.vue'

const defaultStatus = 'STATUS READY';
const defaultText = "Salut, moi c'est François. ça getts mol ?";
const defaultVideo = 'https://storage.googleapis.com/dara-c1b52.appspot.com/daras_ai/media/20494fe6-095c-11ef-a763-02420a0001f0/gooey.ai%20lipsync.mp4'

const text = ref(defaultText);
const status = ref(defaultStatus)
const video = ref(defaultVideo)
const loading = ref(false)

function sendText() {
    loading.value = true;
    status.value = 'COMPUTING';
    if (text.value === defaultText) {
        video.value = defaultVideo;
        loading.value = false;
        status.value = defaultStatus;
        return
    }

    fetch('http://localhost:3111/speak', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({text: text.value})
    }).then(response => response.json()).then(data => {
        status.value = data.error || 'STATUS OK';
        video.value= data.video?.output?.output_video;
        loading.value = false
    }).catch(error => {
        status.value = "GLOBAL ERROR";
        console.error('Error:', error)
        loading.value = false
    })
}
</script>
<template>
  <div class="speak">
    <Loader class="loader" v-if="loading" />
    <video autoplay controls :src='video' type="video/mp4" :class="{ loading: loading }" />
    <textarea autofocus rows="10" v-model="text"></textarea>
    <h5>{{status}}</h5>
    <button @click="sendText" :disabled='loading'>Ask Francois to speak</button>
  </div>
</template>

<style>
@media (min-width: 1024px) {
    svg.loader {
        position: absolute;
        width: 30vw;
        
    }

    video.loading {
        opacity: 50%;
    }

  .speak {
    min-height: 100vh;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
  }

  .speak > h5 {
    font-weight: 500;
    font-size: 1.2rem;
    text-align: center;
  }

  .speak > * {
    width: 100%;
    margin-top: 1em;
    margin-bottom: 1em;
  }

  .speak > button {
    background-color: hsla(160, 100%, 37%, 1);
    color:rgb(16, 23, 21);
    height: 2rem;
    font-size: 1rem;
    padding: 0.5em 1em;
    border: none;
    border-radius: 0.5em;
    cursor: pointer;
    text-transform: uppercase;
    &:hover {
      background-color: hsla(160, 100%, 37%, 0.2);
    }
  }
}
</style>
