import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { LANGUAGES } from '../../../utils';
import { fetchGenderStart, fetchPositionStart, fetchRoleStart } from '../../../store/actions/adminActions';
import * as action from '../../../store/actions';
import './UserRedux.scss';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import TableManageUser from './TableManageUser';

class UserRedux extends Component {
    constructor(props) {
        super(props);
        this.state = {
            genderArr: [],
            positionArr: [],
            roleArr: [],
            previewImgURL: '',
            isOpen: false,

            email: '',
            password: '',
            firstName: '',
            lastName: '',
            phoneNumber: '',
            address: '',
            gender: '',
            position: '',
            role: '',
            avatar: '',
            isEditing: false,
            id: ''
        }
    }

    async componentDidMount() {
        this.props.getGenderStart();
        this.props.getPositionStart();
        this.props.getRoleStart();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        // populate form when selecting a user to edit
        if (prevProps.userEditing !== this.props.userEditing) {
            const ue = this.props.userEditing;
            if (ue) {
                this.setState({
                    email: ue.email || '',
                    password: '', // do not preload password
                    firstName: ue.firstName || '',
                    lastName: ue.lastName || '',
                    address: ue.address || '',
                    phoneNumber: ue.phonenumber || ue.phoneNumber || '',
                    gender: ue.gender || '',
                    position: ue.positionId || '',
                    role: ue.roleId || '',
                    id: ue.id,
                    isEditing: true
                });
            } else {
                // cleared editing -> reset edit mode (keep current selects if needed)
                this.setState({
                    isEditing: false,
                    id: ''
                });
            }
        }
        if (prevProps.genderRedux !== this.props.genderRedux) {
            this.setState({
                genderArr: this.props.genderRedux,
                gender: this.props.genderRedux && this.props.genderRedux.length > 0 ? this.props.genderRedux[0].key : ''
            });
        }
        if (prevProps.positionRedux !== this.props.positionRedux) {
            this.setState({
                positionArr: this.props.positionRedux,
                position: this.props.positionRedux && this.props.positionRedux.length > 0 ? this.props.positionRedux[0].key : ''
            });
        }
        if (prevProps.roleRedux !== this.props.roleRedux) {
            this.setState({
                roleArr: this.props.roleRedux,
                role: this.props.roleRedux && this.props.roleRedux.length > 0 ? this.props.roleRedux[0].key : ''
            });
        }
    }

    handleChangeInput = (e, field) => {
        this.setState({
            [field]: e.target.value
        });
    }

