import React, {useState, useEffect} from "react";

import UserService from "../services/user.service";
import AuthService from "../services/auth.service";

const Home = () => {
    const user = AuthService.getCurrentUser();

    const [content, setContent] = useState("");

    useEffect(() => {
        if (user) {
            UserService.getPublicList().then(
                (response) => {
                    setContent(response.data);
                },
                (error) => {
                    const _content =
                        (error.response && error.response.data) ||
                        error.message ||
                        error.toString();

                    setContent(_content);
                }
            );
        }

    }, []);

    if (!user) {
        return (
            <div className="container">
                <header className="jumbotron">
                    <h3>{content}</h3>
                </header>
            </div>
        );
    }

    return (
        <div className="container">
            <header className="jumbotron">

            </header>
        </div>
    );
};

export default Home;
