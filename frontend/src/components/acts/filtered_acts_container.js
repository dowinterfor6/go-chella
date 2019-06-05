import { connect } from 'react-redux';
import { fetchActs } from '../../actions/act_actions';
import { Link } from 'react-router-dom';
import '../../assets/stylesheets/reset.css';
import '../../assets/stylesheets/discover.css';
import React from 'react';

class FilteredActs extends React.Component {
    constructor(props) {
        super(props);
        this.state ={
            date: this.props.date,
            stage: this.props.stage,
            acts: []
        };
    }

    componentDidMount() {
        document.title = 'Discover';
        this.props.fetchActs()
            .then((res) => {
                res.acts.forEach((act) => {
                    if(this.parseDate(act.date).date === this.state.date) {
                        this.state.acts.push(act);
                    }
                })
            })
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
            this.state.acts.sort().map((act, idx) => (
              <li className='discovery-index-item' key={idx}>
                <h3>{act.name}</h3>
                <h4>Date: {this.parseDate(act.date).date} Time: {this.parseDate(act.date).time}</h4>
                <Link to={`/acts/${act._id}`} act={act}><img src={act.url} alt={act.name} /></Link>
                <a href={``}></a>
              </li>
            ))
          )

        return (
            <ul className="act-list">
                {acts}
            </ul>
        );
    }
}

const mstp = state => {
    return {
        formType: 'Create Group',
    };
};

const mdtp = dispatch => {
    return {
        fetchActs: () => dispatch(fetchActs())
    };
};

export default connect(
    mstp,
    mdtp
)(FilteredActs);