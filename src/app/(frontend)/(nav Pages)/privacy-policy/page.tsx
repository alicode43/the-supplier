import Navbar from '@/components/frontend/Navbar';
import React from 'react';
import Footer from '@/components/frontend/Footer';

export default function PrivacyPolicy() {
  return (
 <>
    <Navbar />

    <div className="max-w-4xl mx-auto p-6 text-gray-800">
      <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
    

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">1. Introduction</h2>
        <p>
          Welcome to TheSupplier.in . This Privacy Policy explains how we collect,
          use, disclose, and protect your personal information when you visit our website.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">2. Information We Collect</h2>
        <ul className="list-disc list-inside space-y-1">
          <li><strong>Personal Data:</strong> Name, address, email, phone number, etc.</li>
          <li><strong>Derivative Data:</strong> IP address, browser type, access times, etc.</li>
          <li><strong>Financial Data:</strong> Payment information used during transactions.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">3. Use of Your Information</h2>
        <p>We use your information to:</p>
        <ul className="list-disc list-inside space-y-1">
          <li>Create and manage your account</li>
          <li>Process orders and payments</li>
          <li>Provide customer service</li>
          <li>Send updates, security alerts, and promotional content</li>
          <li>Improve our services</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">4. Disclosure of Your Information</h2>
        <p>We may share your data:</p>
        <ul className="list-disc list-inside space-y-1">
          <li>To comply with legal obligations</li>
          <li>With third-party service providers</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">5. Security of Your Information</h2>
        <p>
          We implement appropriate security measures but cannot guarantee complete protection of your data.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">6. Policy for Children</h2>
        <p>
          We do not knowingly collect data from children under 13. If such data is discovered, we will delete it.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">7. Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy and will notify you by updating the Effective Date above.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">8. Contact Us</h2>
        <p>
          If you have questions, please contact us at:
          <br />
          <strong>Email:</strong> info@thesupplier.in
          <br />
          <strong>Phone:</strong> +91 9328 101125
        </p>
      </section>
    </div>
    <Footer />
 </>
  );
}
