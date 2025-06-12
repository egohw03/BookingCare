import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { getAllCodeService } from '../../../services/userService';
import { LANGUAGES } from '../../../utils';
import { fetchGenderStart } from '../../../store/actions/adminActions';
import * as action from '../../../store/actions';

class UserRedux extends Component {
    constructor(props) {
        super(props);
        this.state = {
            genderArr: [],
            positionArr: [],
            roleArr: []
        }
    }

    async componentDidMount() {
        this.props.getGenderStart();
        // try {
        //     let resGender = await getAllCodeService('gender');
        //     this.setState({
        //         genderArr: resGender && resGender.errCode === 0 ? resGender.data : []
        //     })
        //     let resPosition = await getAllCodeService('position');
        //     this.setState({
        //         positionArr: resPosition && resPosition.errCode === 0 ? resPosition.data : []
        //     })
        //     let resRole = await getAllCodeService('role');
        //     this.setState({
        //         roleArr: resRole && resRole.errCode === 0 ? resRole.data : []
        //     })
        // } catch (e) {
        //     console.log(e);
        //     this.setState({ genderArr: [], positionArr: [], roleArr: [] });
        // }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.genderRedux !== this.props.genderRedux) {
            this.setState({
                genderArr: this.props.genderRedux
            });
        }
    }

    handleChangeInput = (e, field) => {
        this.setState({ [field]: e.target.value });
    }

    render() {
        let genders = this.state.genderArr;
        let language = this.props.language;
        return (
            <div className="user-redux-container">
                <div className="title">
                    <FormattedMessage id="menu.admin.crud-redux" defaultMessage="User Redux" />
                </div>
                <div className="user-redux-body">
                    <div className="container">
                        <form className="row g-3" onSubmit={this.handleSaveUser}>
                            <div className="col-md-6">
                                <label><FormattedMessage id="menu.user.email" defaultMessage="Email" /></label>
                                <input type="email" className="form-control" value={this.state.email} onChange={e => this.handleChangeInput(e, 'email')} required />
                            </div>
                            <div className="col-md-6">
                                <label><FormattedMessage id="menu.user.password" defaultMessage="Password" /></label>
                                <input type="password" className="form-control" value={this.state.password} onChange={e => this.handleChangeInput(e, 'password')} required />
                            </div>
                            <div className="col-md-6">
                                <label><FormattedMessage id="menu.user.first-name" defaultMessage="First Name" /></label>
                                <input type="text" className="form-control" value={this.state.firstName} onChange={e => this.handleChangeInput(e, 'firstName')} required />
                            </div>
                            <div className="col-md-6">
                                <label><FormattedMessage id="menu.user.last-name" defaultMessage="Last Name" /></label>
                                <input type="text" className="form-control" value={this.state.lastName} onChange={e => this.handleChangeInput(e, 'lastName')} required />
                            </div>
                            <div className="col-12">
                                <label><FormattedMessage id="menu.user.address" defaultMessage="Address" /></label>
                                <input type="text" className="form-control" value={this.state.address} onChange={e => this.handleChangeInput(e, 'address')} />
                            </div>
                            <div className="col-md-3">
                                <label><FormattedMessage id="menu.user.phone" defaultMessage="Phone Number" /></label>
                                <input type="text" className="form-control" value={this.state.phoneNumber} onChange={e => this.handleChangeInput(e, 'phoneNumber')} />
                            </div>
                            <div className="col-md-3">
                                <label><FormattedMessage id="menu.user.gender" defaultMessage="Gender" /></label>
                                <select className="form-control" value={this.state.gender} onChange={e => this.handleChangeInput(e, 'gender')}>
                                    {genders && genders.length > 0 ? (
                                        genders.map((item) => (
                                            <option key={item.key} value={item.key}>
                                                {language === 'vi' ? item.valueVi : item.valueEn}
                                            </option>
                                        ))
                                    ) : (
                                        <option value="">Không có dữ liệu</option>
                                    )}
                                </select>
                            </div>
                            <div className="col-md-3">
                                <label><FormattedMessage id="menu.user.position" defaultMessage="Position" /></label>
                                <select className="form-control" value={this.state.position} onChange={e => this.handleChangeInput(e, 'position')}>

                                </select>
                            </div>
                            <div className="col-md-3">
                                <label><FormattedMessage id="menu.user.role" defaultMessage="Role" /></label>
                                <select className="form-control" value={this.state.role} onChange={e => this.handleChangeInput(e, 'role')}>

                                </select>
                            </div>
                            <div className="col-12 mt-3">
                                <button type="submit" className="btn btn-primary me-2">
                                    <FormattedMessage id="options.save" defaultMessage="Save" />
                                </button>
                                <button type="button" className="btn btn-secondary" onClick={this.handleReset}>
                                    <FormattedMessage id="options.reset" defaultMessage="Reset" />
                                </button>
                            </div>
                        </form>
                    </div>
                </div >
            </div >

        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genderReduc: state.admin.genders
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(fetchGenderStart()),
        // fetchPositionStart: () => dispatch(actions.fetchPositionStart()),
        // fetchRoleStart: () => dispatch(actions.fetchRoleStart()),
        // createNewUserRedux: (data) => dispatch(actions.createNewUserRedux(data)),
        // editUserRedux: (data) => dispatch(actions.editUserRedux(data)),
        // deleteUserRedux: (userId) => dispatch(actions.deleteUserRedux(userId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
