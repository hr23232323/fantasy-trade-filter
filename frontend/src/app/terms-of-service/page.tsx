import React from "react";

const termsData = [
  {
    title: "1. Introduction",
    content:
      "Welcome to Fantasy Trade Target! By accessing or using our website and services, you agree to comply with and be bound by these Terms of Service. If you do not agree, please refrain from using our services.",
  },
  {
    title: "2. Eligibility",
    content:
      "You must be at least 13 years old to use our services. By accessing our platform, you confirm that you meet this age requirement and have the legal capacity to agree to these terms.",
  },
  {
    title: "3. Use of the Services",
    content:
      "You may not use Fantasy Trade Target for any unlawful or unauthorized purpose. You agree to use the platform only as intended, which includes generating trade suggestions and memes for personal, non-commercial use.",
  },
  {
    title: "4. User Accounts",
    content:
      "If you create an account, you are responsible for maintaining the security of your account and ensuring that the information provided is accurate. We are not liable for any loss or damage resulting from unauthorized access to your account.",
  },
  {
    title: "5. Intellectual Property",
    content:
      "All content on Fantasy Trade Target, including logos, trademarks, text, and software, is owned by us or our licensors. You may not reproduce, distribute, or create derivative works without prior written consent.",
  },
  {
    title: "6. Limitation of Liability",
    content:
      'Fantasy Trade Target is provided "as is" without any warranties, express or implied. We are not liable for any damages arising from the use or inability to use the platform, including but not limited to trade outcomes or financial losses.',
  },
  {
    title: "7. Changes to the Terms",
    content:
      "We reserve the right to modify these Terms of Service at any time. Any changes will be posted on this page, and your continued use of the platform constitutes acceptance of the updated terms.",
  },
  {
    title: "8. Termination",
    content:
      "We may terminate or suspend your access to Fantasy Trade Target at our sole discretion, without prior notice, if you breach these terms or engage in any unlawful activity.",
  },
  {
    title: "9. Governing Law",
    content:
      "These terms are governed by and construed in accordance with the laws of [Your Country/State]. Any disputes arising from these terms will be subject to the exclusive jurisdiction of the courts in [Your Location].",
  },
  {
    title: "10. Contact Us",
    content:
      'If you have any questions about these Terms of Service, please contact us at <a href="mailto:contact@fantasytradetarget.com" class="text-blue-400 hover:underline">contact@fantasytradetarget.com</a>.',
  },
];

const TermsOfService: React.FC = () => {
  return (
    <div className="container mx-auto mt-10 p-6 text-gray-300">
      <h1 className="text-4xl font-bold text-center text-white mb-6">
        Terms of Service
      </h1>
      <div className="bg-gray-800 p-6 rounded-lg shadow-md border border-gray-700 space-y-6 text-gray-100">
        {termsData.map((section, index) => (
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

export default TermsOfService;
