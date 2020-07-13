import React, {useState, useEffect} from "react";
import ReactTable from 'react-table-6'
import 'react-table-6/react-table.css'
import UserService from "../services/user.service";
import AuthService from "../services/auth.service";
import {Button} from 'react-bootstrap';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const Home = () => {
    const user = AuthService.getCurrentUser();
    const [books, setBooks] = useState([]);

    const getBooks = () => {
        UserService.getPublicList().then(
            (response) => {
                setBooks(response.data);
            }
        );
    }

    useEffect(() => {
        getBooks();
        // eslint-disable-next-line
    }, []);

    if (!user) {
        return (
            <div className="container">
                <header className="jumbotron">
                    <h3>Witamy na stronie Biblioteki!</h3>
                </header>
            </div>
        );
    }

    const columns = [
        {
            Header: 'Autor',
            accessor: 'author'
        }, {
            Header: 'Tytuł',
            accessor: 'name',
        }, {
            Header: 'Rok wydania',
            accessor: 'releaseYear',
            Cell: props => <span>{props.value} r.</span>
        }, {
            Header: '',
            accessor: 'id',
            Cell: props => <div className="d-flex justify-content-center">
                <Button
                    onClick={() => {
                        confirmAlert({
                            title: 'Rezerwacja',
                            message: 'Jesteś pewien że chcesz tą książkę zarezerwować?',
                            buttons: [
                                {
                                    label: 'Tak',
                                    onClick: async () => {
                                        await UserService.reserveBook(props.value);
                                        getBooks();
                                    }
                                },
                                {
                                    label: 'Nie',
                                    onClick: () => null
                                }
                            ]
                        });
                    }}
                    varian="primary">
                    Zarezerwuj
                </Button>
            </div>
        }
    ];

    return (
        <div className="container">
            <header className="jumbotron">
                <h3>
                    Wszystkie Książki
                </h3>
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

export default Home;
