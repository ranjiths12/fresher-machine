import { useState } from "react";

const useUserAction = (initialContacts) => {
  const [show, setShow] = useState(false);
  const [view, setView] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [contacts, setContacts] = useState(initialContacts);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedContact, setSelectedContact] = useState(null);
  const [newContact, setNewContact] = useState({
    name: "",
    email: "",
    mobile: "",
    address: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    mobile: "",
    address: "",
  });

  const handleClose = () => {
    setShow(false);
    setEditMode(false);
    setSelectedContact(null);
    setNewContact({
      name: "",
      email: "",
      mobile: "",
      address: "",
    });
    setErrors({
      name: "",
      email: "",
      mobile: "",
      address: "",
    });
  };

  const handleShow = () => setShow(true);
  const handleViewModal = () => setView(true);
  const handleCloseModal = () => setView(false);

  const handleChange = (e) => {
    setNewContact({
      ...newContact,
      [e.target.name]: e.target.value,
    });
    setErrors({
      ...errors,
      [e.target.name]: "",
    });
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const validateForm = () => {
    const { name, email, mobile, address } = newContact;
    const newErrors = {
      name: name ? "" : "Name is required",
      email: email ? "" : "Email is required",
      mobile: mobile ? "" : "Mobile number is required",
      address: address ? "" : "Address is required",
    };

    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error !== "");
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      return;
    }
    if (editMode) {
      const updatedContacts = contacts.map((contact) =>
        contact.id === selectedContact.id
          ? { ...selectedContact, ...newContact }
          : contact
      );
      setContacts(updatedContacts);
    } else {
      const newId = contacts.length ? contacts[contacts.length - 1].id + 1 : 1;
      const updatedContacts = [
        ...contacts,
        { id: newId, ...newContact },
      ];
      setContacts(updatedContacts);
    }
    handleClose();
  };

  const handleView = (contact) => {
    setSelectedContact(contact);
    setView(true);
    handleViewModal();
  };

  const handleEdit = (contact) => {
    setSelectedContact(contact);
    setNewContact(contact);
    setEditMode(true);
    handleShow();
  };

  const handleDelete = (contactId) => {
    const updatedContacts = contacts.filter(
      (contact) => contact.id !== contactId
    );
    setContacts(updatedContacts);
  };

  const filteredContacts = contacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.mobile.includes(searchQuery)
  );

  return {
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
  };
};

export default useUserAction;
