import React from 'react';

const companyLogos = [
  { id: 1, name: "Microsoft", logo: "/assets/logos/microsoft.png" },
  { id: 2, name: "Google", logo: "/assets/logos/google.png" },
  { id: 3, name: "Amazon", logo: "/assets/logos/amazon.png" },
  { id: 4, name: "IBM", logo: "/assets/logos/ibm.png" },
  { id: 5, name: "Apple", logo: "/assets/logos/apple.webp" },
];

const allLogos = [...companyLogos, ...companyLogos];

const RecognizedBy = () => {
  return (
    <section className="bg-green-50 w-full overflow-hidden">
      <div className="flex items-center">
        <div className="flex-shrink-0 px-6 md:px-8">
          <h2 className="text-lg md:text-xl font-semibold text-green-brand whitespace-nowrap">
            Recognized By
          </h2>
        </div>

        {/* Scrolling Container */}
        <div className="relative flex-grow">
          <div className="absolute left-0 top-0 h-full w-24 md:w-40 bg-gradient-to-r from-white to-transparent z-10"></div>
          <div className="absolute right-0 top-0 h-full w-24 md:w-40 bg-gradient-to-l from-white to-transparent z-10"></div>

          <div className="overflow-hidden">
            <div className="flex animate-[scroll_35s_linear_infinite] py-2 hover:[animation-play-state:paused] w-max">
              {allLogos.map((company, index) => (
                <div
                  key={`${company.id}-${index}`}
                  className="flex-shrink-0 mx-8 md:mx-12 transition-all duration-300"
                >
                  <img
                    src={company.logo}
                    alt={`${company.name} logo`}
                    className="h-10 md:h-14 w-auto object-contain"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RecognizedBy;