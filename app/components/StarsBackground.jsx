export default function StarsBackground() {
  return (
    <div className="stars-container">
      <div className="stars"></div>
      <div className="stars2"></div>
      <div className="stars3"></div>

      <style jsx>{`
        .stars-container {
          position: fixed;
          inset: 0;
          z-index: 0;
          background: black;
          overflow: hidden;
        }

        .stars,
        .stars2,
        .stars3 {
          position: absolute;
          inset: 0;
          background-repeat: repeat;
          animation: moveStars linear infinite;
        }

        .stars {
          background-image: radial-gradient(1px 1px at 20px 30px, #fff, transparent),
                            radial-gradient(1px 1px at 40px 70px, #fff, transparent),
                            radial-gradient(1px 1px at 90px 40px, #fff, transparent);
          animation-duration: 120s;
          opacity: 0.4;
        }

        .stars2 {
          background-image: radial-gradient(1px 1px at 10px 90px, #aaa, transparent),
                            radial-gradient(1px 1px at 60px 20px, #aaa, transparent),
                            radial-gradient(1px 1px at 80px 80px, #aaa, transparent);
          animation-duration: 180s;
          opacity: 0.25;
        }

        .stars3 {
          background-image: radial-gradient(2px 2px at 50px 50px, #777, transparent),
                            radial-gradient(2px 2px at 70px 10px, #777, transparent);
          animation-duration: 240s;
          opacity: 0.15;
        }

        @keyframes moveStars {
          from {
            transform: translateY(0);
          }
          to {
            transform: translateY(-2000px);
          }
        }
      `}</style>
    </div>
  );
}