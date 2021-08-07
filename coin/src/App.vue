<template>
  <div id="app">
    <router-view v-if="isRouterAlive"></router-view>
  </div>
</template>

<script>


export default {
  name: 'App',
  components: {
  },
  provide () {                                    
    return {
      reload: this.reload                                              
    }
  },
  data() {
    return {
      type: 1,
      isRouterAlive: true
    };
  },
  created(){
    console.log(window.location.href)
    if(window.location.href.indexOf('list') > 0){
      this.type = 2
    } else{
      this.type = 1
    }
  },
  methods: {
     reload () {
        this.isRouterAlive = false;            //先关闭，
        this.$nextTick(function () {
          this.isRouterAlive = true;         //再打开
        }) 
      }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
body{
  font-size: 12px;
  font-family: Chivo, sans-serif;
  /* background-color: rgb(47, 8, 187); */
  min-height: 100vh;
    background-image: radial-gradient(50% 50% at 50% 50%, rgba(255, 0, 0, 0.1) 10%, rgba(255, 255, 255, 0) 100%);
  background-color: rgb(44, 49, 59) !important;
  
}
</style>
