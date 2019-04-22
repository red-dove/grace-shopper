import React, {Component} from 'react'
import {connect} from 'react-redux'
import {me, editUserInfoThunk} from '../store'

class UserProfile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      firstName: '',
      lastName: '',
      street: '',
      city: '',
      state: '',
      zip: '',
      country: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    this.props.me()
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      email: nextProps.data.email,
      firstName: nextProps.data.firstName,
      lastName: nextProps.data.lastName,
      street: nextProps.data.street,
      city: nextProps.data.city,
      state: nextProps.data.state,
      zip: nextProps.data.zip,
      country: nextProps.data.country
    })
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault() 
    this.props.putUser({

      email: this.state.email,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      street: this.state.street,
      city: this.state.city,
      state: this.state.state,
      zip: this.state.zip,
      country: this.state.country


    }) 
  }

  render() {
    // let user = this.props.data
    return (
      <div>
        <form onClick={this.handleSubmit} className='formContainer'>
          
   <div>
              <label htmlFor="email">
                <small>Email: </small>
              </label>
              <input
                name="email"
                type="email"
                value={this.state.email}
                onChange={this.handleChange}
              />

              </div>
     
              <div>
            <label htmlFor="firstName">
              <small>First Name: </small>
            </label> 
            <input
              name="firstName"
              type="text"
              value={this.state.firstName}
              onChange={this.handleChange}
            />
      
</div>
<div>
            <label htmlFor="lastName">
              <small>Last Name: </small>
            </label>
            <input
              name="lastName"
              type="text"
              value={this.state.lastName}
              onChange={this.handleChange}
            />
      </div>
      <div>
       
            <label htmlFor="street">
              <small>Street: </small>
            </label>
            <input
              name="street"
              type="text"
              value={this.state.street}
              onChange={this.handleChange}
            />
    </div>
    <div>
            <label htmlFor="city">
              <small>City: </small>
            </label>
            <input
              name="city"
              type="text"
              value={this.state.city}
              onChange={this.handleChange}
            />
 </div> <div>
            <label htmlFor="state">
              <small>State: </small>
            </label>
            <input
              name="state"
              type="text"
              value={this.state.state}
              onChange={this.handleChange}
            />
</div>
<div>
            <label htmlFor="zip">
              <small>Zip: </small>
            </label>
            <input
              name="zip"
              type="text"
      
              value={this.state.zip}
              onChange={this.handleChange}
            />
   </div>
   <div>
            <label htmlFor="country">
              <small>Country: </small>
            </label>
            <input
              name="country"
              type="text"
              value={this.state.country}
              onChange={this.handleChange}
            />

</div>
       <div>  <button type="submit">Update Info</button></div> 
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
    me: () => {
      // const userId = id.match.params.userId;
      dispatch(me())
    },
    putUser: (user) => {
      dispatch(editUserInfoThunk(user))
    }
  }
}

const UserProfileContainer = connect(mapStateToProps, mapDispatchToProps)(
  UserProfile
)
export default UserProfileContainer
