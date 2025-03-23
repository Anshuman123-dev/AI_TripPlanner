// components/custom/dropdown-menu.jsx
import React, { useRef, useState, useEffect } from "react";
import { createPortal } from "react-dom";

const DropdownMenuContext = React.createContext({
  open: false,
  setOpen: () => {},
  triggerRef: null,
  contentRef: null,
});

const DropdownMenu = ({ children }) => {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef(null);
  const contentRef = useRef(null);

  const handleClickOutside = (event) => {
    if (
      open &&
      contentRef.current &&
      !contentRef.current.contains(event.target) &&
      triggerRef.current &&
      !triggerRef.current.contains(event.target)
    ) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    <DropdownMenuContext.Provider value={{ open, setOpen, triggerRef, contentRef }}>
      <div className="relative">{children}</div>
    </DropdownMenuContext.Provider>
  );
};

const DropdownMenuTrigger = ({ children, asChild }) => {
  const { setOpen, open, triggerRef } = React.useContext(DropdownMenuContext);

  const handleClick = (e) => {
    e.preventDefault();
    setOpen(!open);
  };

  if (asChild) {
    return React.cloneElement(children, {
      onClick: handleClick,
      ref: triggerRef,
      "aria-expanded": open,
      "aria-haspopup": true,
    });
  }

  return (
    <button
      onClick={handleClick}
      ref={triggerRef}
      aria-expanded={open}
      aria-haspopup={true}
      className="inline-flex items-center justify-center"
    >
      {children}
    </button>
  );
};

const DropdownMenuContent = ({ 
  children, 
  align = "center", 
  className = "",
  sideOffset = 4
}) => {
  const { open, contentRef, triggerRef } = React.useContext(DropdownMenuContext);
  const [mounted, setMounted] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  
  useEffect(() => {
    setMounted(true);
    
    const updatePosition = () => {
      if (triggerRef.current) {
        const rect = triggerRef.current.getBoundingClientRect();
        const contentRect = contentRef.current?.getBoundingClientRect();
        const contentWidth = contentRect?.width || 0;
        
        let left;
        if (align === "start") {
          left = rect.left;
        } else if (align === "end") {
          left = rect.right - contentWidth;
        } else {
          left = rect.left + rect.width / 2 - contentWidth / 2;
        }
        
        // Ensure the dropdown stays within viewport
        const viewportWidth = window.innerWidth;
        if (left + contentWidth > viewportWidth) {
          left = viewportWidth - contentWidth - 8;
        }
        if (left < 8) {
          left = 8;
        }
        
        setPosition({
          top: rect.bottom + sideOffset + window.scrollY,
          left,
        });
      }
    };
    
    if (open) {
      updatePosition();
      window.addEventListener('resize', updatePosition);
      return () => window.removeEventListener('resize', updatePosition);
    }
  }, [open, align, sideOffset]);

  if (!mounted || !open) {
    return null;
  }

  return createPortal(
    <div
      ref={contentRef}
      style={{
        position: 'absolute',
        top: `${position.top}px`,
        left: `${position.left}px`,
        zIndex: 50,
      }}
      className={`animate-in fade-in-0 zoom-in-95 bg-white border rounded-md shadow-md min-w-[8rem] overflow-hidden p-1 ${className}`}
      role="menu"
    >
      {children}
    </div>,
    document.body
  );
};

const DropdownMenuItem = ({ children, onClick, className = "", asChild }) => {
  const { setOpen } = React.useContext(DropdownMenuContext);

  const handleClick = (e) => {
    if (onClick) {
      onClick(e);
    }
    setOpen(false);
  };

  const itemClass = `flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-slate-100 focus:bg-slate-100 ${className}`;

  if (asChild) {
    return React.cloneElement(children, {
      onClick: handleClick,
      className: `${itemClass} ${children.props.className || ""}`,
      role: "menuitem",
    });
  }

  return (
    <div onClick={handleClick} className={itemClass} role="menuitem" tabIndex={0}>
      {children}
    </div>
  );
};

const DropdownMenuSeparator = ({ className = "" }) => (
  <div className={`-mx-1 my-1 h-px bg-slate-200 ${className}`} role="separator" />
);

// Export all components individually and as a named export object
export { 
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator
};

// Also export as default for those who prefer default imports
export default {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator
};