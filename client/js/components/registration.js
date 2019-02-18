Vue.component('registration', {
  data(){
    return{
      full_name: "",
      email: "",
      password: "",
      errors: {}
    }
  },
  methods: {
    register(){
      console.log(this.full_name)
      axios
        .post(`${serverUrl}/users/register`, {
          full_name: this.full_name,
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
          this.errors = {}

          if(err.response.data.error.errors){
            for (let props in err.response.data.error.errors){
              this.errors[props] = err.response.data.error.errors[props].message
            }
          }
          
          console.log(this.errors)

        })
    }
  },
  template: `
  <div id="auth" class="container-fluid bg-light vh-100 ">
    <div class="d-flex justify-content-center">
      <div class="d-flex flex-column vh-100 justify-content-center">
        <form class="container-fluid" @submit.prevent="register">
          <h1 style="color:black;" class="d-flex align-self-center"><i class="fas fa-bookmark mr-3"></i>Journal</h1><br>
          <div class="form-group">
            <label for="fullname">Full Name</label>
            <h6 class="text-danger">{{errors.full_name}}</h6>
            <input v-model="full_name" type="text" class="form-control" id="fullname" placeholder="e.g. John Doe">
          </div>
          <div class="form-group">
            <label for="email">Email address</label>
            <h6 class="text-danger">{{errors.email}}</h6>
            <input v-model="email" type="email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="e.g. johndoe@mail.com">
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <h6 class="text-danger">{{errors.password}}</h6>
            <input v-model="password" type="password" class="form-control" id="password" placeholder="Password">
          </div>
          <button type="submit" class="btn btn-dark">Sign Up</button>
          <button class="btn btn-secondary" @click.prevent="$emit('change-display','loginpage')">cancel</button>
        </form>
      </div>
    </div>
  </div>
  `
})
