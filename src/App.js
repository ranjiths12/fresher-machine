import React from "react";
import { Col, Container, Form, Row, Modal } from "react-bootstrap";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { FiPlusCircle } from "react-icons/fi";
import ClickButton from "./components/Button";
import { FaRegCircleUser } from "react-icons/fa6";
import { MdDeleteOutline } from "react-icons/md";
import { IoEyeOutline } from "react-icons/io5";
import { FaPenToSquare } from "react-icons/fa6";
import sample from "./data/sample";
import useUserAction from "./hooks/useUseraction";

function App() {
  const {
    show,
    view,
    editMode,
    contacts: filteredContacts,
    selectedContact,
    newContact,
    searchQuery,
    errors,
    handleChange,
    handleClose,
    handleCloseModal,
    handleDelete,
    handleEdit,
    handleSearchChange,
    handleShow,
    handleSubmit,
    handleView,
  } = useUserAction(sample);

  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12" className="py-3">
            <aside className="listing-container">
              <header className="btn-container mb-3">
                <ClickButton
                  btnLabel={
                    <>
                      Add Contacts
                      <span className="mx-1">
                        <FiPlusCircle />
                      </span>
                    </>
                  }
                  className="w-100 btn-style"
                  onClick={handleShow}
                />
              </header>
              <nav className="search-container text-center">
                <div className="d-inline-block">
                  <Form>
                    <Form.Group className="mb-3">
                      <Form.Control
                        type="text"
                        placeholder="Search Contact"
                        value={searchQuery}
                        onChange={handleSearchChange}
                      />
                    </Form.Group>
                  </Form>
                </div>
              </nav>
              <main className="customer-container">
                {filteredContacts.map((contact, index) => (
                  <section key={contact.id} className="customer-details">
                    <div className="sno">
                      <span>{index + 1}</span>
                    </div>
                    <div className="name-number">
                      <div className="me-3">
                        <FaRegCircleUser size={30} />
                      </div>
                      <div>
                        <div>{contact.name}</div>
                        <div>{contact.mobile}</div>
                      </div>
                    </div>
                    <div className="action-icons">
                      <span
                        className="mx-2"
                        onClick={() => handleView(contact)}
                      >
                        <IoEyeOutline size={20} />
                      </span>
                      <span
                        className="mx-2"
                        onClick={() => handleEdit(contact)}
                      >
                        <FaPenToSquare size={18} />
                      </span>
                      <span
                        className="mx-2"
                        onClick={() => handleDelete(contact.id)}
                      >
                        <MdDeleteOutline size={20} />
                      </span>
                    </div>
                  </section>
                ))}
              </main>
            </aside>
          </Col>
        </Row>
      </Container>

      {/* Create/Edit Modal */}
      <Modal show={show} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>{editMode ? "Edit Contact" : "Add Contact"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Your Name"
                name="name"
                value={newContact.name}
                onChange={handleChange}
                isInvalid={!!errors.name}
              />
              <Form.Control.Feedback type="invalid">
                {errors.name}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter Your Email"
                name="email"
                value={newContact.email}
                onChange={handleChange}
                isInvalid={!!errors.email}
              />
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Your Phone Number"
                name="mobile"
                value={newContact.mobile}
                onChange={handleChange}
                isInvalid={!!errors.mobile}
              />
              <Form.Control.Feedback type="invalid">
                {errors.mobile}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your Address"
                name="address"
                value={newContact.address}
                onChange={handleChange}
                isInvalid={!!errors.address}
              />
              <Form.Control.Feedback type="invalid">
                {errors.address}
              </Form.Control.Feedback>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <ClickButton btnLabel="Submit" onClick={handleSubmit} />
          <ClickButton btnLabel="Cancel" onClick={handleClose} />
        </Modal.Footer>
      </Modal>

      {/* View Modal */}
      <Modal show={view} onHide={handleCloseModal} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Contact Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <strong>Name: </strong> {selectedContact?.name}
          </div>
          <div>
            <strong>Email: </strong> {selectedContact?.email}
          </div>
          <div>
            <strong>Phone: </strong> {selectedContact?.mobile}
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default App;
