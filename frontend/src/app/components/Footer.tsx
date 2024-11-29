const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 py-6 px-4">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        {/* Footer Text */}
        <div className="text-center md:text-left mb-4 md:mb-0">
          <p className="text-sm">
            © 2024 Fantasy Trade Target. All rights reserved.
          </p>
          <p className="text-sm">
            Built with ❤️ for Fantasy Football players. Good luck on your next
            trade!
          </p>
        </div>
        {/* Footer Links */}
        <div className="flex space-x-4 text-sm">
          <a
            href="/privacy-policy"
            className="hover:text-white transition-colors"
          >
            Privacy Policy
          </a>
          <a
            href="/terms-of-service"
            className="hover:text-white transition-colors"
          >
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
