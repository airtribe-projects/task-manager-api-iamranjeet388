module.exports = (req, res, next) => {
    const { title, description, completed } = req.body;
  
    if (!title || !description) {
      return res.status(400).json({
        message: 'Title and description are required'
      });
    }
  
    if (typeof completed !== 'boolean') {
      return res.status(400).json({
        message: 'Completed must be boolean'
      });
    }
  
    next();
  };