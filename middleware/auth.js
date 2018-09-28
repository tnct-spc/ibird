export default function ({ route, store, redirect }) {
  const path = route.path
  console.log(path)
  const user = store.state.authUser
  const curentClass = Number(path.replace(/[^0-9]/g, ''))
  let isRedirect = true
  if (user) {
    if (path.match(/control/)) {
      if (user.control) {
        isRedirect = false
      }
    } else if (path.match(/bb/)) {
      if (user.bb) {
        console.log(user.classes)
        console.log(user.allClass)
        if (user.allClass || user.classes.indexOf(curentClass) !== -1) {
          isRedirect = false
        }
      }
    } else if (path.match(/mobilepage/)) {
      if (user.mobile) {
        console.log(user.classes)
        if (user.allClass || user.classes.indexOf(curentClass) !== -1) {
          isRedirect = false
        }
      }
    }
  }
  if (isRedirect) {
    return redirect('/login?goto=' + path)
  }
}
