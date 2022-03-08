
import yup from "./validator";

const produtoValidador = yup.object().shape({
    nome: yup.string().required(),
    preco: yup.string().required(),
    descricao: yup.string().max(70).min(8)
})
export default produtoValidador;