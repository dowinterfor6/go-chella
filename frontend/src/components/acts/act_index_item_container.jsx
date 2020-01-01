import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { openModal } from '../../actions/modal_actions';
import { fetchDisplayAct } from '../../actions/act_actions';
import '../../assets/stylesheets/reset.css';
import '../../assets/stylesheets/acts_show.css';

class ActIndexItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {
        this.props.fetchDisplayAct(this.props.id)
            .then((res) => (
                this.setState({ act: res.act.data})
            ))
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
        if(!this.state.act) {
            return null;
        }

        return (
            <div className="acts-show-container">
                <h1>{this.state.act.name}</h1>
                <button onClick={() => this.props.openModal('Add Act')}>Add Act</button>
                <div className="acts-desc">
                    <img src={this.state.act.url} alt="act" height="470" width="800"/>
                    <p>
                        You can see {this.state.act.name} perform LIVE at Go-Chella on {(this.parseDate(this.state.act.date).date).split('-')[1] 
                        + '/' + (this.parseDate(this.state.act.date).date).split('-')[2]}.
                        Show starts at {this.parseDate(this.state.act.date).time} on the {this.state.act.stage} Stage.
                    </p>
                </div>
                <div className="return-footer">
                    <p>Not a fan of {this.state.act.name}?</p>
                    <br />
                    <Link className="hvr-underline-from-left" to="/discover"> Head back to the directory instead.</Link>
                </div>
            </div>
        )

    }
}

const mstp = (state, ownProps) => {
    let id = ownProps.match.params.actId;
    return {
        id
    };
};

const mdtp = dispatch => {
    return {
        fetchDisplayAct: id => dispatch(fetchDisplayAct(id)),
        openModal: modal => dispatch(openModal(modal))
    };
};

export default connect(mstp, mdtp)(ActIndexItem);
