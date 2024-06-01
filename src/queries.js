import { HttpError } from 'wasp/server'

export const getUser = async (args, context) => {
  if (!context.user) { throw new HttpError(401) }

  return context.entities.User.findUnique({
    where: { id: context.user.id },
    include: { transactions: true, slots: true }
  });
}

export const getTransactions = async (args, context) => {
  if (!context.user) { throw new HttpError(401) }

  return context.entities.Transaction.findMany({
    where: { userId: context.user.id }
  });
}

export const getSlots = async (args, context) => {
  if (!context.user) { throw new HttpError(401) }

  return context.entities.Slot.findMany({
    where: { userId: context.user.id }
  });
}