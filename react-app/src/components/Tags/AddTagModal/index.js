import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../../context/Modal";

function addTagModal() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [errors, setErrors] = useState({});

  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault()

    const data = await fetch("/api/tags")
  }
}
