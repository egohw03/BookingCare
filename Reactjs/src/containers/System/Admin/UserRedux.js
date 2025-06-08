import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { getAllCodeService } from '../../../services/userService';

class UserRedux extends Component {
    constructor(props) {
        super(props);
        this.state = {
            genderArr: []

        }
    }

    async componentDidMount() {
        try {
            let res = await getAllCodeService('gender');
            if (res.data && res.data.errCode === 0) {
                this.setState({
                    genderArr: res.data.data
                });
            } else {
                this.setState({ genderArr: [] });
            }
        } catch (e) {
            console.log(e);
            this.setState({ genderArr: [], gender: '' });
        }
        document.title = "Product Management | BookingCare";
    }

    handleChangeInput = (e, field) => {
        this.setState({ [field]: e.target.value });
    }

    render() {
        let genders = this.state.genderArr;
        const { language } = this.props;
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
                                        <option value="">Không có dữ liệu giới tính</option>
                                    )}
                                </select>
                            </div>
                            <div className="col-md-3">
                                <label><FormattedMessage id="menu.user.position" defaultMessage="Position" /></label>
                                <select className="form-control">
                                    <option value="R1"><FormattedMessage id="menu.admin.manage-admin" defaultMessage="Admin" /></option>
                                    <option value="R2"><FormattedMessage id="menu.admin.manage-doctor" defaultMessage="Doctor" /></option>
                                    <option value="R3"><FormattedMessage id="menu.admin.manage-user" defaultMessage="Patient" /></option>
                                </select>
                            </div>
                            <div className="col-md-3">
                                <label><FormattedMessage id="menu.user.role" defaultMessage="Role" /></label>
                                <select className="form-control">
                                    <option value="R1"><FormattedMessage id="menu.admin.manage-admin" defaultMessage="Admin" /></option>
                                    <option value="R2"><FormattedMessage id="menu.admin.manage-doctor" defaultMessage="Doctor" /></option>
                                    <option value="R3"><FormattedMessage id="menu.admin.manage-user" defaultMessage="Patient" /></option>
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
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
