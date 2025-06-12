import React from 'react'

const Loader = () => {
  return (
    <div
      className="w-[22px] h-[22px] border-[3px] border-t-transparent  rounded-full animate-spin"
      role="status"
    ></div>
  );
  
}

export default Loader