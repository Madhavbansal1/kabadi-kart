import React from 'react';

const AboutPage = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center p-6">
      <header className="w-full bg-gradient-to-r from-green-500 via-green-700 to-green-900 text-white p-6 shadow-lg">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-extrabold">About Kabadi Cart</h1>
        </div>
      </header>

      <main className="flex flex-col items-center justify-center mt-12 p-8 bg-white rounded-lg shadow-xl w-full max-w-5xl">
        {/* Mission Section */}
        <section className="mb-12 text-center px-6">
          <h2 className="text-3xl font-bold mb-4 text-green-700">Our Mission</h2>
          <p className="text-lg text-gray-700">
            At Kabadi Cart, our mission is to transform the traditional recycling industry by connecting individuals and businesses with local kabadiwalas (scrap dealers). We aim to promote sustainable practices and create a more efficient recycling ecosystem through our innovative platform.
          </p>
        </section>

        {/* Team Section */}
        <section className="mb-12 text-center">
          <h2 className="text-3xl font-bold mb-6 text-green-700">Our Team</h2>
          <div className="flex flex-wrap justify-center gap-8">
            <div className="p-6 max-w-xs text-center">
              <div className="bg-gray-200 rounded-full w-40 h-40 mx-auto mb-4">
                {/* Add your image here */}
                <img src="" alt="Madhav Bansal" className="w-full h-full object-cover rounded-full" />
              </div>
              <h3 className="text-xl font-semibold text-green-800">Madhav Bansal</h3>
              <p className="text-gray-600">Founder & CEO</p>
            </div>
            {/* Add more team members as needed */}
          </div>
        </section>

        {/* Contact Section */}
        <section className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-6 text-green-700">Contact Us</h2>
          <p className="text-lg text-gray-700 mb-4">
            If you have any questions, feedback, or inquiries, feel free to reach out to us:
          </p>
          <div className="text-lg font-semibold text-gray-700">
            <p>Email: <a href="mailto:support@kabadikart.com" className="text-green-600 hover:underline">support@kabadikart.com</a></p>
            <p>Phone: <a href="tel:+1234567890" className="text-green-600 hover:underline">+123 456 7890</a></p>
          </div>
        </section>
      </main>

      <footer className="bg-gradient-to-r from-green-500 via-green-700 to-green-900 text-white py-4 w-full text-center mt-auto">
        <p>&copy; {new Date().getFullYear()} Kabadi Cart. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default AboutPage;
