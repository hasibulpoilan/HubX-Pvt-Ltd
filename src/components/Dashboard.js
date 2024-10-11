import React, { useState } from 'react';
import Modal from 'react-modal';
import { Pie, Line } from 'react-chartjs-2';
import { FaUserPlus, FaClock, FaDollarSign } from 'react-icons/fa'; 
import 'chart.js/auto';
import './Dashboard.css';

Modal.setAppElement('#root');

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [numInvites, setNumInvites] = useState(1);
  const [eventDuration, setEventDuration] = useState(0);
  const [price, setPrice] = useState(1);
  const [otherCostPercentage, setOtherCostPercentage] = useState(20);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const calculatePrice = () => {
    const calculatedPrice = numInvites * eventDuration * 10;
    setPrice(calculatedPrice);
  };

  const handleNumInvitesChange = (e) => {
    setNumInvites(Number(e.target.value));
    calculatePrice();
  };

  const handleEventDurationChange = (e) => {
    setEventDuration(Number(e.target.value));
    calculatePrice();
  };

  const handleOtherCostPercentageChange = (e) => {
    setOtherCostPercentage(Number(e.target.value));
  };

  const pieData = {
    labels: ['Total Cost', 'Other Costs'],
    datasets: [
      {
        data: [price, (price * otherCostPercentage) / 100],
        backgroundColor: ['#3498db', '#2ecc71'],
        hoverBackgroundColor: ['#2980b9', '#27ae60'],
      },
    ],
  };

  const lineData = {
    labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
    datasets: [
      {
        label: 'Number of Invites',
        data: [3, 5, 2, 8, 6, 7, 10],
        fill: false,
        borderColor: '#42A5F5',
        tension: 0.4,
      },
    ],
  };

  return (
    <div>
      <header>
        <h1>HubX Pvt Ltd</h1>
      </header>
      <h1>Dashboard</h1>
      <button className="invite-button" onClick={openModal}>
        <FaUserPlus /> Invite
      </button>

      <div className="chart-container">
        <Line data={lineData} />
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Invite Form"
        style={{
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
          },
        }}
      >
        <div className="modal-content">
          <h2><FaUserPlus /> Invite to Event</h2>
          <form>
            <div>
              <label><FaUserPlus /> Number of Invites:</label>
              <input
                type="number"
                value={numInvites}
                onChange={handleNumInvitesChange}
                min="1"
              />
            </div>
            <div style={{ marginTop: '10px' }}>
              <label><FaClock /> Duration of Event (hours):</label>
              <input
                type="number"
                value={eventDuration}
                onChange={handleEventDurationChange}
                min="1"
              />
            </div>
            <div style={{ marginTop: '10px' }}>
              <label><FaDollarSign /> Costs Percentage (%):</label>
              <input
                type="number"
                value={otherCostPercentage}
                onChange={handleOtherCostPercentageChange}
                min="0"
                max="100"
                placeholder="Enter percentage to show progress"
              />
            </div>
            <div style={{ marginTop: '20px' }}>
              <label>Total Price:</label>
              <span style={{ marginLeft: '10px' }}>${price}</span>
            </div>
            <div style={{ marginTop: '20px' }}>
              <Pie data={pieData} />
            </div>
            <div style={{ marginTop: '20px' }}>
              <button type="button" onClick={closeModal}>
                Close
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default Dashboard;
