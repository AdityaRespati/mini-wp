Vue.component('read', {
  data(){
    return{

    }
  },
  props: ['article'],
  methods: {
    
  },
  template: `
  <div id="auth" class="container bg-light vh-100">
    <div class="d-flex justify-content-center">
      <div class="d-flex flex-column justify-content-center">
        <div class="card ">
          <img class="card-img-top" :src="article.image" alt="Card image cap">
          <div class="card-body">
            <h3 class="card-title"><strong>{{article.title}}</strong></h3>
            <h6 class="card-subtitle text-muted" v-if="article.author">By {{article.author.full_name}}</h6><br>
            <p class="card-text text-dark">{{article.content}}</p>
            <a href="#" class="btn btn-primary">Go somewhere</a>
          </div>
        </div>
      </div>
    </div>
  </div>
  `
})