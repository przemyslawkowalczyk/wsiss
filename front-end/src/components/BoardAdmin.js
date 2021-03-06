import React, { useState, useEffect } from "react";

import UserService from "../services/user.service";
import ReactTable from "react-table-6";

const BoardAdmin = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    UserService.getAdminBoard().then(
      (response) => {
        setBooks(response.data);
      });
  }, []);

    const columns = [
        {
            Header: "Użytkownik",
            accessor: 'book.user.username'
        }, {
            Header: 'Autor',
            accessor: 'book.author'
        }, {
            Header: 'Tytuł',
            accessor: 'book.name',
        }, {
            Header: 'Rok wydania',
            accessor: 'book.releaseYear',
            Cell: props => <span>{props.value} r.</span>
        }, {
            Header: 'Status',
            accessor: 'status',
            Cell: props => <span>{{
                reserved: 'Zarezerwowana',
                loaned: 'Wypożyczona',
                devoted: 'Oddana'
            }[props.value]}</span>
        },
        {
            Header: '',
            Cell: ({ row }) => {
                console.log(row);
                return <span>dupa</span>
            }
        }
    ];

    return (
        <div className="container">
            <header className="jumbotron">
                <h3>
                    Panel Admina
                </h3>
            </header>
            <ReactTable
                pageSizeOptions={[5, 10, 20]}
                defaultPageSize={5}
                filterable
                data={books}
                columns={columns}
            />
        </div>
    );

};

export default BoardAdmin;
