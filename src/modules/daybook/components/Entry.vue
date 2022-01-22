<template>
  <div class="entry-container mb-2 pointer p-2" @click="$router.push({name: 'entry', params: {id: entrie.id}})">
      <div class="entry-title d-flex">
          <span class="text-success fs-5 fw-bold">{{day}}</span>
          <span class="mx-1 fs-5">{{month}}</span>
          <span id="yearday" class="mx-2 fw-light">{{yearDay}}</span>
      </div>
      <div class="entry-description">
          <h3>{{shortText()}}</h3>
      </div>
  </div>
</template>

<script>
import getDateMonthYear from '../../daybook/components/helpers/getDateMonthYear'

export default {
    props:{
        entrie:{
            type: Object,
            required: true
        }
    },
    methods: {
        shortText(){
            return (this.entrie.text.length > 25) ? this.entrie.text.substr(0, 30) + '...' : this.entrie.text
        }
    },
    computed:{
        day(){
            const {day} = getDateMonthYear(this.entrie.date)
            return day
        },
        month(){
            const {month} = getDateMonthYear(this.entrie.date)
            return month
        },
        yearDay(){
            const {year} = getDateMonthYear(this.entrie.date)
            return year
        }       
    }
}
</script>

<style lang="scss" scoped>
.entry-container{
    border-bottom: 1px solid #2c3e50;
    transition: .2s all ease-in;
    &:hover{
        background-color: lighten($color: gray, $amount: 45);
        transition: .2s all ease-in;
    }
    .entry-description>h3{
        font-size: 22px;
        width: 90%;
        margin: 0px auto;
        overflow: hidden;
    }
}

@media screen and (min-width: 360px) and (max-width: 580px) {
    .entry-title>#yearday{
        font-size: 11px !important;
        margin: 1px !important;
    }
    .entry-title>span{
        font-size: 15px !important;
    }
    .entry-title{
        align-items: center !important;
    }
    .entry-description>h3{
        font-size: 15px !important;
        padding: 4px;
        width: 80%;
        overflow: hidden;
    }
}

@media screen and (min-width: 581px) and (max-width: 780px) {
    .entry-title>#yearday{
        font-size: 15px !important;
        margin: 1px !important;
    }
    .entry-title>span{
        font-size: 20px !important;
    }
    .entry-title{
        align-items: center !important;
    }
    .entry-description>h3{
        font-size: 19px !important;
        padding: 4px;
    }
}
</style>