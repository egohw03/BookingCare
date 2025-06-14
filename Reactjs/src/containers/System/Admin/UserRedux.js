import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { LANGUAGES } from '../../../utils';
import { fetchGenderStart, fetchPositionStart, fetchRoleStart } from '../../../store/actions/adminActions';
import * as action from '../../../store/actions';
import './UserRedux.scss';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

class UserRedux extends Component {
    constructor(props) {
        super(props);
        this.state = {
            genderArr: [],
            positionArr: [],
            roleArr: [],
            previewImgURL: '',
            isOpen: false,
        }
    }

    async componentDidMount() {
        this.props.getGenderStart();
        this.props.getPositionStart();
        this.props.getRoleStart();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.genderRedux !== this.props.genderRedux) {
            this.setState({
                genderArr: this.props.genderRedux
            });
        }
        if (prevProps.positionRedux !== this.props.positionRedux) {
            this.setState({
                positionArr: this.props.positionRedux
            });
        }
        if (prevProps.roleRedux !== this.props.roleRedux) {
            this.setState({
                roleArr: this.props.roleRedux
            });
        }
    }

    handleChangeInput = (e, field) => {
        this.setState({ [field]: e.target.value });
    }

    handleFileChange = (e) => {
        let file = e.target.files[0];
        if (file) {
            const objectUrl = URL.createObjectURL(file);
            this.setState({
                previewImgURL: objectUrl
            });
        }
    }

    openReviewImage = () => {
        if (this.state.previewImgURL) {
            this.setState({
                isOpen: true,
            });
        }
    }

    render() {
        let genders = this.state.genderArr;
        let positions = this.state.positionArr;
        let roles = this.state.roleArr;
        let language = this.props.language;
        let isGetGender = this.props.isLoadingGender;
        let isGetPosition = this.props.isLoadingPosition;
        let isGetRole = this.props.isLoadingRole;
        return (
            <div className="user-redux-container">
                <div className="title">
                    <FormattedMessage id="menu.admin.crud-redux" defaultMessage="User Redux" />
                </div>
                <div>{isGetGender === true ? 'Loading genders' : ''}</div>
                <div>{isGetPosition === true ? 'Loading positions' : ''}</div>
                <div>{isGetRole === true ? 'Loading roles' : ''}</div>
                <div className="user-redux-body">
                    <div className="container">
                        <form className="row g-3" onSubmit={this.handleSaveUser}>
                            <div className="mb-6">
                                <FormattedMessage id="options.add-new-user" defaultMessage="Add new user" />
                            </div>
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
                                    {positions && positions.length > 0 ? (
                                        positions.map((item) => (
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
                                <label><FormattedMessage id="menu.user.role" defaultMessage="Role" /></label>
                                <select className="form-control" value={this.state.role} onChange={e => this.handleChangeInput(e, 'role')}>
                                    {roles && roles.length > 0 ? (
                                        roles.map((item) => (
                                            <option key={item.key} value={item.key}>
                                                {language === 'vi' ? item.valueVi : item.valueEn}
                                            </option>
                                        ))
                                    ) : (
                                        <option value="">Không có dữ liệu</option>
                                    )}
                                </select>
                            </div>
                            <div className="col-12">
                                <label><FormattedMessage id="menu.user.avatar" defaultMessage="Avatar" /></label>
                                <div className="preview-img-container col-3">
                                    <input type="file" id="previewImg" className="form-control" accept="image/*" onChange={this.handleFileChange} hidden />
                                    <label className="label-upload" htmlFor="previewImg"><FormattedMessage id="options.upload-image" /></label>
                                    <div className="preview-image"
                                        style={{ backgroundImage: `url(${this.state.previewImgURL})` }}
                                        onClick={() => this.openReviewImage()}
                                    >
                                    </div>
                                </div>
                            </div>
                            <div className="col-3 mt-3">
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

                {this.state.isOpen === true && (
                    <Lightbox
                        mainSrc={this.state.previewImgURL}
                        onCloseRequest={() => this.setState({ isOpen: false })}
                    />
                )}
            </div >

        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genderRedux: state.admin.genders,
        isLoadingGender: state.admin.isLoadingGender,
        positionRedux: state.admin.positions,
        isLoadingPosition: state.admin.isLoadingPosition,
        roleRedux: state.admin.roles,
        isLoadingRole: state.admin.isLoadingRole
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(fetchGenderStart()),
        getPositionStart: () => dispatch(fetchPositionStart()),
        getRoleStart: () => dispatch(fetchRoleStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
