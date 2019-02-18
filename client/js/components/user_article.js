
Vue.component('user-article', {
  props: ['userarticles'],
  created(){
    this.$emit('publish')
  },
  methods: {
    deleteArticle(articleId) {
      swal({
        title: "Are you sure you want to delete this article?",
        text: "Once deleted, you won't be able to recover it",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
          axios
          .delete(`${serverUrl}/articles/${articleId}`, {
            headers: {
              token: localStorage.getItem('token')
            }
          })
          .then(response => {
            console.log(response.data)
            this.$emit('publish')
          })
        .catch(err => {
            console.log(err.response)
          })
        }
      });
    },
    readArticle(article) {
      this.$emit('show-this-article', article)
      this.$emit('change-display', 'read')
    }
  },
  template: (` 
  <div>
    <h1 class="ml-3" v-if="userarticles.length">Your Stories</h1>
    <h3 class="ml-3 text-secondary" v-else>You don't have any stories</h3>
    <div class="row vh-100 vw-100 bg-light">
      <div class="col-sm-3 h-75 d-flex justify-content-center bg-light overflow-auto rounded px-auto main-content" v-for="article in userarticles">
          <div class="card mt-3 shadow h-75" style="width: 18rem;">
            <img class="h-50 card-img-top img-fluid"
              :src="article.image" alt="Card image cap">
            <div class="card-body">
              <h5 class="card-title">{{article.title}}</h5>
              <h6 class="card-subtitle mb-2 text-muted">By {{article.author.full_name}}</h6>
              <p class="card-text"> {{article.description}} </p>
              <button href="#" class="mb-2 btn btn-sm  btn-primary" @click.prevent="readArticle(article)">View as reader</button>
              <button href="#" class="mb-2 btn btn-sm  btn-secondary" @click.prevent="$emit('update-article', article)">Edit</button>
              <button href="#" class="mb-2 btn btn-sm  btn-dark" @click.prevent="deleteArticle(article._id)">Delete</button>
            </div>
          </div>
      </div>

    </div>
  </div>
  `)
})

