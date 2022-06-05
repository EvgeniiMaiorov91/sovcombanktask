const validationForm = (type, data) => {
  let error = false;
  switch (type) {
    case "fullName":
      if (JSON.stringify(data) === "{}") {
        error = "Заполните поле";
      } else {
        let name = data.name;
        let surname = data.surname;
        if (!name || !surname) {
          error = "Введите имя и фамилию";
        }
      }
      break;

    case "dateOfBirth":
      if (!data) {
        error = "Заполните поле";
      } else if (new Date(data).getTime() > Date.now()) {
        error = "Введите корректную дату рождения";
      }
      break;

    case "phone":
      const PHONE_REGEXP = /(\+\d\(\d{3}\)\d{3}-\d{2}-\d{2})$/g;
      if (data === "") {
        error = "Заполните поле";
      } else if (!PHONE_REGEXP.test(data)) {
        error = "Введите корректный номер телефона";
      }
      break;

    case "gender":
    case "doctor":
      if (!data) {
        error = type === "gender" ? "Укажите пол" : "Выберете врача";
      }
      break;

    case "clientsGroup":
      if (!data.length) {
        error = "Выберете поле(я)";
      }
      break;
    default:
      break;
  }
  return error;
};

export default validationForm;
