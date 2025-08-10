import { Link } from 'react-router-dom';
import { Stethoscope, Droplet, HeartPulse } from "lucide-react";

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-emerald-50 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900 transition-colors duration-500">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        
        {/* Lively Background Blobs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 left-1/4 w-72 h-72 bg-rose-300/30 dark:bg-rose-500/10 rounded-full blur-3xl animate-[pulse_6s_ease-in-out_infinite]"></div>
          <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-emerald-300/30 dark:bg-emerald-500/10 rounded-full blur-3xl animate-[pulse_8s_ease-in-out_infinite]"></div>
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-sky-300/20 dark:bg-sky-500/10 rounded-full blur-3xl animate-[pulse_7s_ease-in-out_infinite]"></div>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="mb-6 flex justify-center items-center space-x-2 text-rose-600 dark:text-rose-300 font-medium">
            <HeartPulse className="h-4 w-4" />
            <span>AI Health & Blood Donation</span>
          </div>

          <h1 className="font-heading text-5xl sm:text-6xl font-bold text-slate-900 dark:text-white mb-6 leading-tight">
            Smarter Health Checks,{" "}
            <span className="bg-gradient-to-r from-rose-500 via-emerald-500 to-rose-500 bg-clip-text text-transparent">
              Safer Communities
            </span>
          </h1>

          <p className="font-primary text-lg sm:text-xl text-slate-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            Welcome to AnemoScan — an AI-powered symptom checker, seasonal disease predictor based on blood type, 
            and a blood donation platform to connect donors with those in urgent need.
          </p>

          <div className="flex justify-center space-x-4">
            <Link to="/symptom-check">
              <button className="flex items-center gap-2 bg-gradient-to-r from-rose-600 to-emerald-600 hover:scale-105 hover:shadow-xl text-white px-6 py-3 rounded-lg shadow-lg text-lg transition-all">
                <Stethoscope className="h-5 w-5" />
                Start Symptom Check
              </button>
            </Link>
            <Link to="/donate-blood">
              <button className="flex items-center gap-2 border border-rose-400 text-rose-500 dark:text-rose-300 hover:bg-rose-50 dark:hover:bg-rose-900/20 px-6 py-3 rounded-lg shadow text-lg transition-all hover:scale-105">
                <Droplet className="h-5 w-5" />
                Donate Blood
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
