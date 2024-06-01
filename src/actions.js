import { HttpError } from 'wasp/server'

export const depositMoney = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  const updatedUser = await context.entities.User.update({
    where: { id: context.user.id },
    data: {
      balance: { increment: args.amount },
      transactions: {
        create: {
          amount: args.amount,
          type: 'deposit',
          status: 'approved',
          userId: context.user.id
        }
      }
    },
    include: { transactions: true }
  });

  return updatedUser;
}

export const requestWithdrawal = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  const user = await context.entities.User.findUnique({
    where: { id: context.user.id }
  });

  if (user.balance < args.amount) { throw new HttpError(400, 'Insufficient balance') };

  const newTransaction = await context.entities.Transaction.create({
    data: {
      amount: args.amount,
      type: 'withdrawal',
      status: 'pending',
      userId: context.user.id
    }
  });

  await context.entities.User.update({
    where: { id: context.user.id },
    data: { balance: { decrement: args.amount } }
  });

  return context.entities.User.findUnique({
    where: { id: context.user.id }
  });
}

export const playSlot = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  const user = await context.entities.User.findUnique({
    where: { id: context.user.id }
  });

  if (user.balance < args.betAmount) { throw new HttpError(400, 'Insufficient balance') };

  const newBalance = user.balance - args.betAmount;
  const result = simulateSlotGame();

  const updatedUser = await context.entities.User.update({
    where: { id: context.user.id },
    data: { balance: newBalance }
  });

  return { result, newBalance };
}