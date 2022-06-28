import './App.css';
import { useState } from 'react';
import config from './config'
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import MyPaypalButton from './components/MyPaypalButton';
import { InputNumber, Select } from 'antd'

const { Option } = Select;

function App() {
  const [currency, setCurrency] = useState("USD");
  const [amount, setAmount] = useState(1)

  const onAmountChange = (amount) => {
    setAmount(amount)
  }

  const onCurrencyChange = (currency) => {
    setCurrency(currency)
  }

  return (
    <div className='gradient-bg w-screen min-h-screen flex justify-center items-center'>
      <div className='p-4 rounded-xl w-1/2 bg-white my-2 shadow-xl'>
        <div className='text-3xl'>Paypal payment</div>
        <hr className='my-2' />
        <div>
          <div className='text-2xl my-2'>Amount</div>
          <InputNumber
            decimalSeparator='.'
            min={0.01}
            step={0.01}
            addonAfter={currency}
            value={amount}
            onChange={onAmountChange}
            style={{ width: '100%' }} />
          <div className='text-2xl my-2'>Currency</div>
          <Select defaultValue="USD" style={{ width: "100%" }} onChange={onCurrencyChange} value={currency}>
            <Option value="USD">United State dollar</Option>
            <Option value="CAD">Canadian dollar</Option>
            <Option value="AUD">Australian dollar</Option>
          </Select>
        </div>
        <div className='mt-5 h-full w-full justify-center items-center flex'>
          <PayPalScriptProvider options={{ "client-id": config.PAYPAL_CLIENT_ID }}>
            <MyPaypalButton
              currency={currency}
              amount={amount}
            />
          </PayPalScriptProvider>
        </div>
      </div>
    </div>
  );
}

export default App;
