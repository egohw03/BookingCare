import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import _ from 'lodash';

class ModalEditUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
            phonenumber: '',
            gender: '',
            roleId: '',
            positionId: ''
        };
    }

    componentDidMount() {
        let user = this.props.currentUser;
        if (user && !_.isEmpty(user)) {
            this.setState({
                id: user.id,
                email: user.email,
                password: 'HARDCODE',
                firstName: user.firstName,
                lastName: user.lastName,
                address: user.address,
                phonenumber: user.phonenumber,
                gender: user.gender ? '1' : '0',
                roleId: user.roleId,
                positionId: user.positionId
            });
        }
    }

    toggle = () => {
        this.props.toggleFromParent();
    }

    handleOnChangeInput = (event, id) => {
        let copyState = { ...this.state };
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        });
    }

    checkValidInput = () => {
        let isValid = true;
        let arrInput = ['email', 'firstName', 'lastName', 'address'];
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                isValid = false;
                alert('Missing parameter: ' + arrInput[i]);
                break;
            }
        }
        return isValid;
    }

    handleSaveUser = () => {
        let isValid = this.checkValidInput();
        if (isValid) {
            this.props.editUser(this.state);
        }
    }

    render() {
        return (
            <Modal
                isOpen={this.props.isOpen}
                toggle={this.toggle}
                className='modal-user-container'
                size="lg"
            >
                <ModalHeader toggle={this.toggle}>Edit User Information</ModalHeader>
                <ModalBody>
                    <div className="modal-user-body">
                        <div className="input-container">
                            <label>Email</label>
                            <input
                                type="text"
                                onChange={(event) => this.handleOnChangeInput(event, "email")}
                                value={this.state.email}
                                disabled
                            />
                            <i className="input-icon fas fa-envelope"></i>
                        </div>
                        <div className="input-container">
                            <label>Password</label>
                            <input
                                type="password"
                                onChange={(event) => this.handleOnChangeInput(event, "password")}
                                value={this.state.password}
                                disabled
                            />
                            <i className="input-icon fas fa-lock"></i>
                        </div>
                        <div className="input-container">
                            <label>First name</label>
                            <input
                                type="text"
                                placeholder="Enter first name"
                                onChange={(event) => this.handleOnChangeInput(event, "firstName")}
                                value={this.state.firstName}
                            />
                        </div>
                        <div className="input-container">
                            <label>Last name</label>
                            <input
                                type="text"
                                placeholder="Enter last name"
                                onChange={(event) => this.handleOnChangeInput(event, "lastName")}
                                value={this.state.lastName}
                            />
                        </div>
                        <div className="input-container max-width-input">
                            <label>Address</label>
                            <input
                                type="text"
                                placeholder="Enter full address"
                                onChange={(event) => this.handleOnChangeInput(event, "address")}
                                value={this.state.address}
                            />
                            <i className="input-icon fas fa-map-marker-alt"></i>
                        </div>
                        <div className="input-container">
                            <label className="optional">Phone number</label>
                            <input
                                type="text"
                                placeholder="Enter phone number"
                                onChange={(event) => this.handleOnChangeInput(event, "phonenumber")}
                                value={this.state.phonenumber}
                            />
                            <i className="input-icon fas fa-phone"></i>
                        </div>
                        <div className="input-container">
                            <label>Gender</label>
                            <select
                                onChange={(event) => this.handleOnChangeInput(event, "gender")}
                                value={this.state.gender}
                            >
                                <option value="1">Male</option>
                                <option value="0">Female</option>
                            </select>
                        </div>
                        <div className="input-container">
                            <label>Role</label>
                            <select
                                onChange={(event) => this.handleOnChangeInput(event, "roleId")}
                                value={this.state.roleId}
                            >
                                <option value="R1">Admin</option>
                                <option value="R2">Doctor</option>
                                <option value="R3">Patient</option>
                            </select>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="primary"
                        onClick={() => this.handleSaveUser()}
                    >
                        <i className="fas fa-save"></i> Save changes
                    </Button>
                    <Button color="secondary" onClick={this.toggle}>
                        <i className="fas fa-times"></i> Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        )
    }
}

export default ModalEditUser;
