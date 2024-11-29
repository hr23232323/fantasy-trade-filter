import { FaDownload, FaRegShareSquare } from "react-icons/fa";

interface MemeCardProps {
  url: string; // Image URL
  index: number; // Image index
  loading?: boolean;
}

const MemeCard: React.FC<MemeCardProps> = ({ url, index, loading = false }) => {
  const handleDownload = async (url: string, index: number) => {
    try {
      // Fetch the image data
      const response = await fetch(url);
      const blob = await response.blob();

      // Create a temporary object URL
      const objectURL = URL.createObjectURL(blob);

      // Create an anchor element and trigger the download
      const link = document.createElement("a");
      link.href = objectURL;
      link.download = `meme-${index + 1}.jpg`;
      document.body.appendChild(link); // Append to the DOM to make it work in some browsers
      link.click();
      document.body.removeChild(link); // Remove the link after triggering the download

      // Revoke the object URL to free up memory
      URL.revokeObjectURL(objectURL);
    } catch (error) {
      console.error("Error downloading the image:", error);
      alert("Failed to download the image.");
    }
  };

  const handleShare = (url: string) => {
    if (navigator.share) {
      navigator.share({
        title: "Check out this meme!",
        url: url,
      });
    } else {
      alert("Sharing is not supported in this browser.");
    }
  };

  return loading ? (
    <div
      key={index}
      className="p-4 bg-white shadow-md rounded-md animate-pulse"
    >
      <div className="w-full h-64 bg-gray-200 rounded-md"></div>
      <div className="mt-2 h-4 bg-gray-200 rounded-md w-2/3 mx-auto"></div>
    </div>
  ) : (
    <div className="bg-white shadow-md rounded-md p-4 flex flex-col items-center justify-between">
      <div className="w-full bg-gray-100 rounded-md overflow-hidden">
        <img
          src={url}
          alt={`Meme ${index + 1}`}
          className="w-full rounded-md block"
        />
      </div>

      {/* Buttons */}
      <div className="flex gap-4 mt-4">
        <button
          aria-label="Download"
          onClick={() => handleDownload(url, index)}
          className="px-4 py-2 bg-blue-500 text-white rounded-md font-semibold flex items-center gap-2 hover:bg-blue-600 transition duration-200"
        >
          <FaDownload /> Download
        </button>

        <button
          aria-label="Share"
          onClick={() => handleShare(url)}
          className="px-4 py-2 bg-green-500 text-white rounded-md font-semibold flex items-center gap-2 hover:bg-green-600 transition duration-200"
        >
          <FaRegShareSquare /> Share
        </button>
      </div>
    </div>
  );
};

export default MemeCard;
