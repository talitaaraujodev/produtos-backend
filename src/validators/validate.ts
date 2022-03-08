export default function (validator: any, data: any) {
    return validator.validate(data, { abortEarly: false })
      .then((resp: any) => {
        return { item: resp }
      }).catch((err: any) => {
        const errors: any = {}
        err.inner.forEach((item: any) => {
          errors[item.params.path] = item.message
        })
        return { errors: errors }
      })
  }