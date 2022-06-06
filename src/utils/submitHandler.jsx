import validationForm from "./validationForm";

function submitHandler(formData, setError, setStatus, setFormData, form) {
  let errorObj = {};
  let validationError = false;
  for (const key in formData) {
    const error = validationForm(key, formData[key]);
    errorObj[key] = error;
    if (error) {
      validationError = error;
    }
  }
  setError(errorObj);
  if (!validationError) {
    setFormData({
      fullName: {},
      dateOfBirth: "",
      phone: "",
      gender: "",
      clientsGroup: [],
      doctor: "",
      sms: false,
    });
    form.reset();
  }
  setStatus({ loader: false, success: !validationError });
}

export default submitHandler;
