import React, { useState, useRef, useEffect } from "react";

const categories = [
  "Electronics",
  "Men's Fashion",
  "Women's Fashion",
  "Kids",
  "Home & Kitchen",
  "Beauty & Fragrance",
  "Baby",
  "Toys",
  "Sports",
];

export default function Scroll() {
  const [openIndex, setOpenIndex] = useState(null);
  const [menuPos, setMenuPos] = useState({ top: 0, left: 0 });
  const containerRef = useRef(null);

  // Store refs to toggles
  const toggleRefs = useRef([]);

  const openMenu = (idx) => {
    if (idx === openIndex) {
      setOpenIndex(null); // toggle off if same clicked
      return;
    }

    const toggleRect = toggleRefs.current[idx].getBoundingClientRect();

    // Calculate menu position relative to viewport
    setMenuPos({
      top: toggleRect.bottom + window.scrollY,
      left: toggleRect.left + window.scrollX,
    });

    setOpenIndex(idx);
  };

  const closeMenu = () => setOpenIndex(null);


  
    const scroll = (direction) => {
        const container = containerRef.current;
        if (container) {
            const scrollAmount = direction === 'left' ? -150 : 150;
            container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

  // Close menu on outside click
  useEffect(() => {
    function onClickOutside(event) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        closeMenu();
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  return (
    <>
      <div
        ref={containerRef}
        style={{
          width: 200,
          overflowX: "auto",
          whiteSpace: "nowrap",
          border: "1px solid green",
          padding: 10,
          display: "flex",
          gap: 10,
        }}
      >
         <span onClick={() => scroll('left')}
  style={{
    cursor: 'pointer',
    userSelect: 'none',
    fontSize: '20px',
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
  }}>
                        <i className="fa-solid fa-less-than fa-md" style={{ color: ' #000000' }}></i>
                    </span>

        {categories.map((cat, i) => (
          <span
            key={i}
            ref={(el) => (toggleRefs.current[i] = el)}
            style={{
              minWidth: 130,
              whiteSpace: "nowrap",
              padding: "6px 12px",
              cursor: "pointer",
            }}
            onClick={() => openMenu(i)}
          >
            {cat}
          </span>
        ))}

         <span onClick={() => scroll('left')}
  style={{
    cursor: 'pointer',
    userSelect: 'none',
    fontSize: '20px',
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
  }}>
                        <i className="fa-solid fa-greater-than fa-md" style={{ color: ' #000000' }}></i>
                    </span>
      </div>

      {openIndex !== null && (
        <div
          style={{
            position: "absolute",
            top: menuPos.top,
            left: menuPos.left,
            background: "white",
            border: "1px solid #ccc",
            boxShadow: "0 3px 6px rgba(0,0,0,0.1)",
            zIndex: 9999,
            width: 150,
          }}
        >
          <div
            style={{ padding: "8px", cursor: "pointer" }}
            onClick={() => alert("Action 1")}
          >
            Action 1
          </div>
          <div
            style={{ padding: "8px", cursor: "pointer" }}
            onClick={() => alert("Action 2")}
          >
            Action 2
          </div>
          <div
            style={{ padding: "8px", cursor: "pointer" }}
            onClick={() => alert("Action 3")}
          >
            Action 3
          </div>

            
        </div>
      )}
       
    </>
  );
}
