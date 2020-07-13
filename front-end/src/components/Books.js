import React, {useState, useEffect} from "react";
import ReactTable from 'react-table-6'
import 'react-table-6/react-table.css'
import UserService from "../services/user.service";

const Books = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        UserService.getMyBooks().then(
            (response) => {
                setBooks(response.data);
            }
        );
    }, []);

    const columns = [
        {
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
        }
    ];

    return (
        <div className="container">
            <header className="jumbotron">
                <h3>Panel Bibliotekarza</h3>
            </header>
            <ReactTable
                loading={!books.length}
                pageSizeOptions={[5, 10, 20]}
                defaultPageSize={5}
                filterable
                data={books}
                columns={columns}
            />
        </div>
    );
};

export default Books;
