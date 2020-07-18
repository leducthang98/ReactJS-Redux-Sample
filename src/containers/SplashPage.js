import React from 'react';
import { withRouter } from 'react-router-dom';
class SplashPage extends React.Component {
    componentDidMount() {
        const token = localStorage.getItem('token');
        if (token) {
            setTimeout(() => this.props.history.push('/home'), 1000)
        } else {
            setTimeout(() => this.props.history.push('/login'), 1000)
        }
    }
    render() {
        return (
            <h1>Redirecting</h1>
        )
    }
}
export default withRouter(SplashPage);