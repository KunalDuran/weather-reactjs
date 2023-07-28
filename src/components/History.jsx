import React, { useState, useCallback } from 'react'

import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'
import IconButton from '@mui/material/IconButton'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import api from '@/services/api.js'
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
    label: 'Action',
    minWidth: 170,
    align: 'right',
    format: value => value.toFixed(2)
  }
]

const ROWS_PER_PAGE_OPTIONS = [10, 25, 100];

const HistoryTable = ({ rows, setWeatherHistory }) => {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const handleChangePage = useCallback((event, newPage) => {
    setPage(newPage)
  }, [])

  const handleChangeRowsPerPage = useCallback(event => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }, [])


  const handleDelete = useCallback((event, activeOption) => {
    event.preventDefault()
    api.deleteWeatherHistoryByID(activeOption).then((data) => {
      if (data.status !== "success") {
        toast(data.message, { type: "error" });
        return;
      }
      toast("Row deleted successfully", { type: "error" });
      const newWeatherHistory = rows.filter((item) => {
        return item.id !== parseInt(activeOption)
      })
      setWeatherHistory(newWeatherHistory)
    }).catch((error) => {
      toast("Error deleting row", { type: "error" });
      console.error('Error occurred:', error.message);
    });
  }, [rows])

  const renderCell = (column, row) => {
    if (column.id === 'option') {
      return (
        <TableCell key={column.id} align={column.align}>
          <IconButton onClick={(e) => handleDelete(e, row.id)}>
            <DeleteOutlineOutlinedIcon fontSize='medium' color='error' sx={{ mr: 2 }} />
          </IconButton>
        </TableCell>
      )
    }
    const value = row[column.id]
    return (
      <TableCell key={column.id} align={column.align}>
        {column.format && typeof value === 'number' ? column.format(value) : value}
      </TableCell>
    )
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
            {rows && rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, idx) => {
              return (
                <TableRow key={idx} hover role='checkbox' tabIndex={-1} >
                  {columns.map((column, idx) => (
                    <React.Fragment key={column.id + idx}>
                      {renderCell(column, row)}
                    </React.Fragment>
                  ))}
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={ROWS_PER_PAGE_OPTIONS}
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
