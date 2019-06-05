import React from 'react';
import { connect } from 'react-redux';
import { openModal } from '../../actions/modal_actions';
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
                <img src={this.props.act.url} alt="act"/>
                <span>
                    <div className="acts-desc">
                        You can see {this.props.act.name} perform LIVE at Go-Chella on {(this.parseDate(this.props.act.date).date).split('-')[1] 
                        + '/' + (this.parseDate(this.props.act.date).date).split('-')[2]}.
                        <br />
                        Show starts at {this.parseDate(this.props.act.date).time} on the {this.props.act.stage} Stage.
                    </div>
                </span>
                <button className="add-act" onClick={() => this.props.openModal('Add Act')}>Add Act</button>
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
        fetchAct: id => dispatch(fetchAct(id)),
        openModal: modal => dispatch(openModal(modal))
    };
};

export default connect(mstp, mdtp)(ActIndexItem);
