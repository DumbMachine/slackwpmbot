import React, { useEffect } from "react";
import { Modal, ModalBody, ModalHeader, ModalFooter, Button } from "reactstrap";

export default function Stats(props) {
  const { isOpen, toggle, stats, dataPosted } = props;

  // useEffect(() => {
  //   isOpen &&
  //     setTimeout(() => {
  //       // window.location.reload();
  //       window.location.reload(1);
  //     }, 5000);
  // }, [isOpen]);

  return (
    <>
      <Modal isOpen={isOpen} toggle={toggle}>
        <ModalHeader toggle={toggle}></ModalHeader>
        <ModalBody className="stat-board">
          {dataPosted.status == "UpdateNice" ? (
            <p>Check your slack. Updated slack</p>
          ) : (
            <p> {dataPosted.reason}</p>
          )}
          WPM: {stats[1]}
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
