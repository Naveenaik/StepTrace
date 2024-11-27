import React from 'react';

const ContactUs = () => {
  return (
    <section id="terms-contact" className="py-16 bg-white">
      <div className="container mx-auto px-4 flex flex-wrap items-center">
        <div className="w-full md:w-1/2">
          <h2 className="text-3xl font-bold text-purple-600">Terms & Conditions</h2>
          <p className="mt-4 text-lg text-gray-700">
            Please read our terms and conditions carefully before using our services. Your trust and safety are our
            priorities.
          </p>
        </div>
        <div className="w-full md:w-1/2 text-center md:text-right">
          <h2 className="text-3xl font-bold text-red-600">Contact Us</h2>
          <p className="mt-4 text-lg text-gray-800">
            Have any questions? Reach out to us at <a href="mailto:support@steptrace.com" className="text-blue-600">support@steptrace.com</a>.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
