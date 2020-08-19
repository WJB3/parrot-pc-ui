
import React from 'react';

export default function useLoaded({ src, srcSet }) {
    const [loaded, setLoaded] = React.useState(false);
  
    React.useEffect(() => {
      if (!src && !srcSet) {
        return undefined;
      }
  
      setLoaded(false);
  
      let active = true;
      const image = new Image();
      image.src = src;
      image.srcSet = srcSet;
      image.onload = () => {
        if (!active) {
          return;
        }
        setLoaded('loaded');
      };
      image.onerror = () => {
        if (!active) {
          return;
        }
        setLoaded('error');
      };
  
      return () => {
        active = false;
      };
    }, [src, srcSet]);
  
    return loaded;
  }