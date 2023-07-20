import { useEffect, useState } from "react";

const isTouch = () => window.matchMedia("(pointer: coarse)").matches;

const useIsTouchDevice = () => {
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    setIsTouchDevice(() => isTouch());
  }, []);

  return isTouchDevice;
};

export default useIsTouchDevice;
