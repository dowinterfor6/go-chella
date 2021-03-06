import { connect } from 'react-redux';
import { fetchActs } from '../../actions/act_actions';
import { Link } from 'react-router-dom';
import '../../assets/stylesheets/reset.css';
import '../../assets/stylesheets/discover.css';
import React from 'react';

class FilteredActs extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            date: this.props.date,
            stage: this.props.stage
        }
    }

    componentDidMount() {
        document.title = 'Discover';
        this.props.fetchActs()
            .then((res) => {
                return res.acts.filter((act) => {
                    return this.parseDate(act.date).date === this.state.date;
                })
            }).then((acts) => {
                acts.map((act) => (
                    this.setState({ [Date.parse(act.date)]: act })
                    ))
                })
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if(prevState.date !== nextProps.date) {
            return { date: nextProps.date };
        } else {
            return null;
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevState.date !== this.props.date) {
            this.props.fetchActs()
            .then((res) => {
                return res.acts.filter((act) => {
                    return this.parseDate(act.date).date === this.props.date;
                })
            })
            .then((acts) => {
                acts.map((act) => (
                    this.setState({ [Date.parse(act.date)]: act })
                    ))
                })
        }
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
        
        let acts = [];
        Object.keys(this.state).slice(2).forEach((id) => {
            if(this.parseDate(this.state[id].date).date === this.props.date) {
                acts.push(this.state[id]);
            }
        })

        let allThat = (
                acts.map((act, idx) => (
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
                {allThat}
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