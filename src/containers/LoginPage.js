import React from 'react';
import { withRouter } from 'react-router-dom';
import TestModal from './TestModal';
const axios = require('axios');
class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            isValid: true,
            isLoading: false,
            token: ''
        }
    }
    componentDidMount(){
        localStorage.clear();
    }
    async _onClickLogin() {
        await this.setState({
            isLoading: true
        })

        console.log(this.state.isLoading)
        let data = {
            username: this.state.username,
            password: this.state.password
        }
        const url = "http://localhost:3004/authenticate";
        fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then((response) => response.json())
            .then((res) => {
                console.log(res.jwt)
                this.setState({
                    ...this.state,
                    token: res.jwt,
                    isLoading: false
                })

            })
            .then(() => {
                if (this.state.token) {
                    localStorage.setItem("token", this.state.token);
                    this.props.history.push('/home')
                } else {
                    this.setState({
                        ...this.state,
                        isValid: false
                    })
                }
            })
            .catch((error) => {

            });


    }
    _renderWhenInvalid() {
        return (
            <>
                <h1>Incorrect</h1>
                <button onClick={() => this.setState({
                    username: '',
                    password: '',
                    isValid: true
                })}>Try Again</button>
            </>
        )
    }
    _renderLoading() {
        return (
            <h1>Loading</h1>
        )
    }
    render() {
        return (
            <>
            <TestModal></TestModal>
                <form>
                    <label>
                        Username:
                         <input type="text" name="name"
                            value={this.state.username}
                            onChange={(e) => this.setState({
                                username: e.target.value
                            })}
                        />
                    </label>
                </form>
                <form>
                    <label>
                        Password:
                      <input type="text" name="name"
                            value={this.state.password}
                            onChange={(e) => this.setState({
                                password: e.target.value
                            })}
                        />
                    </label>

                </form>
                <button
                    onClick={() => this._onClickLogin()}
                >Đăng nhập
                </button>
                {
                    !this.state.isValid ? this._renderWhenInvalid() : null
                }
                {
                    this.state.isLoading ? this._renderLoading() : null
                }
            </>
        )
    }
}
export default withRouter(LoginPage);