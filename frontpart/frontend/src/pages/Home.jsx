import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col items-center justify-center bg-gray-50 pt-16">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-400 rounded-full blur-[150px] opacity-20 animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-400 rounded-full blur-[150px] opacity-20 animate-pulse delay-1000" />
      </div>

      <div className="container mx-auto px-6 z-10 flex flex-col md:flex-row items-center gap-12">
        {/* Text Content */}
        <div className="flex-1 text-center md:text-left animate-slide-up">
          <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-blue-100 text-blue-700 font-semibold text-sm tracking-wide uppercase shadow-sm">
            AI-Powered Accessibility
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 leading-tight mb-6">
            Breaking Silence <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Building Bridges
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-2xl mx-auto md:mx-0">
            Translate sign language into text instantly using our advanced AI technology.
            Seamless conversion for effortless communication.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Link
              to="/sign"
              className="px-8 py-4 rounded-xl bg-blue-600 text-white font-bold text-lg shadow-lg hover:bg-blue-700 hover:shadow-blue-500/30 transition-all hover:-translate-y-1 block"
            >
              Start Detection
            </Link>
            <Link
              to="/features"
              className="px-8 py-4 rounded-xl bg-white text-gray-700 font-bold text-lg shadow-md border border-gray-100 hover:bg-gray-50 hover:shadow-lg transition-all hover:-translate-y-1 block"
            >
              Learn More
            </Link>
          </div>
        </div>

        {/* Hero Image */}
        <div className="flex-1 w-full max-w-lg md:max-w-xl animate-fade-in delay-200">
          <div className="relative rounded-3xl overflow-hidden glass-card p-2 transform rotate-2 hover:rotate-0 transition-all duration-500">
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="/images/sign.png"
                alt="AI Sign Language Detection"
                className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
