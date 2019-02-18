Vue.component('navbar', {
  data() {
    return {
      query: ''
    }
  },

  methods: {
    searchQuery(){
      this.$emit('search', this.query)
      this.query=""
    }
  },
  template: (`
  <nav class="navbar navbar-dark text-dark border-bottom shadow" id="navbar">

    <a href="#" class="navbar-brand ml-2 border-right pr-4" style="color: black">
      <h2 class="font-weight-bold"><i class="fas fa-bookmark"></i> Journal</h2>
    </a>

    <div class="nav-item">
      <button class="h5 btn btn-lg" @click.prevent="$emit('home')">Home</button>
    </div>

    <div class="btn-group ml-2">
      <button id="category-toggle" class="h5 btn btn-lg dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        Categories
      </button>
      <div class="dropdown-menu dropdown-menu-right" aria-labelledby="category-toggle">
        <button class="dropdown-item" type="button">category 1</button>
        <button class="dropdown-item" type="button">category 2</button>
      </div>
    </div>

    <form @submit.prevent="searchQuery" class="form-inline my-2 my-lg-0">
      <input v-model="query" class="form-control" type="search" placeholder="Search" aria-label="Search">
      <button class="btn my-2 my-sm-0" type="submit"><i class="fas fa-search"></i></button>
    </form>

    <div class="nav-item">
      <button class="h5 btn btn-dark mt-2" v-on:click.prevent="$emit('change-display','write')">+Write</button>
    </div>

    <div class="nav-item">
      <button class="h5 btn btn-secondary mt-2" v-on:click.prevent="$emit('change-display','yours')"><i class="fas fa-list-ul mr-2"></i> Your Stories</button>
    </div>

    <div class="btn-group">
      <button id="userToggle" type="button" class="btn btn-lg dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        <i class="fas fa-user"></i>
      </button>

      <div class="dropdown-menu dropdown-menu-right" aria-labelledby="userToggle">
        <button class="dropdown-item" type="button">Update profile</button>
        <button class="dropdown-item" type="button" @click.prevent="$emit('signout')">Log out</button>
      </div>
    </div>

  </nav>
  `)
})