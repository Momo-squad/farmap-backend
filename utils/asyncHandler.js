export default function asyncHandler(fn) {
    return async function(req, res) {
      try {
        await fn(req, res);
      } catch (error) {
        console.error(error);
        res.status(500).send({ error: error.message , success: false });
      }
    }
  }
  