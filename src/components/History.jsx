// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'
import Link from 'next/link'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import util from '@/config/util.js'
import { toast } from 'react-toastify';

const columns = [
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'country', label: 'Country', minWidth: 100 },
  {
    id: 'temperature',
    label: 'Temprature (C)',
    minWidth: 170,
    align: 'right',
    format: value => value.toLocaleString('en-US')
  },
  {
    id: 'wind',
    label: 'Wind (km/h)',
    minWidth: 170,
    align: 'right',
    format: value => value.toLocaleString('en-US')
  },
  {
    id: 'humidity',
    label: 'Humidity (%)',
    minWidth: 170,
    align: 'right',
    format: value => value.toFixed(2)
  },
  {
    id: 'option',
    label: 'Option',
    minWidth: 170,
    align: 'right',
    format: value => value.toFixed(2)
  }
]
const deleteWeatherHistoryByID = async (weatherID) => {
  const url = `${util.API_URL}/api/history/delete?weatherID=${weatherID}`;
  
  try {
    const data = await util.handleFetch(url, {});
    return data;

  } catch (error) {
    console.error('Error occurred:', error.message);
  }
};

const HistoryTable = ({ rows, setWeatherHistory }) => {
  // ** States
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [anchorEl, setAnchorEl] = useState(null);
  const [activeOption, setActiveOption] = useState('');

  const rowOptionsOpen = Boolean(anchorEl)

  const handleRowOptionsClick = event => {
    setActiveOption(event.currentTarget.getAttribute('data-item'))
    setAnchorEl(event.currentTarget)
  }
  const handleRowOptionsClose = () => {
    setAnchorEl(null)
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  const handleDelete = (event) => {
    event.preventDefault()
    setAnchorEl(null)
    deleteWeatherHistoryByID(activeOption).then((data) => {
      // remove the deleted item from the table
      toast("Row deleted successfully", { type: "error" });


      const newWeatherHistory = rows.filter((item) => {
        return item.id !== parseInt(activeOption)
      }
      )
      setWeatherHistory(newWeatherHistory)

    });
  }

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label='sticky table'>
          <TableHead>
            <TableRow>
              {columns.map(column => (
                <TableCell key={column.id} align={column.align} sx={{ minWidth: column.minWidth }}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows && rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
              return (
                <TableRow hover role='checkbox' tabIndex={-1} key={row.code}>
                  {columns.map((column, idx) => {
                    const value = row[column.id]
                    if (column.id === 'option') {
                      return (
                        <TableCell key={idx} align={column.align}>
                          <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'right' }}>
                            <IconButton data-item={row.id} onClick={handleRowOptionsClick} size='small' sx={{ alignItems: 'right' }}>
                              <MoreVertIcon fontSize='small' />
                            </IconButton>
                            <Menu
                              keepMounted
                              anchorEl={anchorEl}
                              open={rowOptionsOpen}
                              onClose={handleRowOptionsClose}
                              anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right'
                              }}
                              transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right'
                              }}
                            >
                              <MenuItem onClick={handleDelete}>
                                <DeleteIcon fontSize='medium' sx={{ mr: 2 }} />
                                Delete
                              </MenuItem>
                              <Link href={``} passHref>
                                <MenuItem>
                                  <EditIcon fontSize='small' sx={{ mr: 2 }} />
                                  Edit
                                </MenuItem>
                              </Link>
                            </Menu>
                          </Box>
                        </TableCell>
                      )
                    }
                    return (
                      <TableCell key={idx} align={column.align}>
                        {column.format && typeof value === 'number' ? column.format(value) : value}
                      </TableCell>
                    )
                  })}
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component='div'
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  )
}

export default HistoryTable
