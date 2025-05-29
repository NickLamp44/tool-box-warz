import React from "react";

function WorkInProgressBanner() {
  const bannerStyle = {
    backgroundColor: "#ffe08a",
    color: "#4a4a4a",
    textAlign: "center",
    fontWeight: 600,
    padding: "8px 0",
    fontSize: "0.95rem",
    borderBottom: "1px solid #e6c678",
  };

  return (
    <div style={bannerStyle}>
      🚧 This site is a work in progress. Some features may not be complete.
    </div>
  );
}

export default WorkInProgressBanner;
