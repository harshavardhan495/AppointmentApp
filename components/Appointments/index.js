// Write your code here
import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import date from 'date-and-time'
import {format} from 'date-fns'
import AppointmentItem from '../AppointmentItem/index'
import './index.css'

class Appointments extends Component {
  state = {
    appointmentArray: [],
    title: '',
    appointmentDate: '',
    isStarred: false,
    isFav: '',
  }

  inputValue = event => {
    this.setState({title: event.target.value})
  }

  dateValue = event => {
    const enteredDate = event.target.value
    const convertedEnteredDate = new Date(enteredDate)
    const now = new Date()
    if (convertedEnteredDate > now) {
      this.setState({appointmentDate: event.target.value})
    } else {
      alert('Please enter date greater than current date')
    }
  }

  addAppointment = event => {
    event.preventDefault()
    const {title, appointmentDate, isFav, isStarred} = this.state
    const newAppointmentObj = {
      id: uuidv4(),
      title,
      appointmentDate,
      isFav: false,
      isStarred,
    }
    if (title.trim() !== '' && appointmentDate.trim() !== '') {
      this.setState(prevState => ({
        appointmentArray: [...prevState.appointmentArray, newAppointmentObj],
        title: '',
        appointmentDate: '',
      }))
    } else {
      this.setState({title: '', appointmentDate: ''})
    }
  }

  clickedStarred = () => {
    this.setState(prevState => ({isStarred: !prevState.isStarred}))
  }

  clickFavButton = id => {
    this.setState(prevState => ({
      appointmentArray: prevState.appointmentArray.map(eachAppointment => {
        if (eachAppointment.id === id) {
          return {...eachAppointment, isFav: !eachAppointment.isFav}
        }
        return eachAppointment
      }),
    }))
  }

  render() {
    const {title, appointmentDate, isFav, isStarred} = this.state
    let {appointmentArray} = this.state
    if (isStarred === true) {
      appointmentArray = appointmentArray.filter(
        eachItem => eachItem.isFav === true,
      )
    }
    const starredButtonActv = isStarred ? 'active-starred-btn' : ''

    return (
      <div className="main-bg-container">
        <div className="card-container">
          <div className="header-section">
            <div className="input-container">
              <h1>Add Appointment</h1>
              <form className="form-container" onSubmit={this.addAppointment}>
                <label htmlFor="title" className="form-label">
                  Title <br />
                  <input
                    type="text"
                    className="input-area"
                    placeholder="TITLE"
                    onChange={this.inputValue}
                    value={title}
                    required
                    id="title"
                  />
                </label>{' '}
                <br />
                <label className="form-label" htmlFor="date">
                  DATE <br />
                  <input
                    type="date"
                    className="date-input-area"
                    onChange={this.dateValue}
                    value={appointmentDate}
                    required
                    id="date"
                  />
                </label>
                <br />
                <button type="submit" className="submit-button">
                  Add
                </button>
              </form>
            </div>
            <div className="image-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png "
                alt="appointments"
                className="image-props"
              />
            </div>
          </div>
          <hr />
          <div className="appointments-container">
            <div className="header-strip">
              <h1 className="body-heading">Appointments</h1>
              <button
                type="button"
                className={`starred-button ${starredButtonActv}`}
                onClick={this.clickedStarred}
              >
                Starred
              </button>
            </div>
            <ul className="main-list-container">
              {appointmentArray.map(eachAppointment => (
                <AppointmentItem
                  appointmentDetails={eachAppointment}
                  key={eachAppointment.id}
                  clickFavButton={this.clickFavButton}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Appointments
