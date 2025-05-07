
const Loading = () => {
  return (
    <div className="flex  items-center w-full p-8">
      <style>
        {`
          @keyframes wave {
             0% { transform: scaleY(1); background: #D1D5DB; }  /* Neutral Gray */
    25% { transform: scaleY(1.8); background: #9CA3AF; }  /* Medium Gray */
    50% { transform: scaleY(1); background: #E5E7EB; }  /* Light Gray */
    75% { transform: scaleY(0.6); background: #6B7280; }  /* Dark Gray */
    100% { transform: scaleY(1); background: #D1D5DB; }  /* Back to Neutral */
          }

          .wave-bar {
            width: 8px;
            height: 20px;
            margin: 0 4px;
            border-radius: 3px;
            animation: wave 1s ease-in-out infinite;
          }

          .wave-container div:nth-child(1) { animation-delay: 0s; }
          .wave-container div:nth-child(2) { animation-delay: 0.1s; }
          .wave-container div:nth-child(3) { animation-delay: 0.2s; }
          .wave-container div:nth-child(4) { animation-delay: 0.3s; }
          .wave-container div:nth-child(5) { animation-delay: 0.4s; }
          .wave-container div:nth-child(6) { animation-delay: 0.5s; }
          .wave-container div:nth-child(7) { animation-delay: 0.6s; }
          .wave-container div:nth-child(8) { animation-delay: 0.7s; }
          .wave-container div:nth-child(9) { animation-delay: 0.8s; }
          .wave-container div:nth-child(10) { animation-delay: 0.9s; }
          .wave-container div:nth-child(11) { animation-delay: 1.0s; }
          .wave-container div:nth-child(12) { animation-delay: 1.1s; }
        `}
      </style>

      <div className="wave-container flex">
        {[...Array(12)].map((_, i) => (
          <div key={i} className="wave-bar" />
        ))}
      </div>
    </div>
  );
};

export default Loading;
