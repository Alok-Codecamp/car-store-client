import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom"


const usePreviousLocation = () => {
    const { pathname } = useLocation();


    console.log(pathname)
};

export default usePreviousLocation;