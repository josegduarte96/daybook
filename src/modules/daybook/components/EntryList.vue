<template>
  <div class="entry-list-container">
      <div class="mt-2 d-flex flex-column">
          <input class="mx-5" type="text" name="searchEntry" id="searchEntry" placeholder="Buscar Entrada" v-model="term">
      </div>
      <div class="mt-2 d-flex flex-column">
        <button @click="$router.push({name: 'entry', params: { id: 'new' }})" class="btn btn-primary mx-5">
            <i class="fa fa-plus-circle"></i>
            Nueva Entrada
            </button>
    </div>
      <div class="entry-scrollarea">
          <Entry v-for="entrie of entriesByTerm" :entrie="entrie" :key="entrie.id"></Entry>
      </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Entry from '../components/Entry.vue'
export default {
    components: {
        Entry
    },
    methods:{
        
    },
    computed: {
        ...mapGetters('journal', ['getEntriesByTerm', 'getEntryById']),
        entriesByTerm(){
            return this.getEntriesByTerm(this.term)
        }
    },
    data(){
        return{
            term: ''
        }
    }
}
</script>

<style lang="scss" scoped>
input{
    width: 80%;
    border-radius: 4px;
    border: 1px solid #2C3E50;    
    outline-color: transparent;
    padding: 2px;
    transition: .2s;
    margin: 0 30px;
    height: 40px;

    &:placeholder{
        padding: 5px;
    }
    &:focus{
      box-shadow: 0px 0px 6px rgb(0, 0, 0);
      transition: .2s;  
    }
}

@media screen and (max-width: 580px) {
    .entry-list-container{
        height: 100vh;
        width: 50vw;
    }
    input{
        width: 90%;
        margin: 0px 5px !important; 
    }
    input::placeholder{
        font-size: 13px;
        padding: 2px;
    }
    button{
        width: 90%;
        font-size: 12px;
        margin: 0px 5px !important;
    }
    .entry-scrollarea{
        height: 80vh !important;
    }
}

@media screen and (min-width: 581px) and (max-width: 780px) {
    .entry-list-container{
        height: 100vh;
        width: 40vw;
    }
    input{
        width: 90%;
        margin: 0px 5px !important; 
    }
    input::placeholder{
        font-size: 15px;
        padding: 2px;
    }
    button{
        width: 90%;
        font-size: 12px;
        margin: 0px 5px !important;
    }
    .entry-scrollarea{
        height: 80vh !important;
    }
}

.entry-list-container{
    border-right: 2px solid #2c3e50;
    height: calc(100vh - 56px);
}
.entry-scrollarea{
    height: calc(100vh - 145px);
    overflow-y: scroll;
}
</style>
