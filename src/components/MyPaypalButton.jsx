import React, { useEffect } from "react";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";

const MyPaypalButton = (props) => {
  const amount = props.amount || 1;
  const currency = props.currency || "USD";
  const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

  const createOrder = (data, actions) => {
    const orderInformation = {
      purchase_units: [
        {
          amount: {
            value: amount,
          },
        },
      ],
    };
    return actions.order.create(orderInformation);
  };

  const onApprove = (data, actions) => {
    return actions.order.capture().then((details) => {
      const name = details.payer.name.given_name;
      alert(`Transaction completed by ${name}`);
    });
  };

  const onCancel = (data, actions) => {
    alert("User has cancel the transaction");
  };

  useEffect(() => {
    dispatch({
      type: "resetOptions",
      value: {
        ...options,
        currency: currency,
      },
    });
  }, [currency]);

  return (
    <>
      {isPending ? (
        <div>Hello</div>
      ) : (
        <PayPalButtons
          createOrder={createOrder}
          onApprove={onApprove}
          onCancel={onCancel}
        />
      )}
    </>
  );
};

export default MyPaypalButton;
