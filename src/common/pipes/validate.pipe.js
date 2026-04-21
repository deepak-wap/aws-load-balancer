export const validate = (schema) => (req, res, next) => {
  const data = {
    ...req.body,
    ...req.query,
    ...req.params
  };

  const { error } = schema.validate(data);

  if (error) {
    const message = error.details[0].message.replace(/['"]/g, '');
    return next({ status: 400, message });
  }

  next();
};

export const validator = (schema, data) => {

  const { error } = schema.validate(data);

  if (error){
    const message = error.details[0].message.replace(/['"]/g, '');
    error.details[0].message = message
    return error
  }

  return false
};