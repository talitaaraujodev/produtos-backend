import yup from "./validator";

const registerValidador = yup.object().shape({
    nome: yup.string().required(),
    email: yup.string().required(),
    password: yup.string().max(70).min(8).required()
})
export default registerValidador;