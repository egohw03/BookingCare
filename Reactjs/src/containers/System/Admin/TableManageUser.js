import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAllUsersRedux, setUserEditing, deleteUserRedux } from '../../../store/actions/adminActions';
import './TableManageUser.scss';

class TableManageUser extends Component {
    componentDidMount() {
        this.props.fetchAllUsers();
    }

    handleEditUser = (user) => {
        this.props.setEditing(user);
    }

    handleDeleteUser = (userId) => {
        if (window.confirm('Bạn có chắc muốn xóa user này?')) {
            this.props.deleteUser(userId);
        }
    }

    render() {
        const { users = [], isLoadingAllUsers, isDeletingUser } = this.props;
        return (
            <div className="table-manage-user">
                <div className="table-manage-user__header">
                    <div className="table-manage-user__header-title">
                        Manage Users
                    </div>
                    <div className="table-manage-user__header-search">
                        <input type="text" placeholder="Search user..." />
                        <span className="icon">🔍</span>
                    </div>
                    <div className="table-manage-user__header-refresh">
                        <button onClick={this.props.fetchAllUsers} disabled={isLoadingAllUsers}>
                            {isLoadingAllUsers ? 'Refreshing...' : 'Refresh'}
                        </button>
                    </div>
                </div>
                <div className="table-manage-user__wrapper">
                    <table className="table-manage-user__table">
                        <thead>
                            <tr>
                                <th>Email</th>
                                <th>First name</th>
                                <th>Last name</th>
                                <th>Address</th>
                                <th className="actions-col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {isLoadingAllUsers && (
                                <tr className="loading-row"><td colSpan="5">Loading...</td></tr>
                            )}
                            {!isLoadingAllUsers && users && users.length > 0 && users.map((item) => (
                                <tr key={item.id}>
                                    <td data-label="Email">{item.email}</td>
                                    <td data-label="First name">{item.firstName}</td>
                                    <td data-label="Last name">{item.lastName}</td>
                                    <td data-label="Address" className="ellipsis">{item.address}</td>
                                    <td className="table-manage-user__actions" data-label="Actions">
                                        <button className="edit" onClick={() => this.handleEditUser(item)} disabled={isLoadingAllUsers}>Edit</button>
                                        <button className="delete" onClick={() => this.handleDeleteUser(item.id)} disabled={isDeletingUser}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                            {!isLoadingAllUsers && (!users || users.length === 0) && (
                                <tr className="empty"><td colSpan="5">No users</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    users: state.admin.users,
    isLoadingAllUsers: state.admin.isLoadingAllUsers,
    isDeletingUser: state.admin.isDeletingUser
});

const mapDispatchToProps = dispatch => ({
    fetchAllUsers: () => dispatch(fetchAllUsersRedux()),
    setEditing: (user) => dispatch(setUserEditing(user)),
    deleteUser: (id) => dispatch(deleteUserRedux(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
