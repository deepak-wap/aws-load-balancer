export const useGuards = (guards = []) => async (req, res, next) => {
  try {
    for (const guardOrInstance of guards) {
      let guardInstance;

      // If guardOrInstance is a class (constructor), instantiate it
      if (typeof guardOrInstance === 'function' && guardOrInstance.prototype.canActivate) {
        guardInstance = new guardOrInstance();
      } else {
        // Else assume it's an instance already (e.g., from factory)
        guardInstance = guardOrInstance;
      }

      const canProceed = await guardInstance.canActivate(req);
      if (!canProceed) return res.status(403).json({ message: 'Forbidden' });
    }
    next();
  } catch (err) {
    next(err);
  }
};