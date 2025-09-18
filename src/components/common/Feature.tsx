import React from "react";

export default function Feature() {
  return (
    <section className="py-16 px-6 md:px-12 lg:px-20 bg-gray-100">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
        Why Choose Us?
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Card 1 */}
        <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
          <h3 className="text-xl font-semibold mb-2">⚡ Real-Time Feeds</h3>
          <p className="text-gray-600">
            See posts as they happen. No refresh needed — stay updated instantly
            with what your network is sharing.
          </p>
        </div>

        {/* Card 2 */}
        <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
          <h3 className="text-xl font-semibold mb-2">
            🌍 Discover Communities
          </h3>
          <p className="text-gray-600">
            Explore trending conversations and connect with people who share
            your interests.
          </p>
        </div>

        {/* Card 3 */}
        <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
          <h3 className="text-xl font-semibold mb-2">💬 Engage Seamlessly</h3>
          <p className="text-gray-600">
            Comment, like, and share effortlessly. Engage with posts in an
            intuitive, user-friendly experience.
          </p>
        </div>

        {/* Card 4 */}
        <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
          <h3 className="text-xl font-semibold mb-2">🔔 Smart Notifications</h3>
          <p className="text-gray-600">
            Get notified about what matters most: mentions, comments, and
            trending updates.
          </p>
        </div>

        {/* Card 5 */}
        <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
          <h3 className="text-xl font-semibold mb-2">📱 Mobile Friendly</h3>
          <p className="text-gray-600">
            Access your feed anywhere, anytime. Our app is fully responsive
            across devices.
          </p>
        </div>

        {/* Card 6 */}
        <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
          <h3 className="text-xl font-semibold mb-2">🔒 Secure & Private</h3>
          <p className="text-gray-600">
            Your data is safe with end-to-end security and privacy-first design.
          </p>
        </div>
      </div>
    </section>
  );
}
