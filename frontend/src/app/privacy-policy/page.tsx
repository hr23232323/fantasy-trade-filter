import React from "react";

const privacyPolicyData = [
  {
    title: "1. Information We Collect",
    content:
      "We collect basic information like your name, email address, and usage data when you use our app. This data helps us improve your experience and optimize our features.",
  },
  {
    title: "2. How We Use Your Information",
    content:
      "We use your information to provide, improve, and personalize our services. We may also use your data to communicate with you about updates, promotions, and other relevant information.",
  },
  {
    title: "3. Data Protection",
    content:
      "Your data is securely stored, and we take appropriate measures to prevent unauthorized access. We do not share your data with third parties without your consent.",
  },
  {
    title: "4. Contact Us",
    content:
      'If you have any questions about our Privacy Policy, please contact us at <a href="mailto:privacy@fantasytradetarget.com" class="text-blue-400 hover:underline">privacy@fantasytradetarget.com</a>.',
  },
];

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="container mx-auto mt-10 p-6 text-gray-300">
      <h1 className="text-4xl font-bold text-center text-white mb-6">
        Privacy Policy
      </h1>
      <div className="bg-gray-800 p-6 rounded-lg shadow-md border border-gray-700 space-y-6 text-gray-100">
        {privacyPolicyData.map((section, index) => (
          <section key={index}>
            <h2 className="text-2xl font-semibold text-gray-400">
              {section.title}
            </h2>
            <p
              dangerouslySetInnerHTML={{ __html: section.content }}
              className="mt-2"
            />
          </section>
        ))}
      </div>
    </div>
  );
};

export default PrivacyPolicy;
