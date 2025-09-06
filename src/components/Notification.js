// src/components/Notification.js
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";

export default function Notification({ message, onClose }) {
  if (!message) return null;

  const node = typeof document !== "undefined" ? document.body : null;
  if (!node) return null;

  const popup = (
    <AnimatePresence>
      <motion.div
        key="notif"
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -40, opacity: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        style={{
          position: "fixed",
          top: 20,                     // stays at the top
          left: "40%",                 // center horizontally
          transform: "translateX(-50%)",
          background: "rgba(255,255,255,0.95)",
          color: "#111",
          padding: "10px 18px",
          borderRadius: 12,
          boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
          zIndex: 2147483647,
          display: "flex",
          alignItems: "center",
          gap: 12,
          maxWidth: "min(900px, 90%)",
          pointerEvents: "auto",
        }}
      >
        <div style={{ flex: 1, textAlign: "center", fontSize: 16 }}>
          {message}
        </div>

        <button
          onClick={onClose}
          aria-label="Close notification"
          style={{
            background: "transparent",
            border: "none",
            cursor: "pointer",
            fontSize: 16,
            lineHeight: 1,
            padding: "6px 8px",
            borderRadius: 6,
          }}
        >
          ✖
        </button>
      </motion.div>
    </AnimatePresence>
  );

  return createPortal(popup, node);
}
