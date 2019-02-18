const serverUrl = 'http://localhost:3000'

var app = new Vue({
  el: '#app',
  data: {
    show: "loginpage",
    currentArticle: {},
    allarticles: [],
    userarticles: [],
    currentEdit: "",
    queryResult: ""
  },
  created() {
    if (localStorage.getItem('token')) {
      this.show = "readlist"
      this.getAllArticle()
      this.getUserArticle()
    }
  },
  methods: {
    signInSuccess() {
      this.show = "readlist"
      this.getAllArticle()
    },
    signOut() {
      var auth2 = gapi.auth2.getAuthInstance();
      auth2.signOut().then(function () {
        console.log('User signed out.');
      });
      this.show = "loginpage"
      localStorage.removeItem('token')
    },
    getAllArticle() {
      this.queryResult=""
      axios
        .get(`${serverUrl}/articles`, {
          headers: {
            token: localStorage.getItem('token')
          }
        })
        .then(response => {
          this.allarticles = response.data.data
        })
        .catch(err => {
          console.log(err.response)
        })
    },
    changeShow(showthis) {
      this.show = showthis
    },
    getHomePage(){
      this.getAllArticle()
      this.show="readlist"
    },
    showThisArticle(article) {
      this.currentArticle = article
    },
    publish() {
      this.getAllArticle()
      this.getUserArticle()
      this.show = "yours"
    },
    getUserArticle() {
      this.queryResult=""
      axios
        .get(`${serverUrl}/user/articles`, {
          headers: {
            token: localStorage.getItem('token')
          }
        })
        .then(response => {
          this.userarticles = response.data.data
        })
        .catch(err => {
          console.log(err.response)
        })
    },
    updateArticle(article){
      this.currentEdit = article
      this.show = 'update'
    },
    searchArticle(query){
      axios
        .get(`${serverUrl}/articles/?q=${query}`, {
          headers: {
            token: localStorage.getItem('token')
          }
        })
        .then(response => {
          this.allarticles = response.data.data
          this.queryResult= query? `results found for "${query}"` : ''  
          this.show="readlist"
        })
        .catch(err => {
          this.allarticles = []
          this.queryResult=`no results found for "${query}"` 
          this.show="readlist"
        })
    }
  }
})

function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  var id_token = googleUser.getAuthResponse().id_token
  axios
    .post(`${serverUrl}/users/googleauth`, { idToken: id_token })
    .then(response => {
      console.log("SIGN IN SUCCESS", response.data)
      localStorage.setItem('token', response.data.token)
      app.signInSuccess()
    })
    .catch(err => {
      console.log(err.response)
    })
}

function onLoad() {
  gapi.load('auth2', function () {
    gapi.auth2.init().then(() => {
    });
  });
}

