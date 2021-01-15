import React, { useEffect } from "react";
import { Modal, ModalBody, ModalHeader, ModalFooter, Button } from "reactstrap";

export default function Stats(props) {
  const { isOpen, toggle, stats, dataPosted } = props;
  return (
    <>
      <Modal isOpen={isOpen} toggle={toggle}>
        <ModalHeader toggle={toggle}></ModalHeader>
        <ModalBody className="stat-board">
          {dataPosted.status == "UpdateNice" ? (
            <p>Check your slack. Updated slack</p>
          ) : (
            <p>{dataPosted.reason}</p>
          )}
          {"\n Will Refresh in 5 seconds \n"}
          {isOpen
            ? setTimeout(() => {
                // window.location.reload();
                window.location.reload(1);
              }, 5000)
            : null}
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
