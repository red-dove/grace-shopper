import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {editUserThunk, editUserInfoThunk} from '../store'

class UserProfile extends Component {
  constructor() { 
    super()
    this.state = {
        email:'',
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  componentDidMount() {
    this.props.editUser()
  }


  handleChange (event) {
    this.setState({
      [event.target.name]: event.target.value
    }) 
  }

  
  handleSubmit(event) {
    event.preventDefault()
    this.props.putUser(this.state.email)
  }

  render() {
    let user = this.props.data
    return (
      <div>
        {/* <div>{user.email}</div>
        <div>{user.password}</div>
        <div>{user.firstName}</div>
        <div>{user.lastName}</div>
        <div>{user.street}</div>
        <div>{user.city}</div>
        <div>{user.state}</div>
        <div>{user.zip}</div>
        <div>{user.country}</div> */}
        <form  onClick={this.handleSubmit}>
          <div>
            <label htmlFor="email">
              <small>Email</small>
            </label>
            <input name="email" type="email" value={user.email}  onChange = {this.handleChange}/>
          </div>
          {/* <div>
          <label htmlFor="password">
            <small>Password</small>
          </label>
          <input name="password" type="password"  value={user.password} />
        </div> */}
          {/*           
            <div>
              <label htmlFor="firstName">
                <small>First Name</small>
              </label>
              <input name="firstName" type="text" />
            </div>
            <div>
              <label htmlFor="lastName">
                <small>Last Name</small>
              </label>
              <input name="lastName" type="text" />
            </div>
            <div>
              <label htmlFor="street">
                <small>Street</small>
              </label>
              <input name="street" type="text" />
            </div>
            <div>
              <label htmlFor="city">
                <small>City</small>
              </label>
              <input name="city" type="text" />
            </div>
            <div>
              <label htmlFor="state">
                <small>State</small>
              </label>
              <input name="state" type="text" />
            </div>
            <div>
              <label htmlFor="zip">
                <small>Zip</small>
              </label>
              <input name="zip" type="text" />
            </div>
            <div>
              <label htmlFor="country">
                <small>Country</small>
              </label>
              <input name="country" type="text" />
            </div>
       
    
        <div> */}
          <button type="submit" >
            Update Info
          </button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => {
  //  console.log('mapping state to store', state.user)
  return {data: state.user}
}

const mapDispatchToProps = dispatch => {
  return {
    editUser: () => {
      // const userId = id.match.params.userId;
      dispatch(editUserThunk())
    },
    putUser: user => {
      dispatch(editUserInfoThunk(user))
    }
  }
}

const UserProfileContainer = connect(mapStateToProps, mapDispatchToProps)(
  UserProfile
)
export default UserProfileContainer