    handleFileChange = (e) => {
        let file = e.target.files[0];
        if (file) {
            const objectUrl = URL.createObjectURL(file);
            this.setState({
                previewImgURL: objectUrl,
                avatar: file
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

    checkValidInput = () => {
        let isValid = true;
        // Base required fields
        let arrCheck = ['email', 'firstName', 'lastName', 'phoneNumber', 'address'];
        // Only require password when creating new user
        if (!this.state.isEditing) {
            arrCheck.splice(1, 0, 'password'); // insert after email for message order
        }
        for (let i = 0; i < arrCheck.length; i++) {
            if (!this.state[arrCheck[i]]) {
                isValid = false;
                alert(`Missing parameter: ${arrCheck[i]}`);
                break;
            }
        }
        return isValid;
    }

    handleSaveUser = (e) => {
        if (e && e.preventDefault) e.preventDefault();
        const isValid = this.checkValidInput();
        if (!isValid) return;
        if (this.state.isEditing) {
            this.props.updateUser({
                id: this.state.id,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                phonenumber: this.state.phoneNumber,
                gender: this.state.gender,
                roleId: this.state.role,
                positionId: this.state.position
            });
        } else {
            this.props.createNewUserSuccess({
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                phonenumber: this.state.phoneNumber,
                gender: this.state.gender,
                roleId: this.state.role,
                positionId: this.state.position
            });
        }
    }

    handleReset = (forceNew = false) => {
        // If forceNew or not in editing mode, clear to defaults
        if (forceNew || !this.state.isEditing) {
            const defaultGender = this.state.genderArr && this.state.genderArr.length > 0 ? this.state.genderArr[0].key : '';
            const defaultPosition = this.state.positionArr && this.state.positionArr.length > 0 ? this.state.positionArr[0].key : '';
            const defaultRole = this.state.roleArr && this.state.roleArr.length > 0 ? this.state.roleArr[0].key : '';
            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                phoneNumber: '',
                address: '',
                gender: defaultGender,
                position: defaultPosition,
                role: defaultRole,
                previewImgURL: '',
                avatar: '',
                isEditing: false,
                id: ''
            });
            return;
        }
        // In editing mode without force, reset back to original editing user values
        const ue = this.props.userEditing;
        if (ue) {
            this.setState({
                email: ue.email || '',
                password: '',
                firstName: ue.firstName || '',
                lastName: ue.lastName || '',
                address: ue.address || '',
                phoneNumber: ue.phonenumber || ue.phoneNumber || '',
                gender: ue.gender || '',
                position: ue.positionId || '',
                role: ue.roleId || '',
                previewImgURL: '',
                avatar: '',
                isEditing: true,
                id: ue.id
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
        const { createUserSuccess, createUserError } = this.props;

        return (
            <div className="user-redux-container" >
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
                                <input type="email" className="form-control" value={this.state.email} onChange={e => this.handleChangeInput(e, 'email')} required disabled={this.state.isEditing} />
                            </div>
                            <div className="col-md-6">
                                <label><FormattedMessage id="menu.user.password" defaultMessage="Password" /></label>
                                <input
                                    type="password"
                                    className="form-control"
                                    value={this.state.password}
                                    onChange={e => this.handleChangeInput(e, 'password')}
                                    required={!this.state.isEditing}
                                    disabled={this.state.isEditing}
                                    title={this.state.isEditing ? 'Password không cần khi cập nhật' : ''}
                                />
                                {this.state.isEditing && (
                                    <div className="form-text text-muted">
                                        <FormattedMessage id="hints.password-skip-update" defaultMessage="Bạn không cần nhập mật khẩu khi cập nhật." />
                                    </div>
                                )}
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
                                    {this.state.isEditing ? <FormattedMessage id="options.update" defaultMessage="Update" /> : <FormattedMessage id="options.save" defaultMessage="Save" />}
                                </button>
                                {this.state.isEditing && (
                                    <button type="button" className="btn btn-outline-secondary me-2" onClick={() => { this.props.clearEditing(); this.handleReset && this.handleReset(true); }}>
                                        <FormattedMessage id="options.cancel-edit" defaultMessage="Cancel" />
                                    </button>
                                )}
                                <button type="button" className="btn btn-secondary" onClick={this.handleReset}>
                                    <FormattedMessage id="options.reset" defaultMessage="Reset" />
                                </button>
                            </div>
                            {createUserSuccess && <div className="alert alert-success mt-2">User saved successfully</div>}
                            {createUserError && <div className="alert alert-danger mt-2">Save user failed</div>}
                        </form>
                    </div>
                </div >
                <TableManageUser />

                {this.state.isOpen === true && (
                    <Lightbox
                        mainSrc={this.state.previewImgURL}
                        onCloseRequest={() => this.setState({ isOpen: false })}
                    />
                )
                }
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
        isLoadingRole: state.admin.isLoadingRole,
        createUserSuccess: state.admin.createUserSuccess,
        createUserError: state.admin.createUserError,
        userEditing: state.admin.userEditing,
        isUpdatingUser: state.admin.isUpdatingUser
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(action.fetchGenderStart()),
        getPositionStart: () => dispatch(action.fetchPositionStart()),
        getRoleStart: () => dispatch(action.fetchRoleStart()),
        createNewUserSuccess: (data) => dispatch(action.createNewUserSuccess(data)),
        updateUser: (data) => dispatch(action.updateUserRedux(data)),
        clearEditing: () => dispatch(action.clearUserEditing())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
