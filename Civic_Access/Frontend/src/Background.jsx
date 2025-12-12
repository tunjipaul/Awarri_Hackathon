function Background() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Green gradient background with high transparency */}
      <div className="absolute inset-0 bg-gradient-to-r from-green-50/5 via-white/3 to-green-50/5"></div>

      {/* Scrolling text container */}
      <div className="absolute inset-0 flex items-center justify-start overflow-hidden">
        {/* First scroll line */}
        <div className="animate-scroll whitespace-nowrap">
          <span className="text-6xl font-bold text-green-900/10 mr-8">
            Awarri Hackathon by Team Sabilaw •
          </span>
          <span className="text-6xl font-bold text-green-900/10 mr-8">
            Awarri Hackathon by Team Sabilaw •
          </span>
          <span className="text-6xl font-bold text-green-900/10 mr-8">
            Awarri Hackathon by Team Sabilaw •
          </span>
        </div>

        {/* Second scroll line - offset */}
        {/* <div className="animate-scroll whitespace-nowrap absolute" style={{ animationDelay: '-10s' }}>
          <span className="text-6xl font-bold text-green-900/10 mr-8">
            Awarri Hackathon by Team Sabilaw •
          </span>
          <span className="text-6xl font-bold text-green-900/10 mr-8">
            Awarri Hackathon by Team Sabilaw •
          </span>
          <span className="text-6xl font-bold text-green-900/10 mr-8">
            Awarri Hackathon by Team Sabilaw •
          </span>
        </div> */}
      </div>

      {/* Add custom animation */}
      <style>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-50% - 0px));
          }
        }
        .animate-scroll {
          animation: scroll 20s linear infinite;
        }
      `}</style>
    </div>
  );
}

export default Background;