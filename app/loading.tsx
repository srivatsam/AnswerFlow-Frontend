import React from "react";

function loading() {
  return (
    <div id="express-loading-icon">
      <div id="express-loading-icon-spinner"></div>
      <svg
        viewBox="0 0 48 48"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
      >
        <path d="M40,0H8C3.6,0,0,3.6,0,8v32c0,4.4,3.6,8,8,8h32c4.4,0,8-3.6,8-8V8C48,3.6,44.4,0,40,0z M34.1,37c-1.3,0-2.8-0.6-3.6-2.4l-5.7-13.4c-0.3-0.7-1.3-0.7-1.6,0L20.4,28c-0.2,0.6,0.2,1.2,0.8,1.2c0,0,1.4,0,1.5,0c2.2,0,3.9,1.8,3.9,3.9S24.9,37,22.7,37h-8.8 c-2.8,0-4.7-2.8-3.6-5.4l7.9-18.8c1-2.3,3.3-3.8,5.8-3.8s4.8,1.5,5.8,3.8l0,0l8,18.8C38.8,34.2,36.9,37,34.1,37z" />
      </svg>
    </div>
  );
}

export default loading;
