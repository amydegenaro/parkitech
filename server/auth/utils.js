module.exports = {
  adminGate: (req, res, next) => {
    if (req.user && req.user.isAdmin) {
      next()
    } else {
      res.sendStatus(401)
    }
  },
  idMatchGate: (req, res, next) => {
    if (req.user && req.user.id === +req.params.userId) {
      next()
    } else {
      res.sendStatus(401)
    }
  },
  orgMatchGate: (req, res, next) => {
    if (req.user && req.user.organizationId === +req.params.orgId) {
      next()
    } else {
      res.sendStatus(401)
    }
  }
}
