"use client";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import {
  CreateOrderData,
  CreateOrderActions,
  OnApproveActions,
  OnApproveData,
} from "@paypal/paypal-js";
import { paypalCheckPayment, setTransactionIdInOrder } from "@/actions";

export function PayPalButton({ id, amount }: { id: string; amount: number }) {
  const [{ isPending }] = usePayPalScriptReducer();

  const roundedAmount = Math.round(amount * 100) / 100;

  if (isPending) {
    return (
      <div className="w-full flex flex-col gap-4 pb-6 transition-all">
        <div className="animate-pulse bg-slate-300 h-12 rounded-md" />
        <div className="animate-pulse bg-slate-300 h-12 rounded-md" />
      </div>
    );
  }

  async function createOrder(
    data: CreateOrderData,
    actions: CreateOrderActions
  ): Promise<string> {
    // id de transaction de paypal
    const transactionId = await actions.order.create({
      intent: "CAPTURE",
      purchase_units: [
        {
          invoice_id: id,
          amount: {
            currency_code: "USD",
            value: String(roundedAmount),
          },
        },
      ],
    });

    await setTransactionIdInOrder(id, transactionId);

    return transactionId;
  }

  async function onApprove(data: OnApproveData, actions: OnApproveActions) {
    const details = await actions.order?.capture();

    if (!details) return;

    await paypalCheckPayment(details.id);
  }

  return (
    <div className=" relative z-0">
      <PayPalButtons createOrder={createOrder} onApprove={onApprove} />
    </div>
  );
}
