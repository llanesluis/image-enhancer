"use server";

import { redirect } from "next/navigation";
import {
  CheckoutTransactionParams,
  CreateTransactionParams,
} from "./../../types/transaction.d";
import Stripe from "stripe";
import { handleError } from "../utils";
import { connectToDatabase } from "../database/mongoose";
import Transaction, {
  ITransaction,
} from "../database/models/transaction.model";
import User from "../database/models/user.model";
import { updateCreditBalance } from "./user.actions";

export async function checkoutCredits(transaction: CheckoutTransactionParams) {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw Error('La variable de entorno "STRIPE_SECRET_KEY" no está definida');
  }
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

  const amountInCents = Number(transaction.amount) * 100; // Stripe trabaja con centavos.

  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: "usd",
          unit_amount: amountInCents,
          product_data: {
            name: transaction.plan,
          },
        },
        quantity: 1,
      },
    ],
    metadata: {
      plan: transaction.plan,
      credits: transaction.credits,
      buyerId: transaction.buyerId,
    },
    mode: "payment",
    success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/profile`,
    cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/`,
  });

  redirect(session.url!);
}

export async function createTransaction(transaction: CreateTransactionParams) {
  try {
    await connectToDatabase();

    //Crear la nueva transaccion con la buyerId
    const newTransaction: ITransaction = await Transaction.create({
      ...transaction,
      buyer: transaction.buyerId,
    });

    if (!newTransaction) throw Error("No se pudo crear la transacción");

    await updateCreditBalance(transaction.buyerId, transaction.credits);

    return JSON.parse(JSON.stringify(newTransaction));
  } catch (error) {
    handleError(error);
  }
}
