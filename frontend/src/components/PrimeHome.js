import { FaTractor, FaSeedling, FaArrowRight, FaCheck } from 'react-icons/fa';

const SubscriptionBanner = () => {
  return (
    <div className="relative bg-gradient-to-br from-green-900 via-green-800 to-green-700 rounded-xl overflow-hidden shadow-2xl border border-green-600/20">
      {/* Subtle grid texture */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/grid-me.png')] opacity-10 mix-blend-overlay"></div>
      
      {/* Content */}
      <div className="relative z-10 px-8 py-12 md:px-12 lg:px-16">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
          
          {/* Left content */}
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center bg-green-800/50 backdrop-blur px-4 py-2 rounded-full border border-green-500/30 mb-6">
              <FaSeedling className="text-yellow-400 text-lg mr-2" />
              <span className="text-yellow-400 font-medium tracking-wider text-sm uppercase">AgroPrime Professional</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-yellow-300">Agricultural Intelligence</span><br />
              for Modern Farming
            </h2>
            
            <p className="text-green-100 text-lg mb-8 max-w-2xl">
              Join the <span className="font-medium text-white">professional farming network</span> leveraging data-driven insights to optimize yields and reduce operational costs.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-xl">
              <div className="bg-green-800/40 backdrop-blur-sm p-4 rounded-lg border border-green-600/20">
                <FaCheck className="text-yellow-400 mb-2 text-lg" />
                <p className="text-white font-medium">Precision Analytics</p>
              </div>
              <div className="bg-green-800/40 backdrop-blur-sm p-4 rounded-lg border border-green-600/20">
                <FaCheck className="text-yellow-400 mb-2 text-lg" />
                <p className="text-white font-medium">Expert Advisory</p>
              </div>
              <div className="bg-green-800/40 backdrop-blur-sm p-4 rounded-lg border border-green-600/20">
                <FaCheck className="text-yellow-400 mb-2 text-lg" />
                <p className="text-white font-medium">Market Intelligence</p>
              </div>
            </div>
          </div>
          
          {/* Right CTA */}
          <div className="w-full lg:w-auto">
            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-8 text-center shadow-xl w-full max-w-xs">
              <p className="text-green-200 mb-1 text-sm uppercase tracking-wider">Most Popular</p>
              <h3 className="text-2xl font-bold text-white mb-4">Professional Plan</h3>
              
              <div className="mb-6">
                <p className="text-green-200 text-sm">Starting at</p>
                <p className="text-yellow-400 text-5xl font-bold">$24.99</p>
                <p className="text-green-200">per month</p>
              </div>
              
              <a 
                href="/prime" 
                className="block w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-400 hover:to-yellow-500 text-green-900 font-bold py-3 px-6 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg mb-4"
              >
                <span className="flex items-center justify-center gap-2">
                  Start Free Trial <FaArrowRight />
                </span>
              </a>
              
              <p className="text-green-200/80 text-xs">
                14-day trial • No credit card required
              </p>
            </div>
            
            <div className="mt-4 text-center">
              <p className="text-green-200/80 text-sm">
                Enterprise solutions available
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute bottom-6 right-6 opacity-10">
        <FaTractor className="text-white text-8xl" />
      </div>
    </div>
  );
};

export default SubscriptionBanner;