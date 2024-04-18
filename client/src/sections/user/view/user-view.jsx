import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import { http } from '../../../helpers/httpHelper';
import { AuthContext } from '../../../auth/context/AuthContext';
import Iconify from '../../../components/iconify';
import Scrollbar from '../../../components/scrollbar';
;import TableNoData from '../table-no-data';
import UserTableRow from '../user-table-row';
import UserTableHead from '../user-table-head';
import TableEmptyRows from '../table-empty-rows';
import UserTableToolbar from '../user-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../utils';
import {UserForm, UpdateUserForm} from '../CreateUserForm';

export default function UserPage() {
  const [users, setUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [editingUser, setEditingUser] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isNewUserModalOpen, setIsNewUserModalOpen] = useState(false);
  const [isUpdateUserModalOpen, setIsUpdateUserModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  
  const { logged, token } = useContext(AuthContext);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!logged) {
      console.error("User must log in.");
      navigate('/login');
      return;
    }
  
    const fetchUsers = async () => {
      try {
        const response = await http.get(`/users?page=${page + 1}&limit=${rowsPerPage}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        console.log(response)
        
        if (response.data) {
          setUsers(response.data.users);
          setTotalUsers(response.data.total);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
        if (error.response && error.response.status === 401) {
          navigate('/login');
        }
      }
    };
  
    fetchUsers();
  }, [page, rowsPerPage, logged, token, navigate]);

  const handleEditUser = (user) => {
    console.log('Editing user:', user);
  };

  

  const handleDeleteUser = async (user) => {
    if (window.confirm(`Are you sure you want to delete ${user.name}?`)) {
      try {
        await http.delete(`/users/${user.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(users.filter((u) => u.id !== user.id));
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  const handleNewUserClick = () => {
    setIsNewUserModalOpen(true);
  };

  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = users.map((user) => user.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, userId) => {
    const selectedIndex = selected.indexOf(userId);
    let newSelected = [];
    
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, userId);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
  
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const dataFiltered = applyFilter({
    inputData: users,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const handleSaveEdit = (updatedUser) => {
    console.log('Saving', updatedUser);
    setIsEditModalOpen(false);
  };
  
  const handleCloseModal = () => {
    setIsEditModalOpen(false);
  };
  const handleEditClick = (user) => {
    console.log("Editing user:", user);
    setSelectedUser(user);
    setIsUpdateUserModalOpen(true);
  };
  

  const handleCloseUpdateModal = () => {
    setIsUpdateUserModalOpen(false);
    setSelectedUser(null);
  };
  
  
  const handleSaveUpdatedUser = async (updatedUserData) => {
    const data = new FormData();
  
    try {
      const response = await http.put(`/users/${selectedUser.id}`, data, {
        headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${token}` },
      });
      setIsUpdateUserModalOpen(false);
      setSelectedUser(null);
    } catch (error) {
      console.error('Update failed:', error);
    }
  };
  
  

  const notFound = !dataFiltered.length && !!filterName;

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Users</Typography>

        <Button onClick={handleNewUserClick} variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />}>
  New User
</Button>
      </Stack>

      <Card>
        <UserTableToolbar
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
        />

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <UserTableHead
                order={order}
                orderBy={orderBy}
                rowCount={users.length}
                numSelected={selected.length}
                onRequestSort={handleSort}
                onSelectAllClick={handleSelectAllClick}
                headLabel={[
                  { id: 'name', label: 'Name' },
                  { id: 'email', label: 'Email' },
                  { id: 'role', label: 'Role' },
                  { id: 'isVerified', label: 'Verified', align: 'center' },
                  { id: 'status', label: 'Status' },
                  { id: '' },
                ]}
              />
             <TableBody>
              {dataFiltered
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((user) => (
                  <UserTableRow
                    key={user.id}
                    user={user}
                    name={`${user.firstName} ${user.lastName}`}
                    role={user.permissions.some(permission => permission.id === 1) ? 'Admin' : 'User'}
                    status={user.emailValidated ? 'active' : 'banned'}
                    company={user.email}
                    avatarUrl={user.img}
                    isVerified={user.emailValidated}
                    selected={selected.includes(user.id)}
                    onEdit={handleEditClick}
                    onDelete={() => handleDeleteUser(user)}
                    handleClick={(event) => handleClick(event, user.id)}
                    />
                ))}

  <TableEmptyRows
    height={77}
    emptyRows={emptyRows(page, rowsPerPage, users.length)}
  />

  {notFound && <TableNoData query={filterName} />}
</TableBody>

            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          page={page}
          component="div"
          count={users.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>

      {isEditModalOpen && (
      <EditUserModal
        user={editingUser}
        open={isEditModalOpen}
        onSave={handleSaveEdit}
        onClose={() => setIsEditModalOpen(false)}
      />
    )}
    {isNewUserModalOpen && (
  <UserForm
    open={isNewUserModalOpen}
    onClose={() => setIsNewUserModalOpen(false)}
    onSave={(newUserData) => {
      http.post('/users', newUserData, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(response => {
        console.log('User created:', response.data);
        setUsers([...users, response.data]);
        setIsNewUserModalOpen(false);
      })
      .catch(error => {
        console.error('Failed to create user:', error);
      });
    }}
  />
)}
{isUpdateUserModalOpen && (
  <UpdateUserForm
    open={isUpdateUserModalOpen}
    onClose={handleCloseUpdateModal}
    onSave={handleSaveUpdatedUser}
    selectedUser={selectedUser}
  />
)}
    </Container>
  );
} 