import React from 'react';
import { withRouter } from 'react-router-dom';
import CategoryItem from './CategoryItem';
import CategoryDetail from './CategoryDetail';
import { getInfoUser, getCategory, loadingCategory } from '../actions/HomeActions';
import { connect } from 'react-redux';
import Loading from './Loading';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            id: '',
            category: [],
            modalData: null,
            page: 0,
            isLoading: false,
            totalPage: null,
            createForm: false,
            createData: {
                name: null,
                description: null,
            }
        }
    }
    async componentDidMount() {
        let token = localStorage.getItem('token');
        if (token) {
            this._getInfoUser(token);
            this._getCategory(token)
        } else {
            this.props.history.push('/login')
        }
    }
    _getInfoUser(token) {
        this.props.getUserInfo(token)
    }
    async _getCategory(token) {
        let data = {
            page: this.state.page,
            token: token
        }
        this.props.getCategory(data)
    }
    async _onClickBackButton() {
        if (this.state.page === 0) {

        } else {
            let token = localStorage.getItem('token');
            await this.setState({
                page: this.state.page - 1
            })
            this._getCategory(token);
        }
    }
    async _onClickNextButton() {
        if (this.state.page === this.props?.dataCategory.totalPage) {

        } else {
            let token = localStorage.getItem('token');
            await this.setState({
                page: this.state.page + 1
            })
            this._getCategory(token);
        }
    }
    _onClickLogout() {
        this.props.history.push('/login')
    }
    _renderCreateCategoryForm() {
        return (

            <Modal
                show={this.state.createForm} animation={false}>
                <Modal.Header>
                    <Modal.Title  >Category Detail</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <label>
                            <h4>name</h4>
                            <input type="text" name="name"
                                value={this.state.createForm.name}
                                onChange={(e) => this.setState({
                                    ...this.state,
                                    createData: {
                                        ...this.state.createData,
                                        name: e.target.value
                                    }
                                })}
                            />
                        </label>
                    </form>
                    <form>
                        <label>
                            <h4>description</h4>
                            <input type="text" name="name"
                                value={this.state.createForm.description}
                                onChange={(e) => this.setState({
                                    ...this.state,
                                    createData: {
                                        ...this.state.createData,
                                        description: e.target.value
                                    }
                                })}
                            />
                        </label>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => {
                        this._createCategory()
                    }}>
                        OK
   </Button>
                    <Button variant="secondary" onClick={() => {
                        this.setState({
                            createForm: false
                        })
                    }}>
                        Close
   </Button>
                </Modal.Footer>
            </Modal>
        )
    }
    async _createCategory() {
    if(this.state.createData.name){
        await this.setState({
            ...this.state,
            createForm: false
        })
        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date + ' ' + time;
        let cat = {
            createdDate:dateTime,
            name: this.state.createData.name,
            description: this.state.createData.description
        }
        this.props.loadingCategory()
        const token = localStorage.getItem('token')
        const url = "http://localhost:3004/category";
        await fetch(url, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                Authorization: 'Bearer' + ' ' + token
            },
            body: JSON.stringify(cat)
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
    }else{
        alert("Category name can not be NULL")
    }
    }
    render() {

        if (this.props.userInfo && this.props.dataCategory) {
            let userData = this.props.userInfo;
            return (
                <div>

                    <div className={"row"}>
                        <section className="col-6">
                            <span style={{ display: 'flex' }}>
                                <h4 style={{ color: 'green', marginRight: 5 }}>User ID: </h4>
                                <h4> {userData.id}</h4>
                            </span>
                            <span style={{ display: 'flex' }}>
                                <h4 style={{ color: 'green', marginRight: 5 }}>Username: </h4>
                                <h4>{userData.username}</h4>
                            </span>
                        </section>
                        <section className="col-6" style={{ display: "flex", flexDirection: "row", justifyContent: "flex-end", alignItems: "center" }}>

                            <button
                                style={{ marginRight: 20 }}
                                type="button" className="btn btn-secondary"
                                onClick={() => this._onClickLogout()}>Logout</button>
                        </section>
                    </div>

                    <h2>Page: {this.state.page + 1}/{(this.props?.dataCategory.totalPage + 1) ? this.props?.dataCategory.totalPage + 1 : 1}</h2>
                    <button
                        type="button" className="btn btn-success"
                        style={{ marginBottom: 10 }}
                        onClick={() => this.setState({
                            ...this.state,
                            createForm: true
                        })}>ADD <i className="fas fa-plus header-session-2-div-icon "></i></button>
                    <table className="table table-bordered table-striped text-center">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col" className="text-center">Name</th>
                                <th scope="col" className="text-center">Description</th>
                                <th scope="col" className="text-center">Created Date</th>
                                <th scope="col" className="text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.dataCategory.categoryList.map((item, index) => {
                                return <CategoryItem
                                    key={index}
                                    id={item.id}
                                    name={item.name}
                                    description={item.description}
                                    createdDate={item.createdDate}
                                    onClickDetail={() => this.setState({
                                        ...this.state,
                                        modalData: item
                                    })}
                                ></CategoryItem>
                            })}
                        </tbody>
                    </table>

                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <button
                            type="button" className="btn btn-warning"
                            style={{ marginRight: 10 }}
                            onClick={() => this._onClickBackButton()}>Back</button>
                        <button
                            type="button" className="btn btn-warning"
                            onClick={() => this._onClickNextButton()}>Next</button>
                    </div>
                    {
                        this.props.isLoadingCategory ? <Loading></Loading> : null
                    }
                    {
                        this.state.modalData ? <CategoryDetail
                            display={this.state.modalData}
                            data={this.state.modalData}
                            close={() => this.setState({
                                ...this.state,
                                modalData: null
                            })}
                        /> : null
                    }
                    {
                        this._renderCreateCategoryForm()
                    }
                </div>
            )
        } else {
            return (
                <Loading></Loading>
            )
        }
    }
}
const mapStateToProps = (store) => {
    return {
        userInfo: store.homeReducer?.infoUser,
        dataCategory: store.homeReducer?.dataCategory,
        isLoadingCategory: store.homeReducer?.isLoadingCategory,
    }
}
const mapDispatchToProps = (dispath) => {
    return {
        getUserInfo: (token) => {
            dispath(getInfoUser(token))
        },
        getCategory: (data) => {
            dispath(getCategory(data))
        },
        loadingCategory: () => {
            dispath(loadingCategory())
        }


    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(HomePage));