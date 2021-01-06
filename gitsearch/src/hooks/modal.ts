import bus from './bus';

export default function useModal() {
  const open = (payload = {}) => {
    bus.emit('modal:toggle', { status: true, user: payload });
  };
  const close = (payload = {}) => {
    bus.emit('modal:toggle', { status: false, user: payload });
  };

  return { open, close };
}
