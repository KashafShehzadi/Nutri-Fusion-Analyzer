import React from 'react';

function Contact() {
  return (
    <>
      <div className="bg-slate-900 h-auto flex items-center justify-center pb-10" id="contact">
        <section className="container p-4 md:border-2  border-myCustomColor mt-28 rounded-lg shadow-md max-w-md sm:max-w-2xl ">
          <h2 className="md:text-3xl text-xl font-bold mb-4 text-center text-myCustomColor">Contact Us!</h2>
          <form className="flex p-0  flex-col md:flex-row sm:flex-wrap gap-4 w-full">

            <div className="flex   flex-col sm:flex-row gap-4 w-full ">

              <div className="mb-4 md:w-[50%]">
                <label htmlFor="name" className="block text-white font-bold mb-2 text-base">Full Name:</label>
                <input
                  type="text"
                  id="name"
                  className="shadow border-myCustomColor border-2  rounded w-full py-2 px-3 text-gray-700 leading-tight  focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4 md:w-[50%] ">
                <label htmlFor="email" className="block text-white font-bold mb-2 text-base">Email address:</label>
                <input
                  type="email"
                  id="email"
                  className="shadow border-myCustomColor border-2 appearance-none  rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full ">
              <div className="mb-4 md:w-[50%] ">
                <label htmlFor="mobile" className="block  text-white font-bold mb-2 text-base">Mobile Number:</label>
                <input
                  type="number"
                  id="mobile"
                  className="shadow border-myCustomColor border-2 appearance-none  rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4 md:w-[50%] ">
                <label htmlFor="subject" className="block text-white font-bold mb-2 text-base">Email Subject:</label>
                <input
                  type="text"
                  id="subject"
                  className="shadow border-myCustomColor border-2 appearance-none  rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
            </div>

            <div className="w-full">
              <div className="mb-4">
                <label htmlFor="message" className="block text-white font-bold mb-2 text-base">Your Message:</label>
                <textarea
                  id="message"
                  rows="4"
                  className="shadow appearance-none border-myCustomColor border-2 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                ></textarea>
              </div>

              <div className="w-full  flex justify-center mt-4">
              <button
                type="submit"
                className="bg-myCustomColor hover:bg-white text-white hover:text-myCustomColor hover:border-2 hover:border-myCustomColor font-semibold py-2 px-4 rounded-md "
              >
                Send Message
              </button>
            </div>
            </div>
          </form>
        </section>
      </div>
    </>
  );
}

export default Contact;
