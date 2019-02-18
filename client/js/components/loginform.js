Vue.component('loginform', {
  data(){
    return{
      email:"",
      password: "",
      errors: ""
    }
  },
  methods: {
    login(){
      axios
        .post(`${serverUrl}/users/login`, {
          email: this.email,
          password: this.password
        })
        .then(response => {
          console.log(response.data)
          localStorage.setItem('token', response.data.token)
          this.$emit('onsuccess')
        })
        .catch(err => {
          console.log(err.response)
          this.errors = err.response.data.msg ? err.response.data.msg : ""
        })
    }
  },
  template: `
  <div id="auth" class="container-fluid bg-light vh-100 ">
    <div class="d-flex justify-content-center">
      <div class="d-flex flex-column vh-100 justify-content-center">
        <form class="container-fluid" @submit.prevent="login">
          <h1 style="color:black;" class="d-flex align-self-center"><i class="fas fa-bookmark mr-3"></i>Journal</h1><br>
          <h6 class="text-danger">{{errors}}</h6>
          <div class="form-group">
            <label for="email2">Email address</label>
            <input v-model="email" type="email" class="form-control" id="email2" aria-describedby="emailHelp" placeholder="e.g. johndoe@mail.com">
          </div>
          <div class="form-group">
            <label for="password2">Password</label>
            <input v-model="password" type="password" class="form-control" id="password2" placeholder="Password">
          </div>
          <button type="submit" class="btn btn-dark">Sign In</button>
          <button class="btn btn-secondary" @click.prevent="$emit('change-display','loginpage')">cancel</button>
        </form>
      </div>
    </div>
  </div>
  `
})

