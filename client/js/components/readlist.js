Vue.component('readlist', {
  data() {
    return {
      byUser: []
    }
  },
  props: ['allarticles', 'query-result'],
  methods: {
    readArticle(article) {
      this.$emit('show-this-article', article)
      this.$emit('change-display', 'read')
    }
  },
  template: `
  <div>
    <h3 class="mb-3" v-if="queryResult">{{queryResult}}</h3>
    <div class="row vh-100 vw-100 bg-light overflow-auto">
      <div class="col-sm-3 h-75 d-flex justify-content-center bg-light px-auto main-content" v-for="article in allarticles">
        <div class="card mt-3 shadow h-75" style="width: 18rem;" @click.prevent="readArticle(article)">
          <img class="h-50 card-img-top img-fluid" :src="article.image" alt="Card image cap">
          <div class="card-body">
            <span class="badge badge-primary" v-for="tag in article.tags">{{tag}}</span>
            <h5 class="card-title">{{article.title}}</h5>
            <h6 class="card-subtitle mb-2 text-muted" v-if="article.author">By {{article.author.full_name}}</h6>
            <p class="card-text"> {{article.description}} </p>
            <a href="#" @click.prevent="readArticle(article)">Read More...</a>
          </div>
        </div>
      </div>

    </div>
  </div>
  `
})

