<template>
  <div id="header-entry" class="d-flex justify-content-between p-2">
    <div id="fecha">
      <span class="mx-2 text-success fw-bold fs-5">{{ day }}</span>
      <span class="fs-5">{{ month }}</span>
      <span class="mx-2 fs-5">{{ yearDay }}</span>
    </div>

    <div id="buttons">
      <input type="file"
              @change="onSelectedImage"
              v-show="false"
              ref="selectImage"
              accept="image/jpg, image/jpeg, image/png"
      >

      <button v-if="entrie.id" @click="deleteEntry" class="btn btn-danger mx-1">
        Delete
        <i class="fas fa-trash-alt"></i>
      </button>
      <button @click="onSelectImage" class="btn btn-primary mx-1">
        Subir Foto
        <i class="fas fa-upload"></i>
      </button>
    </div>
  </div>
  <hr />
  <div id="textarea" class="d-flex flex-column px-3 h-75">
    <textarea placeholder="¿Qué Sucedió Hoy?" v-model="entrie.text"></textarea>
    <img
      v-if="entrie.picture && !localImage"
      :src="entrie.picture"
      alt="entry-img"
      class="img-thumbnail"
    />
    <img
      v-if="localImage"
      :src="localImage"
      alt="entry-img"
      class="img-thumbnail"
    />
  </div>
  <Fab :icon="'fa-save'" @on:click="saveEntry" />
</template>

<script>
import "animate.css";
import Swal from "sweetalert2";
import Fab from "../components/Fab.vue";
import getDateMonthYear from "../../daybook/components/helpers/getDateMonthYear";
import uploadImage from '../components/helpers/uploadImage'
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      entrie: null,
      localImage: null,
      file: null

    };
  },
  components: {
    Fab,
  },
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  methods: {
    ...mapActions("journal", ["updateEntry", "createEntries", "deleteEntries"]),
    loadEntry() {
      let entry;
      if (this.id === "new") {
        entry = {
          text: "",
          date: new Date().getTime(),
        };
      } else {
        entry = this.getEntryById(this.id);
        if (!entry) return this.$router.push({ name: "no-entry" });
      }

      this.entrie = entry;
    },
    async saveEntry() {
      new Swal({
        title: "Espere por favor..",
        allowOutsideClick: false,
      });
      const picture = await uploadImage(this.file)
      Swal.showLoading();
      this.entrie.picture = picture
      this.localImage = null
      if (this.entrie.id) {
        await this.updateEntry(this.entrie);
      } else {
        console.log(this.entrie)
        const id = await this.createEntries(this.entrie);
        this.$router.push({ name: "entry", params: { id } });
      }
      Swal.fire({
        title: "Guardado",
        showClass: {
          popup: "animate__animated animate__fadeInDown",
        },
        hideClass: {
          popup: "animate__animated animate__fadeOutUp",
        },
        text: "La Entrada se registro con exito",
        icon: "success",
      });
    },
    async deleteEntry() {
      const { isConfirmed } = await new Swal({
        title: "¿Esta Seguro?",
        text: "Una vez borrado, no se puede recuperar.",
        showDenyButton: true,
        confirmButtonText: "Si, estoy seguro",
      });

      if (isConfirmed) {
        new Swal({
          title: "Espere por favor..",
          allowOutsideClick: false,
        });
        Swal.showLoading();
        this.deleteEntries(this.entrie.id);
        this.$router.push({ name: "no-entry" });
        Swal.fire("Entrada eliminada", "", "success");
      }
    },
    onSelectedImage(event) {
      const file = event.target.files[0]
      if(!file) {
        this.localImage = null
        this.file = null
        return
      }
    this.file = file
    const fr = new FileReader()
    fr.onload = () => this.localImage = fr.result
    fr.readAsDataURL(file)
    },
    onSelectImage(){
      this.$refs.selectImage.click()
    }
  },
  computed: {
    ...mapGetters("journal", ["getEntryById"]),
    day() {
      const { day } = getDateMonthYear(this.entrie.date);
      return day;
    },
    month() {
      const { month } = getDateMonthYear(this.entrie.date);
      return month;
    },
    yearDay() {
      const { year } = getDateMonthYear(this.entrie.date);
      return year;
    },
  },
  created() {
    this.loadEntry();
  },
  watch: {
    id() {
      this.loadEntry();
    },
  },
};
</script>

<style lang="scss" scoped>
textarea {
  border: none;
  height: calc(100vh - 465px);
  resize: none;
  width: 100%;
  &:focus {
    outline: none;
  }
  &::placeholder {
    font-size: 20px;
    font-weight: lighter;
  }
}
img {
  bottom: 120px;
  box-shadow: 0px 5px 10px rgba($color: #000000, $alpha: 0.2);
  height: 200px;
  position: fixed;
  right: 20px;
}

@media screen and (max-height: 520px) {
  #textarea {
    height: 90% !important;
  }
  textarea{
    height: 470px;
  }
}
@media screen and (max-width: 580px) {
  #header-entry{
    width: 100%;
    padding: 2px !important;
    flex-direction: column !important;
  }
  #header-entry>#fecha>span{
    font-size: 15px !important;
  }
  #header-entry>#buttons{
    padding: 2px;
    display: flex;
    height: 40px;
    margin-top: 5px;
  }
  #header-entry>#buttons>button{
    font-size: 10px;
  }
  img{
    height: 180px;
  }
}

@media screen and (min-width: 581px) and (max-width: 780px) {
  #header-entry{
    width: 100%;
    padding: 2px !important;
  }
  #header-entry>#fecha>span{
    font-size: 20px !important;
  }
  #header-entry>#buttons{
    padding: 2px;
    display: flex;
    height: 45px;
    margin-top: 5px;
  }
  #header-entry>#buttons>button{
    font-size: 15px;
  }
  img{
    height: 160px;
  }
}
</style>