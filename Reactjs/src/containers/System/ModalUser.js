import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { emitter } from '../../utils/emitter';

class ModalUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
            phonenumber: '',
            gender: '1',
            roleId: '1',
            positionId: '1'
        };

        this.listenToEmitter();
    }

    listenToEmitter() {
        emitter.on('EVENT_CLEAR_MODAL_DATA', () => {
            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                address: '',
                phonenumber: '',
                gender: '1',
                roleId: '1',
                positionId: '1'
            });
        });
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
        let arrInput = ['email', 'password', 'firstName', 'lastName', 'address'];
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                isValid = false;
                alert('Missing parameter: ' + arrInput[i]);
                break;
            }
        }
        return isValid;
    }

    handleAddNewUser = () => {
        let isValid = this.checkValidInput();
        if (isValid) {
            this.props.createNewUser(this.state);
        }
    }

    render() {
        return (
            <Modal
                isOpen={this.props.isOpen}
                toggle={this.toggle}
                className='modal-user-container'
                size="lg"
                backdrop="static"
                keyboard={false}
            >
                <ModalHeader toggle={this.toggle}>Create a new user</ModalHeader>
                <ModalBody>
                    <div className="modal-user-body">
                        <div className="input-container">
                            <label>Email</label>
                            <input
                                type="text"
                                placeholder="Enter email address"
                                onChange={(event) => this.handleOnChangeInput(event, "email")}
                                value={this.state.email}
                            />
                            <i className="input-icon fas fa-envelope"></i>
                        </div>
                        <div className="input-container">
                            <label>Password</label>
                            <input
                                type="password"
                                placeholder="Enter password"
                                onChange={(event) => this.handleOnChangeInput(event, "password")}
                                value={this.state.password}
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
                                <option value="1">Admin</option>
                                <option value="2">Doctor</option>
                                <option value="3">Patient</option>
                            </select>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="primary"
                        onClick={() => this.handleAddNewUser()}
                        className="btn-save-user"
                    >
                        <i className="fas fa-plus"></i> Add user
                    </Button>
                    <Button
                        color="secondary"
                        onClick={this.toggle}
                        className="btn-cancel"
                    >
                        <i className="fas fa-times"></i> Close
                    </Button>
                </ModalFooter>
            </Modal>
        )
    }
}

export default ModalUser;
