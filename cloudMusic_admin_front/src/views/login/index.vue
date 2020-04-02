<template>
  <div class="wrapper">
    <div class="login-container">
      <div class="agileits-top">
        <form>
          <input v-model="loginForm.username" class="text" type="text" placeholder="用户名" required>
          <input
            v-model="loginForm.password"
            class="text"
            type="password"
            placeholder="密码"
            required
          >
          <input type="button" value="登录" @click="handleLogin">
        </form>
      </div>
    </div>
    <div class="w3copyright-agile">
      <p>
        © 2020 Magical Login Form . All rights
        <a href="blog.bestzhangjun.com" title="张军的博客">Reserved</a>
      </p>
    </div>
    <ul class="w3lsg-bubbles">
      <li />
      <li />
      <li />
      <li />
      <li />
      <li />
      <li />
      <li />
      <li />
      <li />
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      loginForm: {
        username: '',
        password: ''
      }
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    handleLogin() {
      this.$store
        .dispatch('user/login', this.loginForm)
        .then(res => {
          this.$router.push({ path: this.redirect || '/' })
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>
<style scoped>
input[type="text"],
input[type="password"] {
  font-size: 1em;
  color: #fff;
  font-weight: 100;
  margin: 3em 0 0;
  width: 93%;
  display: block;
  border: none;
  padding: 1em;
  border-bottom: solid 1px #fff;
  -webkit-transition: all 0.3s cubic-bezier(0.64, 0.09, 0.08, 1);
  transition: all 0.3s cubic-bezier(0.64, 0.09, 0.08, 1);
  background: -webkit-linear-gradient(top, rgba(255, 255, 255, 0) 96%, #fff 4%);
  background: linear-gradient(to bottom, rgba(255, 255, 255, 0) 96%, #fff 4%);
  background-position: -800px 0;
  background-size: 100%;
  background-repeat: no-repeat;
  color: #fff;
}
.text:focus,
.text:valid {
  box-shadow: none;
  outline: none;
  background-position: 0 0;
}
.text:focus::-webkit-input-placeholder,
.text:valid::-webkit-input-placeholder {
  color: #cccccc;
  font-size: 0.9em;
  -webkit-transform: translateY(-20px);
  -moz-transform: translateY(-20px);
  -o-transform: translateY(-20px);
  -ms-transform: translateY(-20px);
  transform: translateY(-20px);
  visibility: visible !important;
}
::-webkit-input-placeholder {
  color: #fff;
  font-weight: 100;
}
:-moz-placeholder {
  /* Firefox 18- */
  color: #fff;
}
::-moz-placeholder {
  /* Firefox 19+ */
  color: #fff;
}
:-ms-input-placeholder {
  color: #fff;
}
input[type="button"] {
  font-size: 1em;
  color: #fff;
  background: rgba(255, 255, 255, 0.15);
  outline: none;
  border: none;
  cursor: pointer;
  padding: 1em;
  -webkit-appearance: none;
  width: 100%;
  margin: 3em 0;
}
input[type="button"]:hover {
  -webkit-transform: translateY(8px);
  -ms-transform: translateY(8px);
  -o-transform: translateY(8px);
  -ms-transform: translateY(8px);
  transform: translateY(8px);
  -webkit-box-shadow: 0 3px 3px 0 rgba(0, 0, 0, 0.58);
  -moz-box-shadow: 0 3px 3px 0 rgba(0, 0, 0, 0.58);
  box-shadow: 0 3px 3px 0 rgba(0, 0, 0, 0.58);
  -webkit-transition: 0.5s all;
  -moz-transition: 0.5s all;
  -o-transition: 0.5s all;
  -ms-transition: 0.5s all;
  transition: 0.5s all;
}
</style>
<style lang="scss">
body {
  background: #2d3a4b;
  background-size: cover;
  background-attachment: fixed;
}
body,
html,
.wrapper {
  height: 100%;
}
.login-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 40%;
  box-shadow: 4px 6px 12px rgba(0, 0, 0, 0.2);
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
}
.wrapper {
  position: relative;
  overflow: hidden;
}
.agileits-top {
  padding: 0.5em 3em 3em;
}
.agileits-top p {
  font-size: 1em;
  color: #fff;
  text-align: center;
  letter-spacing: 1px;
}
.agileits-top p a {
  color: #fff;
  -webkit-transition: 0.5s all;
  -moz-transition: 0.5s all;
  transition: 0.5s all;
}
.agileits-top p a:hover {
  color: #ffc107;
}
.w3copyright-agile {
  position: absolute;
  left: 50%;
  bottom: 5%;
  transform: translateX(-50%);
  text-align: center;
}
.w3copyright-agile p {
  font-size: 1em;
  color: #fff;
  line-height: 1.8em;
}
.w3copyright-agile p a {
  color: #fff;
}
.w3copyright-agile p a:hover {
  color: #ffc107;
  transition: 0.5s all;
  -webkit-transition: 0.5s all;
  -moz-transition: 0.5s all;
  -o-transition: 0.5s all;
  -ms-transition: 0.5s all;
}
.w3lsg-bubbles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
}
.w3lsg-bubbles li {
  position: absolute;
  list-style: none;
  display: block;
  width: 40px;
  height: 40px;
  background-color: rgba(255, 255, 255, 0.15);
  bottom: -160px;
  -webkit-animation: square 20s infinite;
  -moz-animation: square 20s infinite;
  -o-animation: square 20s infinite;
  -ms-animation: square 20s infinite;
  animation: square 20s infinite;
  -webkit-transition-timing-function: linear;
  -moz-transition-timing-function: linear;
  -o-transition-timing-function: linear;
  -ms-transition-timing-function: linear;
  transition-timing-function: linear;
}
.w3lsg-bubbles li:nth-child(1) {
  left: 10%;
}
.w3lsg-bubbles li:nth-child(2) {
  left: 20%;
  width: 80px;
  height: 80px;
  -webkit-animation-delay: 2s;
  -moz-animation-delay: 2s;
  -o-animation-delay: 2s;
  -ms-animation-delay: 2s;
  animation-delay: 2s;
  -webkit-animation-duration: 17s;
  -moz-animation-duration: 17s;
  -o-animation-duration: 17s;
  animation-duration: 17s;
}
.w3lsg-bubbles li:nth-child(3) {
  left: 25%;
  -webkit-animation-delay: 4s;
  -moz-animation-delay: 4s;
  -o-animation-delay: 4s;
  -ms-animation-delay: 4s;
  animation-delay: 4s;
}
.w3lsg-bubbles li:nth-child(4) {
  left: 35%;
  width: 60px;
  height: 60px;
  -webkit-animation-duration: 22s;
  -moz-animation-duration: 22s;
  -o-animation-duration: 22s;
  -ms-animation-duration: 22s;
  animation-duration: 22s;
  background-color: rgba(255, 255, 255, 0.25);
}
.w3lsg-bubbles li:nth-child(5) {
  left: 70%;
}
.w3lsg-bubbles li:nth-child(6) {
  left: 80%;
  width: 120px;
  height: 120px;
  -webkit-animation-delay: 3s;
  -moz-animation-delay: 3s;
  -o-animation-delay: 3s;
  -ms-animation-delay: 3s;
  animation-delay: 3s;
  background-color: rgba(255, 255, 255, 0.2);
}
.w3lsg-bubbles li:nth-child(7) {
  left: 45%;
  width: 160px;
  height: 160px;
  -webkit-animation-delay: 7s;
  -moz-animation-delay: 7s;
  -o-animation-delay: 7s;
  -ms-animation-delay: 7s;
  animation-delay: 7s;
}
.w3lsg-bubbles li:nth-child(8) {
  left: 55%;
  width: 20px;
  height: 20px;
  -webkit-animation-delay: 15s;
  -moz-animation-delay: 15s;
  animation-delay: 15s;
  -webkit-animation-duration: 40s;
  -moz-animation-duration: 40s;
  animation-duration: 40s;
}
.w3lsg-bubbles li:nth-child(9) {
  left: 25%;
  width: 10px;
  height: 10px;
  -webkit-animation-delay: 2s;
  animation-delay: 2s;
  -webkit-animation-duration: 40s;
  animation-duration: 40s;
  background-color: rgba(255, 255, 255, 0.3);
}
.w3lsg-bubbles li:nth-child(10) {
  left: 85%;
  width: 160px;
  height: 160px;
  -webkit-animation-delay: 11s;
  animation-delay: 11s;
}
@-webkit-keyframes square {
  0% {
    -webkit-transform: translateY(0);
    -moz-transform: translateY(0);
    -o-transform: translateY(0);
    -ms-transform: translateY(0);
    transform: translateY(0);
  }
  100% {
    -webkit-transform: translateY(-700px) rotate(600deg);
    -moz-transform: translateY(-700px) rotate(600deg);
    -o-transform: translateY(-700px) rotate(600deg);
    -ms-transform: translateY(-700px) rotate(600deg);
    transform: translateY(-700px) rotate(600deg);
  }
}
</style>
