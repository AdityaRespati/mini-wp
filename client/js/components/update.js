Vue.component('update', {
  data() {
    return {
      title: "",
      content: "",
      description: "",
      tags: ""
    }
  },
  props: ['currentEdit'],
  created(){
    this.title = this.currentEdit.title,
    this.content = this.currentEdit.content
    this.description = this.currentEdit.description
    this.tags= this.currentEdit.tags
    console.log(this.tags)
  },
  components: {
    wysiwyg: vueWysiwyg.default.component,
  },
  methods: {
    updateArticle() {
      var body = {
        title: this.title,
        content: this.content,
        description: this.description,
        tags: this.tags
      }

      axios
        .put(`${serverUrl}/articles/${this.currentEdit._id}`, body, {
          headers: {
            token: localStorage.getItem('token')
          }
        })
        .then(response => {
          console.log(response.data)
          swal("Your article has been updated")
          .then(() => {
            this.$emit('update-success')
          })
        })
        .catch(err => {
          console.log(err.response)
        })


    }
  },
  template: `
  <div>
    <div class="row vh-100 vw-100">

      <div class="col-sm d-flex justify-content-center overflow-auto rounded px-auto main-content">
        <form class="container mt-3" @submit.prevent="updateArticle">
          <div class="form-group">
            <label for="title">
              <h3>Title</h3>
            </label>
            <input v-model="title" type="text" class="form-control" id="title">
          </div>
          <br>
          <div class="form-group">
          <label for="title">
            <h3>Description</h3>
          </label>
          <input v-model="description" type="text" class="form-control" id="description" placeholder="this will appear in article's thumbnail (max. 20 characters)">
        </div>
        <br>
        <div class="form-group">
          <label for="tags">
            <h3>Tags</h3>
          </label>
          <input v-model="tags" type="text" class="form-control" id="tags" placeholder="e.g. programming javascript vue">
        </div>
        <br>
          <div class="form-group">
            <label for="content">
              <h3>Your Story</h3>
            </label>
            <wysiwyg v-model="content" />
          </div>
          <button class="h5 btn btn-dark mt-2" type="submit" >Save Changes</button>
        </form>
      </div>

    </div>

  </div>
  `
})