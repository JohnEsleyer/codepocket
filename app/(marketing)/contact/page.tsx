


const ContactPage: React.FC = () => {
    return (
        <>
           <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-4xl font-bold text-center mb-8">Contact Us</h1>
            <p className="text-lg text-gray-700 mb-6 text-center">
                We would love to hear from you! Whether you have a question, feedback, or just want to say hello, feel free to reach out to us.
            </p>
            <form className="space-y-6">
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                        Name
                    </label>
                    <input
                        className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                        id="name"
                        type="text"
                        placeholder="Your Name"
                    />
                </div>
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        Email
                    </label>
                    <input
                        className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                        id="email"
                        type="email"
                        placeholder="Your Email"
                    />
                </div>
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="message">
                        Message
                    </label>
                    <textarea
                        className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                        id="message"
                        placeholder="Your Message"
                        rows={5}
                    ></textarea>
                </div>
                <div className="text-center">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                    >
                        Send Message
                    </button>
                </div>
            </form>
        </div>
        </>
    )
}

export default ContactPage;