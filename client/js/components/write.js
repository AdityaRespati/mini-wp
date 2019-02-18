Vue.component('write', {
  data() {
    return {
      content: '',
      title: '',
      description: '',
      image: "",
      tags: "",
      errors: {},
    }
  },
  methods: {
    fileUpload(e) {
      this.image = e.target.files[0];
    },
    createArticle() {
      var body = {
        title: this.title,
        content: this.content,
        description: this.description,
        tags: this.tags.split(' ')
      }

      let data = new FormData()
      data.append('image', this.image)
      data.append('data', JSON.stringify(body))

      axios
        .post(`${serverUrl}/articles`, data, {
          headers: {
            token: localStorage.getItem('token'),
            'Content-Type': 'multipart/form-data'
          }
        })
        .then(() => {
          swal("Your article has been succesfully published")
            .then(() => {
              this.$emit('publish')
            })
        })
        .catch(err => {
          console.log(err.response)
          this.errors = {}
          if (!this.image) {
            this.errors.image = "please upload an image"
          }
          if (err.response.data.error) {
            for (let props in err.response.data.error.errors) {
              this.errors[props] = err.response.data.error.errors[props].message
            }
          }
          console.log(this.errors)

        })
    }
  },
  components: {
    wysiwyg: vueWysiwyg.default.component,
  },
  template: `
  <div>
    <div class="row vh-100 vw-100">

      <div class="col-sm d-flex justify-content-center overflow-auto rounded px-auto main-content">
        <form class="container mt-3">
          <div class="form-group">
            <label for="title">
              <h3>Title</h3>
            </label>
            <h6 class="text-danger">{{errors.title}}</h6>
            <input v-model="title" type="text" class="form-control" id="title" placeholder="Enter a descriptive and unique title (max. 20 characters)">
          </div>
          <br>
          <div class="form-group">
            <label for="title">
              <h3>Description</h3>
            </label>
            <h6 class="text-danger">{{errors.description}}</h6>
            <input v-model="description" type="text" class="form-control" id="description" placeholder="this will appear in article's thumbnail (max. 20 characters)">
          </div>
          <br>
          <div class="form-group">
            <label for="file">
              <h3>Thumbnail Image</h3>
            </label>
            <h6 class="text-danger">{{errors.image}}</h6>
            <input @change="fileUpload" type="file" class="form-control" id="file">
          </div>
          <br>
          <div class="form-group">
            <label for="tags">
              <h3>Tags</h3>
            </label>
            <input v-model="tags" type="text" class="form-control" id="tags" placeholder="e.g. programming javascript vue">
          </div>
          <div class="form-group">
            <label for="content">
              <h3>Your Story</h3>
            </label>
            <h6 class="text-danger">{{errors.content}}</h6>
            <wysiwyg v-model="content" />
          </div>
          <button class="h5 btn btn-dark mt-2" type="submit" @click.prevent="createArticle">Post</button>
        </form>
      </div>

    </div>

  </div>
  `
})

