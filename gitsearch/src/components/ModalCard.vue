<template>
  <div v-if="status" class="container" @click="close">
    <div class="modal">
      <img class="avatar" :src="avatar" :alt="name" />
      <div class="text">{{ name }}</div>
      <div class="text">(@{{ username }})</div>
      <div class="text">{{ bio }}</div>
      <div class="text">{{ company }}</div>
      <div class="button" @click="openURL">Open profile</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import bus from '@/hooks/bus';
import { User } from '@/hooks/store';
import api from '@/services/api';
import useModal from '@/hooks/modal';

export default defineComponent({
  name: 'ModalCard',
  props: {
    open: { type: Boolean, required: true },
    user: { type: Object as () => User, required: true },
  },
  data() {
    return {
      status: false,
      avatar: '',
      name: '',
      username: '',
      bio: '',
      company: '',
    };
  },
  methods: {
    async handleModalToggle(data: { status: boolean; user: User }) {
      this.status = data.status;
      const response = await api.getUserByUsername(data.user.login);
      this.avatar = response.avatar_url;
      this.name = response.name;
      this.username = data.user.login;
      this.bio = response.bio;
      this.company = response.company;
    },

    close() {
      useModal().close();
    },

    openURL() {
      window.open(`https://github.com/${this.username}`, '_blank');
    },
  },
  mounted() {
    bus.on('modal:toggle', this.handleModalToggle);
  },
  beforeMount() {
    bus.off('modal:toggle', this.handleModalToggle);
  },
});
</script>

<style scoped>
.container {
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.2);

  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 0;
}

.modal {
  overflow: hidden;
  border-radius: 10px;
  background: #fff;
  color: #000;
  box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.6);

  max-width: 300px;
  min-width: 300px;
  z-index: 1;
}

.avatar {
  width: 100%;
  height: 250px;
  background: #ccc;
}

.text {
  padding: 5px 15px;
  font-size: 18px;
  font-weight: bold;
}

.button {
  cursor: pointer;
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  margin: 10px auto;
}
</style>
