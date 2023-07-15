function paginationMiddleware(model) {
  return async (req, res, next) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 4;

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const docsLength = await model.countDocuments().exec();

    let profiles = {};

    if (endIndex < docsLength) {
      profiles.next = {
        page: page + 1,
        limit: limit,
      };
    }

    if (startIndex > 0) {
      profiles.previous = {
        page: page - 1,
        limit: limit,
      };
    }
    try {
      const usersInfo = await model
        .find()
        .sort({ _id: 1 })
        .limit(limit)
        .skip(startIndex)
        .exec();
      profiles.users = usersInfo.map((e) => {
        const { nickName, fullName } = e;
        return { nickName, fullName };
      });
      res.paginatedResults = profiles;
      next();
    } catch (err) {
      res.json({ message: err.message });
    }
  };
}

module.exports = paginationMiddleware;
