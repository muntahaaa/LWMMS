import React from "react";

const About = () => {
  return (
    <section className="bg-gray-100 min-h-screen py-10">
      {/** ✅ Hero Section */}
      <div className="relative bg-cover bg-center h-[400px] flex items-center justify-center"
           style={{ backgroundImage: "url('/images/bg8.jpg')" }}>
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <h1 className="relative text-white text-4xl md:text-5xl font-bold text-center">
          About the <span className="text-red-500">Liberation War Museum</span>
        </h1>
      </div>

      {/** ✅ Introduction Section */}
      <div className="container mx-auto px-5 md:px-16 py-10 text-gray-800">
        <h2 className="text-3xl md:text-4xl font-semibold text-green-800 text-center mb-6">
          Preserving the History of Bangladesh’s Independence
        </h2>
        <p className="text-lg md:text-xl leading-relaxed text-center max-w-3xl mx-auto">
          The Liberation War Museum of Bangladesh is a tribute to the valiant struggle of 
          1971 that led to the birth of our nation. Established to **preserve, document, and 
          honor** the sacrifices of the freedom fighters, the museum is a beacon of history, 
          education, and national pride.
        </p>
      </div>

      {/** ✅ Sections on Museum's Importance */}
      <div className="container mx-auto px-5 md:px-16 grid md:grid-cols-2 gap-10">
        
        {/** 🎖️ Legacy Section */}
        <div className="bg-white shadow-lg rounded-lg p-6 border-l-4 border-green-700">
          <h3 className="text-2xl font-semibold text-green-900 mb-3">🎖️ Legacy of 1971</h3>
          <p className="text-lg text-gray-700">
            The Liberation War Museum documents the heroic struggle of the people of Bangladesh 
            in their fight for independence. The exhibits contain **artifacts, photographs, 
            and personal accounts** that narrate the historical journey.
          </p>
        </div>

        {/** 📜 Archives Section */}
        <div className="bg-white shadow-lg rounded-lg p-6 border-l-4 border-red-600">
          <h3 className="text-2xl font-semibold text-red-700 mb-3">📜 Archives & Artifacts</h3>
          <p className="text-lg text-gray-700">
            Our extensive collection includes **rare documents, letters, uniforms, and weapons** 
            used during the war. The museum also hosts **audio-visual materials, documentaries, 
            and first-hand testimonies** from war veterans.
          </p>
        </div>

        {/** 🏛️ Exhibitions Section */}
        <div className="bg-white shadow-lg rounded-lg p-6 border-l-4 border-yellow-500">
          <h3 className="text-2xl font-semibold text-yellow-600 mb-3">🏛️ Permanent Exhibitions</h3>
          <p className="text-lg text-gray-700">
            Visitors can experience **realistic dioramas, interactive displays, and historical 
            reenactments** showcasing the events of 1971. Our museum also features **temporary 
            exhibitions** dedicated to war heroes and global struggles for freedom.
          </p>
        </div>

        {/** 🌍 Global Recognition Section */}
        <div className="bg-white shadow-lg rounded-lg p-6 border-l-4 border-blue-600">
          <h3 className="text-2xl font-semibold text-blue-600 mb-3">🌍 Global Recognition</h3>
          <p className="text-lg text-gray-700">
            The Liberation War Museum is an internationally recognized institution, frequently 
            visited by historians, researchers, and diplomats. We collaborate with global 
            museums and human rights organizations to promote peace and justice.
          </p>
        </div>

      </div>

      {/** ✅ Call-to-Action Section */}
      <div className="container mx-auto text-center py-10">
        <h2 className="text-3xl font-bold text-green-900 mb-4">
          Visit & Experience the History
        </h2>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-6">
          We invite you to walk through the corridors of history and experience the 
          untold stories of our liberation struggle. **Book a visit, attend events, 
          and contribute to preserving our glorious past.**
        </p>
        <a href="/tickets"
           className="bg-red-600 hover:bg-red-700 text-white text-lg font-semibold px-6 py-3 rounded-lg shadow-md transition-transform duration-300 transform hover:scale-105">
          🎟️ Get Tickets
        </a>
      </div>

      {/** ✅ Museum Statistics Section */}
      <div className="container mx-auto px-5 md:px-16 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
          
          <div className="bg-white shadow-lg p-5 rounded-lg">
            <h3 className="text-4xl font-bold text-red-600">500K+</h3>
            <p className="text-lg text-gray-700">Annual Visitors</p>
          </div>

          <div className="bg-white shadow-lg p-5 rounded-lg">
            <h3 className="text-4xl font-bold text-green-700">10,000+</h3>
            <p className="text-lg text-gray-700">Rare Artifacts</p>
          </div>

          <div className="bg-white shadow-lg p-5 rounded-lg">
            <h3 className="text-4xl font-bold text-yellow-500">1,200+</h3>
            <p className="text-lg text-gray-700">Personal Accounts</p>
          </div>

          <div className="bg-white shadow-lg p-5 rounded-lg">
            <h3 className="text-4xl font-bold text-blue-600">50+</h3>
            <p className="text-lg text-gray-700">International Collaborations</p>
          </div>

        </div>
      </div>

    </section>
  );
};

export default About;