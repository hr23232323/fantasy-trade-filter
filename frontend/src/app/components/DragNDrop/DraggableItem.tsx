import React from "react";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

// Draggable Item Component
const DraggableItem: React.FC<{ slug: string; name: string }> = ({
  slug,
  name,
}) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: slug,
  });

  const style = {
    transform: CSS.Translate.toString(transform),
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="p-3 bg-white rounded-lg shadow-md mb-2  text-sm  cursor-pointer text-gray-600"
    >
      {name}
    </div>
  );
};

export default DraggableItem;
