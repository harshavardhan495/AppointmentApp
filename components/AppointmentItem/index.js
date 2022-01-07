// Write your code here
import {format} from 'date-fns'
import './index.css'

const AppointmentItem = props => {
  const {appointmentDetails, clickFavButton} = props
  const {id, title, appointmentDate, isFav} = appointmentDetails
  const formattedDate = format(new Date(appointmentDate), 'dd MMMM yyyy, EEEE')

  const favButtonClicked = () => {
    clickFavButton(id)
  }

  const imgURl = isFav
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  return (
    <li className="appointment-card">
      <div className="card-header-strip">
        <h1 className="card-heading">{title}</h1>
        <button
          type="button"
          className="fav-button"
          onClick={favButtonClicked}
          testid="star"
        >
          <img src={imgURl} className="fav-icon" alt="star" />
        </button>
      </div>
      <p>{formattedDate}</p>
    </li>
  )
}

export default AppointmentItem
