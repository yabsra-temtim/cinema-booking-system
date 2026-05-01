 import React, { useState, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { FaCreditCard, FaPaypal, FaMoneyBillWave, FaTicketAlt } from 'react-icons/fa';
import toast from 'react-hot-toast';

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { showtime, movie, theater, selectedSeats, totalAmount } = location.state || {};
  
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [processing, setProcessing] = useState(false);
  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: ''
  });

  if (!showtime || !movie) {
    return (
      <div className="container-custom py-12 text-center">
        <h2 className="text-2xl font-bold">No booking information found</h2>
        <button onClick={() => navigate('/movies')} className="btn-primary mt-4">Back to Movies</button>
      </div>
    );
  }

  const handlePayment = async () => {
    setProcessing(true);
    
    // Mock payment processing
    setTimeout(() => {
      setProcessing(false);
      
      // Create booking object
      const booking = {
        id: Date.now(),
        movie: movie.title,
        theater: theater.name,
        screen: showtime.screen,
        date: showtime.date,
        time: showtime.startTime,
        seats: selectedSeats,
        totalAmount: totalAmount,
        bookingDate: new Date().toISOString(),
        qrCode: `TICKET-${Date.now()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`
      };
      
      // Save to localStorage
      const existingBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
      existingBookings.push(booking);
      localStorage.setItem('bookings', JSON.stringify(existingBookings));
      
      toast.success('Booking successful!');
      navigate('/my-bookings', { state: { newBooking: booking } });
    }, 2000);
  };

  return (
    <div className="py-12">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Booking Summary */}
          <div className="lg:col-span-2">
            <div className="bg-gray-800/50 rounded-xl p-6 mb-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center">
                <FaTicketAlt className="mr-2 text-cinema-red" />
                Booking Summary
              </h2>
              
              <div className="space-y-4">
                <div className="flex justify-between pb-3 border-b border-gray-700">
                  <span className="text-gray-400">Movie</span>
                  <span className="font-semibold">{movie.title}</span>
                </div>
                <div className="flex justify-between pb-3 border-b border-gray-700">
                  <span className="text-gray-400">Theater</span>
                  <span className="font-semibold">{theater?.name}</span>
                </div>
                <div className="flex justify-between pb-3 border-b border-gray-700">
                  <span className="text-gray-400">Screen</span>
                  <span className="font-semibold">{showtime.screen}</span>
                </div>
                <div className="flex justify-between pb-3 border-b border-gray-700">
                  <span className="text-gray-400">Date & Time</span>
                  <span className="font-semibold">{showtime.date} at {showtime.startTime}</span>
                </div>
                <div className="flex justify-between pb-3 border-b border-gray-700">
                  <span className="text-gray-400">Seats</span>
                  <span className="font-semibold">{selectedSeats?.join(', ')}</span>
                </div>
                <div className="flex justify-between pt-2">
                  <span className="text-xl font-bold">Total</span>
                  <span className="text-2xl font-bold text-cinema-red">${totalAmount?.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Section */}
          <div className="lg:col-span-1">
            <div className="bg-gray-800/50 rounded-xl p-6">
              <h2 className="text-2xl font-bold mb-4">Payment Method</h2>
              
              {/* Payment Options */}
              <div className="space-y-3 mb-6">
                <label className="flex items-center p-3 bg-gray-700/50 rounded-lg cursor-pointer hover:bg-gray-700 transition">
                  <input
                    type="radio"
                    name="payment"
                    value="card"
                    checked={paymentMethod === 'card'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="mr-3"
                  />
                  <FaCreditCard className="mr-2" />
                  <span>Credit/Debit Card</span>
                </label>
                
                <label className="flex items-center p-3 bg-gray-700/50 rounded-lg cursor-pointer hover:bg-gray-700 transition">
                  <input
                    type="radio"
                    name="payment"
                    value="paypal"
                    checked={paymentMethod === 'paypal'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="mr-3"
                  />
                  <FaPaypal className="mr-2" />
                  <span>PayPal</span>
                </label>
                
                <label className="flex items-center p-3 bg-gray-700/50 rounded-lg cursor-pointer hover:bg-gray-700 transition">
                  <input
                    type="radio"
                    name="payment"
                    value="cash"
                    checked={paymentMethod === 'cash'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="mr-3"
                  />
                  <FaMoneyBillWave className="mr-2" />
                  <span>Cash at Cinema</span>
                </label>
              </div>

              {/* Card Details Form */}
              {paymentMethod === 'card' && (
                <div className="space-y-4 mb-6">
                  <input
                    type="text"
                    placeholder="Card Number"
                    value={cardDetails.number}
                    onChange={(e) => setCardDetails({...cardDetails, number: e.target.value})}
                    className="w-full px-4 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cinema-red"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="MM/YY"
                      value={cardDetails.expiry}
                      onChange={(e) => setCardDetails({...cardDetails, expiry: e.target.value})}
                      className="px-4 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cinema-red"
                    />
                    <input
                      type="password"
                      placeholder="CVV"
                      value={cardDetails.cvv}
                      onChange={(e) => setCardDetails({...cardDetails, cvv: e.target.value})}
                      className="px-4 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cinema-red"
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Cardholder Name"
                    value={cardDetails.name}
                    onChange={(e) => setCardDetails({...cardDetails, name: e.target.value})}
                    className="w-full px-4 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cinema-red"
                  />
                </div>
              )}

              {/* Demo Notice */}
              <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3 mb-6">
                <p className="text-xs text-yellow-500 text-center">
                  🎬 DEMO MODE: No real payment will be processed. Click Pay to complete demo booking.
                </p>
              </div>

              {/* Pay Button */}
              <button
                onClick={handlePayment}
                disabled={processing}
                className="w-full btn-primary py-3 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {processing ? 'Processing...' : `Pay $${totalAmount?.toFixed(2)}`}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
