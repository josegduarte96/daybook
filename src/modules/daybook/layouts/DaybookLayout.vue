<template>
    <NavBar/>

    <div id="loading" v-if="isLoading" class="row justify-content-md-center">
        <div class="col-3 alert-info text-center mt-5">
            Espere por favor...
            <h3 class="mt-2">
                <i class="fa fa-spin fa-sync"></i>
            </h3>
        </div>
    </div>

    <div id="layout" v-else class="d-flex">
        <div id="entrycol4" class="col-4">
            <EntryList />
        </div>
        <div id="entrycol" class="col">
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
import NavBar from '../components/NavBar.vue'
import EntryList from '../components/EntryList.vue'
import {mapActions, mapGetters, mapState} from 'vuex'
import useAuth from '../../auth/composables/useAuth'

export default {
    components:{
        NavBar,
        EntryList
    },
    methods:{
       ...mapActions('journal', ['loadEntries']),
    },
    created(){
        this.loadEntries(this.username)
    },
    computed:{
        ...mapState('journal', ['isLoading']),
        ...mapGetters('auth', ['username'])
    },
    beforeUnmount(){
        const { logout } = useAuth()
        logout()
    }
}
</script>

<style scoped>
@media screen and (max-width: 580px) {
    #entrycol{
        width: 50vw;
    }
    #entrycol4{
        width: 50vw;
    }
    #layout{
        display: flex;
    }
    #loading{
        justify-content: space-around;
    }
}

@media screen and (min-width: 581px) and (max-width: 780px) {
    #entrycol{
        width: 60vw;
    }
    #entrycol4{
        width: 40vw;
    }
}
</style>
