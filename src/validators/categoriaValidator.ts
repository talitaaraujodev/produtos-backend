import yup from "./validator";

const categoriaValidator = yup.object().shape({
  tipo: yup.string().required().max(70).min(6),
});
export default categoriaValidator;
