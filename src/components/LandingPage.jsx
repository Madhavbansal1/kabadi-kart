import React from 'react';

const recyclingImage = 'https://media.istockphoto.com/id/1455357064/photo/metal-recycle-yard-aerial-view.jpg?s=2048x2048&w=is&k=20&c=z2zuyjoF2zBv63QjH6oC89yPwxLmfGCoEddJMrDI3VI=';
const communityImage = 'https://media.istockphoto.com/id/1572436997/photo/diversity-and-inclusion-at-workplace-lgbt-leadership.jpg?s=2048x2048&w=is&k=20&c=rnNAHIaC-5GM1VV3TxzgD3M8S19uvAoZl3zNYPTcJMI=';
const updatesImage = 'https://media.istockphoto.com/id/1368621602/vector/important-announcement-with-megaphone-banner-on-blue-background-vector-illustration.jpg?s=2048x2048&w=is&k=20&c=GLmwJgV9zwxYUZaG_KqWwkaEizIHO6IblGA-0MV8WMs=';

const LandingPage = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      {/* Header */}
      <header className="w-full bg-gradient-to-r from-green-500 via-green-700 to-green-900 text-white p-6 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-4xl font-bold tracking-tight">Kabadi Cart</h1>
          <nav>
            <a href="#features" className="mr-6 text-lg hover:text-gray-300 transition-all duration-200">Features</a>
            <a href="#contact" className="mr-6 text-lg hover:text-gray-300 transition-all duration-200">Contact</a>
            <a href="/about" className="mr-6 text-lg hover:text-gray-300 transition-all duration-200">About</a>
            <a href="/login" className="ml-4 bg-white text-green-700 px-6 py-3 rounded-full shadow-lg hover:bg-green-100 transition-all duration-200">Sign In</a>
            <a href="/signup" className="ml-4 bg-white text-green-700 px-6 py-3 rounded-full shadow-lg hover:bg-green-100 transition-all duration-200">Sign Up</a>
          </nav>
        </div>
      </header>

      {/* Main Section */}
      <main className="flex flex-col justify-center items-center text-center py-16 bg-gradient-to-r from-green-600 via-green-700 to-green-800 text-white">
        <h2 className="text-5xl font-extrabold mb-6">Welcome to Kabadi Cart</h2>
        <p className="text-lg mb-8">Revolutionizing recycling with an easy-to-use platform connecting you with local scrap dealers.</p>
        <a href="#contact" className="bg-white text-green-700 px-8 py-4 rounded-lg text-xl font-semibold shadow-lg hover:bg-green-100 transition-all duration-300">Contact Us</a>
      </main>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white w-full">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Our Features</h2>
          <div className="flex flex-wrap justify-around">
            <div className="w-full md:w-1/3 p-6">
              <div className="bg-gray-100 p-8 rounded-lg shadow-lg text-center hover:shadow-2xl transition-all duration-300">
                <img src={recyclingImage} alt="Easy Onboarding" className="w-24 h-24 mx-auto mb-4 object-cover rounded-full" />
                <h3 className="text-2xl font-semibold mb-4">Easy Onboarding</h3>
                <p>Quick and simple registration for kabadiwalas and sellers with personalized dashboards.</p>
              </div>
            </div>
            <div className="w-full md:w-1/3 p-6">
              <div className="bg-gray-100 p-8 rounded-lg shadow-lg text-center hover:shadow-2xl transition-all duration-300">
                <img src={updatesImage} alt="Real-Time Updates" className="w-24 h-24 mx-auto mb-4 object-cover rounded-full" />
                <h3 className="text-2xl font-semibold mb-4">Real-Time Updates</h3>
                <p>Track recycling activities and receive real-time notifications.</p>
              </div>
            </div>
            <div className="w-full md:w-1/3 p-6">
              <div className="bg-gray-100 p-8 rounded-lg shadow-lg text-center hover:shadow-2xl transition-all duration-300">
                <img src={communityImage} alt="Community Engagement" className="w-24 h-24 mx-auto mb-4 object-cover rounded-full" />
                <h3 className="text-2xl font-semibold mb-4">Community Engagement</h3>
                <p>Provide feedback, rate transactions, and engage with the recycling community.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Collector Section */}
      <section className="py-20 bg-gray-100 w-full">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8">Join as a Collector</h2>
          <p className="mb-6">Are you a Kabadiwala? Start collecting with ease.</p>
          <div className="flex justify-center">
            <a href="/collector/signup" className="bg-green-700 text-white px-8 py-4 rounded-lg text-lg font-semibold shadow-lg hover:bg-green-600 transition-all duration-300 mr-4">Collector Signup</a>
            <a href="/collector/login" className="bg-green-700 text-white px-8 py-4 rounded-lg text-lg font-semibold shadow-lg hover:bg-green-600 transition-all duration-300">Collector Login</a>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white w-full">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8">Contact Us</h2>
          <p className="mb-6">Have questions or need support? Reach out to us!</p>
          <a href="mailto:support@kabadicart.com" className="bg-green-700 text-white px-8 py-4 rounded-lg text-lg font-semibold shadow-lg hover:bg-green-600 transition-all duration-300">Email Us</a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-green-700 to-green-900 text-white py-6 w-full text-center">
        <p>&copy; {new Date().getFullYear()} Kabadi Cart. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
