<template>
  <div class="container">
    <h1>Git Search</h1>
    <input
      v-model="search"
      @keyup.enter="handleInputChange"
      class="search"
      type="text"
      placeholder="Type a GitHub username"
    />
    <div class="countLabel">{{ countLabel }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Header',
  props: {
    count: { type: Number, required: true },
  },
  computed: {
    countLabel(): string {
      if (this.count === 0) return 'No user found';
      if (this.count === 1) return 'A user found';
      return `${this.count} users found`;
    },
  },
  data() {
    return {
      search: '',
    };
  },
  methods: {
    handleInputChange() {
      this.$emit('change', this.search);
    },
  },
});
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #fff;
}

.search {
  outline: 0;

  width: 40%;
  margin-top: 60px;
  padding: 15px;
  background: #555;
  border: 3px solid #888;
  border-radius: 12px;

  color: #fff;
  font-size: 16px;
}

.search::placeholder {
  color: #aaa;
}

.countLabel {
  margin-top: 20px;
  font-size: 18px;
  color: #aaa;
  font-weight: bold;
}
</style>
