import { reactive, readonly } from 'vue';

export interface User {
  name: string;
  bio: string;
  company: string;
  avatar_url: string;
  login: string;
}

const state = reactive({
  users: [] as User[],
});

export default function useStore() {
  return readonly(state);
}

export function setUsers(users: User[]) {
  state.users = users;
}
