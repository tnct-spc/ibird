export default function ({ route, store, redirect }) {
  const path = route.path
  console.log(path)
  const user = store.state.authUser
  let isRedirect = true
  if (user) {
    if (path.match(/control/)) {
      if (user.control) {
        isRedirect = false
      }
    } else if (path.match(/bb/)) {
      if (user.bb) {
        isRedirect = false
      }
    } else if (path.match(/mobilepage/)) {
      if (user.mobile) {
        isRedirect = false
      }
    }
  }
  if (isRedirect) {
    return redirect('/login?got=' + path)
  }
}
