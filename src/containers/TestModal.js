import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import React, { useState } from 'react';
export default function TestModal(props) {
    return (
      <>
        <Modal show={props.display} animation={false}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={()=>{props.onClickClose()}}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }