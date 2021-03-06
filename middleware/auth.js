export default function ({ req, route, store, redirect }) {
  const path = route.path
  const user = req.session.authUser
  const curentClass = Number(path.replace(/[^0-9]/g, ''))
  let isRedirect = true
  if (user) {
    if (path.match(/control/)) {
      if (user.control) {
        isRedirect = false
      }
    } else if (path.match(/bb/)) {
      if (user.bb) {
        if (user.allClass || user.classes.indexOf(curentClass) !== -1) {
          isRedirect = false
        }
      }
    } else if (path.match(/mobilepage/)) {
      if (user.mobile) {
        if (user.allClass || user.classes.indexOf(String(curentClass)) !== -1) {
          isRedirect = false
        }
      }
    }
  }
  if (isRedirect) {
    return redirect('/login?goto=' + path)
  }
}
