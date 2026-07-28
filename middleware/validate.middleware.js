export const validate = (schema) => {
  return (req, res, next) => {
    try {
      console.log("Inside validation");
      schema.parse({ body: req.body, params: req.params, query: req.query });

      next();
    } catch (error) {
      console.log(error.issues);
      return res.status(400).json({
        success: false,
        message: "Validation Failed",
        errors: error.issues.map((err) => ({
          field: err.path.join("."),
          message: err.message,
        })),
      });
    }
  };
};
