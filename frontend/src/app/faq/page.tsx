import React from "react";
import Head from "next/head";
import QnA from "../components/QnA";

// Shared FAQ Data
const faqData = [
  {
    question: "What is Fantasy Trade Target?",
    answer:
      "Fantasy Trade Target is a tool that helps users find optimal fantasy trades and create fun memes for their leagues in minutes.",
  },
  {
    question: "How does the meme generator work?",
    answer:
      "The meme generator allows you to select some players to trade for/away, and automatically generate random memes using them.",
  },
  {
    question: "Is Fantasy Trade Target free to use?",
    answer:
      "Yes! Fantasy Trade Target is free to use! We may introduce a premium tier or ads in the future, but not for now.",
  },
  {
    question: "Can I use the app on mobile?",
    answer:
      "Absolutely! Fantasy Trade Target is fully mobile-responsive and works seamlessly on all devices.",
  },
];

const FAQPage: React.FC = () => {
  // Convert FAQ data to JSON-LD format
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqData.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <div className="container mx-auto md:p-4 mt-10">
      {/* Inject Schema Markup for SEO */}
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
        />
        <title>Frequently Asked Questions - Fantasy Trade Target</title>
        <meta
          name="description"
          content="Find answers to common questions about Fantasy Trade Target, including how it works, features, and mobile compatibility."
        />
      </Head>
      <div className="px-8">
        <h1 className="text-3xl font-bold text-center mb-6">
          🤔 Frequently Asked Questions
        </h1>
        {/* Render Visible FAQs */}
        <div className="space-y-6">
          {faqData.map((faq, index) => (
            <QnA index={index} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQPage;
