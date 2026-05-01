import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaChair, FaArrowLeft } from 'react-icons/fa';
import { showtimes, movies, theaters } from '../data/mockData';

const SeatSelection = () => {
  const { showtimeId } = useParams();
  const navigate = useNavigate();
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]);
  
  const showtime = showtimes.find(st => st.id === parseInt(showtimeId));
  const movie = movies.find(m => m.id === showtime?.movieId);
  const theater = theaters.find(t => t.id === showtime?.theaterId);

  useEffect(() => {
    setBookedSeats(['A1', 'A2', 'C5', 'D8', 'G3']);
  }, []);

  const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  const seatsPerRow = 10;
  const vipRows = ['E', 'F'];

  const handleSeatClick = (seatId) => {
    if (bookedSeats.includes(seatId)) return;
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter(s => s !== seatId));
    } else {
      setSelectedSeats([...selectedSeats, seatId]);
    }
  };

  const getSeatPrice = (row) => {
    return vipRows.includes(row) ? showtime?.vipPrice : showtime?.price;
  };

  const calculateTotal = () => {
    return selectedSeats.reduce((total, seat) => {
      const row = seat.charAt(0);
      return total + getSeatPrice(row);
    }, 0);
  };

  const handleProceed = () => {
    if (selectedSeats.length === 0) {
      alert('Please select at least one seat');
      return;
    }
    navigate('/checkout', { 
      state: { 
        showtime, 
        movie, 
        theater, 
        selectedSeats, 
        totalAmount: calculateTotal()
      } 
    });
  };

  if (!showtime || !movie) {
    return (
      <div className="container-custom py-12 text-center">
        <h2 className="text-2xl font-bold">Showtime not found</h2>
        <button onClick={() => navigate('/movies')} className="btn-primary mt-4">Back to Movies</button>
      </div>
    );
  }

  return (
    <div className="py-8">
      <div className="container-custom">
        <button 
          onClick={() => navigate(-1)} 
          className="mb-6 flex items-center space-x-2 text-gray-400 hover:text-cinema-red transition"
        >
          <FaArrowLeft /> <span>Back</span>
        </button>
        
        <div className="bg-gray-800/50 rounded-xl p-6 mb-8">
          <h1 className="text-2xl font-bold mb-2">{movie.title}</h1>
          <p className="text-gray-400">
            {theater?.name} | Screen {showtime.screen} | {showtime.date} | {showtime.startTime}
          </p>
        </div>

        {/* Cinema Screen */}
        <div className="text-center mb-12">
          <div className="cinema-screen"></div>
          <p className="text-sm text-gray-400 mt-2">Screen</p>
        </div>

        {/* Seat Legend */}
        <div className="flex justify-center gap-8 mb-8">
          <div className="flex items-center space-x-2">
            <div className="seat-available w-8 h-8 bg-green-600 rounded-t-lg"></div>
            <span className="text-sm">Available</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="seat-selected w-8 h-8 bg-yellow-500 rounded-t-lg"></div>
            <span className="text-sm">Selected</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="seat-booked w-8 h-8 bg-red-600 rounded-t-lg opacity-60"></div>
            <span className="text-sm">Booked</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="seat-vip w-8 h-8 bg-purple-600 rounded-t-lg"></div>
            <span className="text-sm">VIP</span>
          </div>
        </div>

        {/* Seat Grid */}
        <div className="overflow-x-auto mb-8">
          <div className="inline-block min-w-full">
            {rows.map(row => (
              <div key={row} className="flex justify-center mb-2">
                <div className="w-8 text-center font-bold text-gray-400">{row}</div>
                {[...Array(seatsPerRow)].map((_, index) => {
                  const seatNumber = index + 1;
                  const seatId = `${row}${seatNumber}`;
                  const isSelected = selectedSeats.includes(seatId);
                  const isBooked = bookedSeats.includes(seatId);
                  const isVip = vipRows.includes(row);
                  
                  let seatClass = 'seat-available w-8 h-8 m-1 rounded-t-lg cursor-pointer transition hover:scale-110';
                  if (isBooked) seatClass = 'seat-booked w-8 h-8 m-1 bg-red-600 rounded-t-lg cursor-not-allowed opacity-60';
                  else if (isSelected) seatClass = isVip ? 'seat-vip-selected w-8 h-8 m-1 bg-pink-500 rounded-t-lg cursor-pointer' : 'seat-selected w-8 h-8 m-1 bg-yellow-500 rounded-t-lg cursor-pointer';
                  else if (isVip) seatClass = 'seat-vip w-8 h-8 m-1 bg-purple-600 rounded-t-lg cursor-pointer transition hover:scale-110';
                  
                  return (
                    <button
                      key={seatId}
                      className={seatClass}
                      onClick={() => handleSeatClick(seatId)}
                      disabled={isBooked}
                    >
                      <FaChair className="w-full h-full p-1" />
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Booking Summary */}
        <div className="bg-gray-800/50 rounded-xl p-6 sticky bottom-0">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <p className="text-sm text-gray-400">Selected Seats</p>
              <p className="text-xl font-bold">
                {selectedSeats.length === 0 ? 'None' : selectedSeats.join(', ')}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Total Amount</p>
              <p className="text-2xl font-bold text-cinema-red">
                ${calculateTotal().toFixed(2)}
              </p>
            </div>
            <button
              onClick={handleProceed}
              className="btn-primary px-8 py-3 text-lg"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeatSelection;
