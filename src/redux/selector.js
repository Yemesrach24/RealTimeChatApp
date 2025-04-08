// Selector to get all messages
// Selector to get the user data
export const selectUser = (state) => state.user.user;
export const selectMessages = (state) => state.messages.messages;

// Selector to get unread messages (example)
export const selectUnreadMessages = (state) =>
  state.messages.messages.filter((message) => !message.read);
