<template>
  <Header @change="handleSearch" :count="count" />

  <div class="cardList">
    <Card
      v-for="user in users"
      :key="user.login"
      :avatar="user.avatar_url"
      :username="user.login"
      @click="() => handleClick(user)"
    />
  </div>

  <ModalCard />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Header from './components/Header.vue';
import Card from './components/Card.vue';
import ModalCard from './components/ModalCard.vue';

import api from './services/api';
import useStore, { setUsers, User } from './hooks/store';
import useModal from './hooks/modal';

export default defineComponent({
  name: 'App',
  components: {
    Header,
    Card,
    ModalCard,
  },
  data() {
    return {
      count: 0,
      userSelected: {} as User,
    };
  },
  computed: {
    users: () => useStore().users,
  },
  methods: {
    handleClick(user: User) {
      useModal().open(user);
    },

    async handleSearch(q: string) {
      const response = await api.searchUsers(q);
      this.count = response.total_count;
      setUsers(
        response.items.map((item: User) => ({
          avatar_url: item.avatar_url,
          login: item.login,
        })),
      );
    },
  },
});
</script>

<style>
#app,
body {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 0px;
  background-color: #333;
  width: 100vw;
  height: 100vh;
}

.cardList {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  width: 60%;
  margin: 30px auto;
}
</style>
