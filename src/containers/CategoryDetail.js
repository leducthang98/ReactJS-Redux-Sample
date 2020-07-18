import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import React, { useState } from 'react';
function CategoryDetail(props) {
    return (
        <Modal
            show={props.display} animation={false}>
            <Modal.Header>
                <Modal.Title  >Category Detail</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>
                    <p>Category Name: {props.data.name}</p>
                    <p>Date created: {props.data.createdDate}</p>
                    <p>Description: {props.data.description}</p>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => { props.close() }}>
                    Close
               </Button>
            </Modal.Footer>
        </Modal>
    );

}

export default CategoryDetail;