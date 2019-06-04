import { createGroup } from '../../actions/group_actions';
import { openModal, closeModal } from '../../actions/modal_actions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import '../../assets/stylesheets/reset.css';
import '../../assets/stylesheets/discover.css';
import React from 'react';
import { fetchActs } from '../../actions/act_actions';

class DiscoverPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    }
  }

  componentDidMount() {
    document.title = 'Discover';
    this.props.fetchActs().then(
      (res) => {
        res.acts.map((act) => (
          this.setState({ [Date.parse(act.date)]: act })
        ))
      }
    )
  }

  parseDate(date) {
    let newDate;
    let newTime;
    let dateArr = date.split('T');
    newDate = dateArr[0];
    let timeArr = dateArr[1].split('Z');
    newTime = timeArr[0].split('.')[0];
    return { date: newDate, time: newTime }
  }

  render() {
    let acts = (
      Object.keys(this.state).sort().map((key, idx) => (
        <li className='discovery-index-item' key={idx}>
          <h3>{this.state[key].name}</h3>
          <h4>Date: {this.parseDate(this.state[key].date).date} Time: {this.parseDate(this.state[key].date).time}</h4>
          <Link to={`/acts/${this.state[key]._id}`} act={this.state[key]}><img src={this.state[key].url} alt={this.state[key].name} /></Link>
          <a href={``}></a>
        </li>
      ))
    )

    let dates = [];
    let stages = [];
    Object.keys(this.state).forEach((item) => {

      if(this.state[item].date) {
        if(!dates.includes(this.parseDate(this.state[item].date).date)) {
          dates.push(this.parseDate(this.state[item].date).date)
        }
      }

      if(this.state[item].stage) {
        if(!stages.includes(this.state[item].stage)) {
          stages.push(this.state[item].stage);
        }
      }
    })

    let datesDropdown = (
      dates.sort().map((date, id) => (
        <option key={id} value={date} >{date}</option>
      ))
    )

    let stagesDropdown = (
      stages.sort().map((stage, id) => (
        <option key={id} value={stage}>{stage}</option>
      ))
    )

    let filter = (
      <div className="filter-menu">
        <label>Date:
          <select style={{ marginLeft: 5 }}>
            {datesDropdown}
          </select>
        </label>
        <label>Stage:
          <select style={{ marginLeft: 5 }}>
            {stagesDropdown}
          </select>
        </label>
      </div>
    );

    return (
      <div className='discovery-container'>
        <div className="discovery-header">
          <h1>Browse Coachella events!</h1>
          <button onClick={() => {
            this.props.openModal(this.props.formType)
          }
          }>
            Create a Group
          </button>
        </div>
        
        <div>
          {filter}
        </div>

        <ul className="act-list">
          {acts}
        </ul>
      </div>
    );
  }

}

const mstp = state => {
  return {
    formType: 'Create Group'
  };
};

const mdtp = dispatch => {
  return {
    createGroup: group => dispatch(createGroup(group)),
    openModal: type => dispatch(openModal(type)),
    closeModal: () => dispatch(closeModal()),
    fetchActs: () => dispatch(fetchActs())
  };
};

export default connect(mstp, mdtp)(DiscoverPage);
