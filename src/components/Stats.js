import React, { useEffect } from "react";
import axios from "axios";
import { Modal, ModalBody, ModalHeader, ModalFooter, Button } from "reactstrap";

export default function Stats(props) {
  const { isOpen, toggle, stats, dataPosted } = props;
  return (
    <>
      <Modal isOpen={isOpen} toggle={toggle}>
        <ModalHeader toggle={toggle}></ModalHeader>
        <ModalBody className="stat-board">
          {/* {dataPosted ? "" : "Some"} */}
          {JSON.stringify(dataPosted)}
        </ModalBody>
        <ModalFooter>
          <Button onClick={toggle} color="warning">
            Try Again!
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}
