import React from 'react';
import { connect } from 'react-redux';
import { fetchAct } from '../../actions/act_actions';
import '../../assets/stylesheets/reset.css';
import '../../assets/stylesheets/acts_show.css';

class ActIndexItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {
        this.props.fetchAct(this.props.id);
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

        if(!this.props.act) {
            return null;
        }

        return (
            <div className="acts-show-container">
                <h2>This is the page for <strong>{this.props.act.name}!</strong></h2>
                <img src={this.props.act.url} alt="act-photo"/>
                <span>
                    <div>{this.parseDate(this.props.act.date).date}</div>
                </span>
            </div>
        )

    }
}

const mstp = (state, ownProps) => {
    let id = ownProps.match.params.actId;
    let act = state.acts[ownProps.match.params.actId];
    return {
        act,
        id
    };
};

const mdtp = dispatch => {
    return {
        fetchAct: id => dispatch(fetchAct(id))
    };
};

export default connect(mstp, mdtp)(ActIndexItem);
