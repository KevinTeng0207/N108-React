function collectform(form) {
  let data = {}
  if(!form) return data;
  for (var i = 0; i < form.elements.length; i++) {
    let { name, value, type, checked } = form.elements[i]
    if (name) {
      switch (type) {
        case "radio":
          if (checked) data[name] = value
          break
        case "checkbox":
          if (checked) data[name] = data[name] ? `${data[name]},${value}` : `${value}`
          break
        default:
          data[name] = value
      }
    }
  }
  return data
}

export default collectform
