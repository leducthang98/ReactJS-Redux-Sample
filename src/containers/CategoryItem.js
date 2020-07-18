import React, { Component } from 'react';
import CategoryDetail from './CategoryDetail';
import { getCategory,loadingCategory } from '../actions/HomeActions';
import { connect } from 'react-redux';
class CategoryItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalOn: false,
            isDeleting: false
        }
    }
    _onClickDetail() {
        this.setState({
            modalOn: true
        })
    }
  
    async _onClickDelete(id) {
        //higher order component
        this.props.loadingCategory()
        const token = localStorage.getItem('token')
        const url = "http://localhost:3004/category/" + id;
        await fetch(url, {
            method: "DELETE",
            headers: { Authorization: 'Bearer' + ' ' + token }
        })
            .then((response) => response.json())
            .then((res) => {
                console.log(res)
            })
            .catch((error) => {
            });
        let data = {
            page: 0,
            token: token,
        }
        this.props.getCategory(data)
    }
    render() {
        let data = this.props;
        if (!this.state.isPressDetail) {
            return (
                <tr>
                    <th scope="row">{data.id}</th>
                    <td>{data.name}</td>
                    <td>{data.description}</td>
                    <td>{data.createdDate}</td>
                    <td>
                        <button type="button" className="btn btn-primary" style={{ marginRight: 10 }}
                            onClick={() => this.props.onClickDetail()}
                        >Detail</button>
                        <button type="button" className="btn btn-danger"
                            onClick={() => this._onClickDelete(data.id)}>Delete</button>
                    </td>
                </tr>
            )
        } else {
            return (
                <h1>Pressed</h1>
            );
        }
    }
}
const mapStateToProps = (store) => {
    return {

    }
}
const mapDispatchToProps = (dispath) => {
    return {
        getCategory: (data) => {
            dispath(getCategory(data))
        },
        loadingCategory: () => {
            dispath(loadingCategory())
        }

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryItem);