<template>
    <div class="home">
        <h1>Welcome to</h1>
        <h1>Virtual François 1.0</h1>
        <h3>We provide an almost real François to talk to you in near real time</h3>
        <h3>There are only benefits:</h3>
        <ul>
            <li>He will never be tired</li>
            <li>He will say exactly whant you want (but no NSFW things sorry for you fantasms)</li>
            <li>He will never be busy</li>
            <li>He is quit younger than the original (a few months)</li>
            <li>He will working 24h/24 - 7j/j (ok, maybe the real one too)</li>
        </ul>
        <button @click="$router.push('speak')">Try it now</button>
    </div>
</template>


<style scoped>
@media (min-width: 1024px) {
h1 {
  font-weight: 800;
  font-size: 4rem;
  position: relative;
  margin-bottom: 2rem;
  background-color: hsla(160, 100%, 37%, 1);
}

h3, li {
  font-size: 1.2rem;
}
  .home {
    min-height: 100vh;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
  }

  .home > ul {
    display: list-item;
    list-style-image: url("../assets/fusee-32.png");
    padding: 0;
    margin-top: 1rem;
    margin-bottom:1rem;
    text-align: left;
  }

  .home > ul > li {
    padding-left: 1rem;
  }

  .home > button {
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
