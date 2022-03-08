import yup from "./validator";

const loginValidador = yup.object().shape({
    email: yup.string().required(),
    password: yup.string().max(70).min(8).required(),
})
export default loginValidador;