const getters = {
  sidebar:state => state.app.sidebar,
  token:state => state.user.token,
  avatar:state => state.user.avatar,
  user_id:state => state.user.user_id,
  name:state => state.user.name,
  roles:state => state.user.roles
}
export default getters
