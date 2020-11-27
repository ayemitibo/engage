<template>
  <div>
    <nav
      class="navbar navbar-expand-lg navbar-dark bg-dark ftco-navbar-light"
      id="ftco-navbar"
    >
      <div class="container">
        <a class="navbar-brand" href="index.html">Stories<span>.</span></a>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#ftco-nav"
          aria-controls="ftco-nav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="oi oi-menu"></span> Menu
        </button>

        <div class="collapse navbar-collapse" id="ftco-nav">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item active">
              <router-link to="/" tag="a" class="nav-link">Posts</router-link>
            </li>
            <!-- <li class="nav-item">
            <a href="about.html" class="nav-link">Login</a>
          </li> -->
            <li
              class="nav-item"
              v-if="userDetail.role && userDetail.role.name == 'Authenticated'"
            >
              <a href="#" @click="signOut" class="nav-link">Sign Out</a>
            </li>
            <li
              class="nav-item"
              v-if="userDetail.role && userDetail.role.name == 'Authenticated'"
            >
              <router-link to="/create-blog" class="nav-link"
                >Create Blog</router-link
              >
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  computed: {
    userDetail() {
      return this.$store.state.userDetail;
    },
  },
  methods: {
    signOut() {
      localStorage.clear();
      location.reload();
    },
  },
  async beforeMount() {
    try {
      await this.$store.dispatch("userProfile");
    } catch (error) {}
  },
};
</script>
