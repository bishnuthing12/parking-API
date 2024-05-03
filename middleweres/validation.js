function validate(validateSchema) {
  return (req, res, next) => {
    const valid = validateSchema(req.body);
    if (!valid) {
      const errors = validateSchema.errors;
      res.status(400).json(errors);
    }
    next();
  };
}

module.exports = validate;
