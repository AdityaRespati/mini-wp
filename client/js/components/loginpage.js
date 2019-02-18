Vue.component('loginpage', {
  template: `
  <div id="auth" class="container-fluid bg-light vh-100 ">
    <div class="d-flex justify-content-center">
      <div class="d-flex flex-column vh-100 justify-content-center">
        <h1 style="color:black;" class="d-flex align-self-center"><i class="fas fa-bookmark mr-3"></i>Journal</h1>
        <h6 style="color:black;" class="d-flex align-self-center">Simple blogging web-app made with vue, mongoose & express </h6>
        <br>
        <button @click.prevent="$emit('change-display','registration')" type="button" class="btn" style="background-color: black; color:white;" data-toggle="modal"
          data-target="#exampleModal">Create an
          account</button>
        <button @click.prevent="$emit('change-display','loginform')" type="button" class="btn mt-2" style="background-color: grey; color:white;" data-toggle="modal" data-target="#exampleModal2">Sign
          In</button>
        <h6 class="d-flex align-self-center mt-3 mb-3">or</h6>
        <div class="g-signin2" data-onsuccess="onSignIn" data-width="450" data-longtitle="true"></div>
      </div>
    </div>
  </div>
  `
})

