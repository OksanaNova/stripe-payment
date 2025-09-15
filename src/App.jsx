import { useState } from 'react';
import './App.css'
import StripeContainer from './Stripe/StripeContainer';
import BERRIES from './assets/berries.jpg'

function App() {

  const [showCheckoutForm, setShowCheckoutForm] = useState(false);

  return (
    <div>
      {showCheckoutForm ? <StripeContainer /> : 
      <div>
        <p>FRUIT SHOP</p>
        <p>$9.99</p>
        <img src={BERRIES} width="500px"/>
        <div>
          <button onClick={() => setShowCheckoutForm(true)}>Buy</button>
        </div>
      </div>}
    </div>
  )
}

export default App
