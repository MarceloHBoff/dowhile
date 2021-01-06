<template>
  <div class="container">
    <img class="avatar" :src="avatar" :alt="username" />
    <div class="username">@{{ username }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Card',
  props: {
    avatar: { type: String, required: true },
    username: { type: String, required: true },
  },
});
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
}

.container:hover {
  cursor: pointer;
  border-radius: 10px;
  background: rgba(204, 204, 204, 0.1);
}

.avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: #ccc;
}

.username {
  margin-top: 10px;
  color: #fff;
  font-size: 18px;
  font-weight: bold;
}
</style>
