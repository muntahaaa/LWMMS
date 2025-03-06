import React from "react";
import { useNavigate } from "react-router-dom";
import { FaMapMarkerAlt, FaCalendarAlt, FaSearch, FaArrowRight } from "react-icons/fa";

const HomePage = () => {
  const navigate = useNavigate();

  const navigateToExhibits = () => navigate("/exhibits");
  const navigateToAboutUs = () => navigate("/about");
  const navigateToTickets = () => navigate("/tickets");

  return (
    <div className="min-h-screen bg-stone-100 text-stone-800">
      {/* Hero Section with Parallax Effect */}
      <section className="relative h-screen overflow-hidden">
        <div 
          className="absolute inset-0 bg-fixed bg-center bg-cover transform scale-105"
          style={{ 
            backgroundImage: 'url("/images/bg1.jpg")', 
            filter: 'grayscale(30%)',
            transformOrigin: 'center center',
          }}
        ></div>
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="container mx-auto px-6 relative z-10 h-full flex flex-col justify-center items-center text-center">
          <h1 className="text-6xl md:text-8xl font-bold mb-8 text-white tracking-tight">
            Liberation War Museum
          </h1>
          <p className="text-xl md:text-2xl mb-10 text-gray-200 max-w-3xl">
            Preserving the memory of sacrifice, courage, and the journey to freedom
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={navigateToExhibits}
              className="bg-stone-100 hover:bg-white text-stone-800 px-8 py-4 rounded-md text-lg font-medium transition-all duration-300 flex items-center justify-center group"
            >
              Explore Exhibits
              <FaArrowRight className="ml-2 transform group-hover:translate-x-1 transition-transform duration-300" />
            </button>
            <button
              onClick={navigateToTickets}
              className="border-2 border-stone-100 text-stone-100 hover:bg-stone-100 hover:text-stone-800 px-8 py-4 rounded-md text-lg font-medium transition-all duration-300"
            >
              Get Tickets
            </button>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-stone-100 to-transparent"></div>
      </section>

      {/* Current Exhibitions Section */}
      <section className="py-20 px-6 bg-stone-100">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-baseline mb-12">
            <h2 className="text-4xl font-bold text-stone-800">
              Featured Exhibitions
            </h2>
            <button
              onClick={navigateToExhibits}
              className="text-stone-600 hover:text-stone-800 font-medium flex items-center group mt-4 md:mt-0"
            >
              View All Exhibitions 
              <FaArrowRight className="ml-2 transform group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group">
              <div className="relative overflow-hidden rounded-lg aspect-[4/3]">
                <img 
                  src="/images/bg6.jpg" 
                  alt="War Photography Exhibition" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
                  <span className="text-xs font-semibold text-stone-300">UNTIL AUGUST 30, 2025</span>
                </div>
              </div>
              <h3 className="text-xl font-semibold mt-4 group-hover:text-stone-600 transition-colors">War Photography: Documenting Freedom</h3>
              <p className="text-stone-600 mt-2">Original photographs documenting the struggle and triumph of the Liberation War.</p>
            </div>
            
            <div className="group">
              <div className="relative overflow-hidden rounded-lg aspect-[4/3]">
                <img 
                  src="/images/mukti-bahini-real-heroes.avif" 
                  alt="Heroes of Liberation" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
                  <span className="text-xs font-semibold text-stone-300">PERMANENT EXHIBITION</span>
                </div>
              </div>
              <h3 className="text-xl font-semibold mt-4 group-hover:text-stone-600 transition-colors">Heroes of Liberation</h3>
              <p className="text-stone-600 mt-2">Stories and artifacts highlighting the courage of freedom fighters who shaped our nation.</p>
            </div>
            
            <div className="group">
              <div className="relative overflow-hidden rounded-lg aspect-[4/3]">
                <img 
                  src="/images/independence.jpg" 
                  alt="Memorial Artifacts" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
                  <span className="text-xs font-semibold text-stone-300">NEW EXHIBITION</span>
                </div>
              </div>
              <h3 className="text-xl font-semibold mt-4 group-hover:text-stone-600 transition-colors">Artifacts of Independence</h3>
              <p className="text-stone-600 mt-2">Historical objects and documents that tell the story of our nation's birth.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Visit Information Section */}
      <section className="py-20 px-6 bg-stone-200">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-stone-800 text-center">
            Plan Your Visit
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
              <FaMapMarkerAlt className="text-3xl mb-4 text-stone-600" />
              <h3 className="text-xl font-semibold mb-4 text-stone-800">
                Location
              </h3>
              <p className="text-stone-600">
                Liberation War Museum<br />
                Plot F-11/A & F-11/B, Agargaon<br />
                Civic Center, Sher-e-Bangla Nagar<br />
                Dhaka-1207
              </p>
              <a href="#" className="mt-4 inline-block text-stone-800 font-medium hover:underline">
                Get Directions
              </a>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
              <FaCalendarAlt className="text-3xl mb-4 text-stone-600" />
              <h3 className="text-xl font-semibold mb-4 text-stone-800">
                Hours
              </h3>
              <div className="text-stone-600">
                <div className="flex justify-between py-1 border-b border-stone-100">
                  <span>Sunday - Thursday</span>
                  <span>10:00 - 17:00</span>
                </div>
                <div className="flex justify-between py-1 border-b border-stone-100">
                  <span>Friday - Saturday</span>
                  <span>10:00 - 18:00</span>
                </div>
                <div className="flex justify-between py-1 text-red-600">
                  <span>Closed</span>
                  <span>National Holidays</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
              <FaSearch className="text-3xl mb-4 text-stone-600" />
              <h3 className="text-xl font-semibold mb-4 text-stone-800">
                Explore Museum
              </h3>
              <p className="text-stone-600 mb-4">
                Enhance your experience with our expert guides who provide deep insights into our nation's history.
              </p>
              <button
                onClick={navigateToTickets}
                className="mt-2 bg-stone-800 hover:bg-stone-900 text-white font-medium px-6 py-2 rounded-md transition-colors duration-300"
              >
                Book A Visit
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section with Image */}
      <section className="py-20 px-6 bg-white">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <img 
                src="/images/museum2.jpg" 
                alt="Museum Building" 
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
            <div className="lg:w-1/2">
              <h2 className="text-4xl font-bold mb-6 text-stone-800">
                About The Museum
              </h2>
              <p className="text-lg text-stone-600 mb-6">
                The Liberation War Museum stands as a guardian of our national memory, preserving the stories, artifacts, and spirit of the 1971 Liberation War. Since its founding, we have been dedicated to educating future generations about the sacrifices made for our freedom.
              </p>
              <p className="text-lg text-stone-600 mb-8">
                Our collection includes rare photographs, documents, personal belongings of freedom fighters, and items that bear witness to both the struggles and triumphs of our journey to independence.
              </p>
              <button
                onClick={navigateToAboutUs}
                className="inline-flex items-center group text-stone-800 font-medium hover:text-stone-600 transition-colors duration-300"
              >
                Learn more about our mission and history
                <FaArrowRight className="ml-2 transform group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 px-6 bg-stone-800 text-white">
        <div className="container mx-auto text-center max-w-2xl">
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="mb-8 text-stone-300">
            Subscribe to our newsletter for updates on new exhibitions, events, and educational programs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="flex-grow px-4 py-3 rounded-md text-stone-800 focus:outline-none focus:ring-2 focus:ring-stone-500"
            />
            <button className="bg-stone-100 hover:bg-white text-stone-800 px-6 py-3 rounded-md font-medium transition-colors duration-300">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;