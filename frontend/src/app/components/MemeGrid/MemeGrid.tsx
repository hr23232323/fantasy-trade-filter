import React from "react";
import Masonry from "react-masonry-css";
import styles from "./MemeGrid.module.css";
import MemeCard from "../MemeCard"; // Your child component

interface MemeGridProps {
  memeUrls: string[];
  loading: boolean;
}

const MemeGrid: React.FC<MemeGridProps> = ({ memeUrls, loading }) => {
  const breakpointColumns = {
    default: 3, // Tailwind `lg:grid-cols-3` (1024px and above)
    1024: 2, // Tailwind `sm:grid-cols-2` (640px to 1023px)
    640: 1, // Tailwind `grid-cols-1` (<640px)
  };
  return (
    <Masonry
      breakpointCols={breakpointColumns}
      className={styles["masonry-grid"]}
      columnClassName={styles["masonry-grid-column"]}
    >
      {(loading ? [...Array(6)] : memeUrls).map((urlOrEmpty, index) => (
        <MemeCard
          key={index}
          loading={loading}
          url={!loading ? urlOrEmpty : ""}
          index={index}
        />
      ))}
    </Masonry>
  );
};

export default MemeGrid;
