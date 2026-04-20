import { useEffect, useState } from "react";

// Manage All form state
export const useFormStateData = ({ oldStateData }) => {
  const [currentData, setCurrentData] = useState(null);
  const [formData, setFormData] = useState({});
  const [hasEmptyError, setHasEmptyError] = useState({});

  //init
  useEffect(() => {
    const init = () => {
      setCurrentData(oldStateData);
      setFormData(oldStateData);
    };
    init();
  }, []);

  function handleSelectChanges({ field, data }) {
    console.log(field);
    console.log(data);
    //Data is some Id / Data
    setFormData((prev) => ({
      ...prev,
      [field]: data,
    }));
  }

  function handleInputChanges(e) {
    const field = e.target?.dataset?.field_name;
    const value = e.target.value;

    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  function handleBooleanChanges({ field, state }) {
    if (typeof state !== "boolean" || field == "") return;

    setFormData((prev) => ({
      ...prev,
      [field]: state,
    }));
  }

  function getUpdatedFields(original, current) {
    const updates = {};

    for (let key in current) {
      if (current[key] !== original[key]) {
        updates[key] = current[key];
      }
    }

    return updates;
  }

  /*
  useEffect(() => {
    const callOnce = () => {
      const newUpdate = getUpdatedFields(currentData, formData);
      for (const [key, value] of Object.entries(newUpdate)) {
        console.log(key);
        console.log(value);
        if (currentData[key] === newUpdate[key] && (value === "" || Number(value) === 0)) {
            setHasEmptyError((p) => ({ ...p, field: key }));
            } else {
              setHasEmptyError((p) => ({ ...p, field: null }));
          }
          }
};
    callOnce();
    }, [formData, currentData]);
    */

  const isDirty = Object.keys(formData || {}).some(
    (key) => formData[key] !== currentData?.[key],
  );

  const updatedField = getUpdatedFields(currentData, formData);

  return {
    isDirty,
    hasEmptyError,
    handleInputChanges,
    handleSelectChanges,
    handleBooleanChanges,
    newData: { ...oldStateData, ...updatedField },
    updatedField,
  };
};
