<template>
<div class="d-flex justify-content-center">
  <h1 class="align-self-center">Selecciona una entrada...</h1>
</div>
<Fab @on:click="newEntry" />
</template>
<script>
  import Fab from '../components/Fab.vue'
export default {
  components: {
    Fab
  },
  methods: {
    newEntry() {
      this.$router.push({name: 'entry', params: {id: 'new'}})
    }
  }
}
</script>
<style lang="scss" scoped>
div{
    height: 100%;
}

@media screen and (max-width: 580px) {
    div{
      width: 50vw;
      margin: 0px !important;
    }
    div>h1{
      font-size: 15px;
    }
}
</style>