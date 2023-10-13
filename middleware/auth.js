export default function ({ store, redirect }) {
  // Check if the user is authenticated
  if (process.client) {
    const isLoggedIn = store.getters['auth/isLoggedIn']
    if (!isLoggedIn) {
      return redirect('/auth')
    }
  }
}
