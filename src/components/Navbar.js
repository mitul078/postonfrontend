"use client"
import { gsap } from 'gsap';
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import "./styles/nav.scss";

const Navbar = () => {
    const [open, setOpen] = useState(false)

    const logoRef = useRef(null);
    const mobileMenuRef = useRef(null);
    const tlRef = useRef(null);


    useEffect(() => {
        const links = gsap.utils.toArray(".nav-link");
        const tl = gsap.timeline();
        tl.from(logoRef.current, { y: -20, opacity: 0 })
            .from(links, { x: -30, opacity: 0, stagger: 0.2 }, "-=0.4");
    }, []);


    useEffect(() => {
        const mobileLinks = gsap.utils.toArray(".mobile-nav-link");

        if (open) {
            tlRef.current = gsap.timeline();
            gsap.set(mobileMenuRef.current, { x: '100%', opacity: 0 });
            gsap.set(mobileLinks, { x: 50, opacity: 0 });

            tlRef.current
                .to(mobileMenuRef.current, { x: '0%', opacity: 1, duration: 0.3, ease: 'power2.out' })
                .to(mobileLinks, {
                    x: 0,
                    opacity: 1,
                    duration: 0.3,
                    stagger: 0.1,
                    ease: 'power2.out'
                }, "-=0.2");
        }

    }, [open])

    const handleClose = () => {
        if (tlRef.current) {
            tlRef.current.reverse();
            tlRef.current.eventCallback("onReverseComplete", () => {
                setOpen(false);
            });
        }
    };
    const handleLinkClick = () => {
        setTimeout(() => {
            handleClose();
        }, 100);
    };

    const router = useRouter()
    const handleHome = () => {
        router.push("/");
    }


    return (
        <div className='Navbar relative'>
            <div className="left">
                <h1 onClick={handleHome} ref={logoRef}>FocusOn</h1>
            </div>
            <div className={`right window-view `} >
                <div className="routes ">

                    <Link className="nav-link relative inline-block after:content-[''] after:absolute after:left-1/2 after:bottom-0 after:w-0 after:h-[2px] after:bg-gradient-to-r after:from-green-700 after:to-black after:transition-all after:duration-300 hover:after:w-full hover:after:left-0" href={"/"} >Home</Link>
                    <Link className="nav-link relative inline-block after:content-[''] after:absolute after:left-1/2 after:bottom-0 after:w-0 after:h-[2px] after:bg-gradient-to-r after:from-green-700 after:to-black after:transition-all after:duration-300 hover:after:w-full hover:after:left-0" href={"/dashboard"} >Dashboard</Link>




                    <Link className="nav-link relative inline-block after:content-[''] after:absolute after:left-1/2 after:bottom-0 after:w-0 after:h-[2px] after:bg-gradient-to-r after:from-green-700 after:to-black after:transition-all after:duration-300 hover:after:w-full hover:after:left-0" href={"/profile"} >Profile</Link>



                    <button className="nav-link relative inline-block after:content-[''] after:absolute after:left-1/2 after:bottom-0 after:w-0 after:h-[2px] after:bg-gradient-to-r after:from-green-700 after:to-black after:transition-all after:duration-300 hover:after:w-full hover:after:left-0 cursor-pointer">Logout</button>



                </div>
            </div>
            <i onClick={() => setOpen(!open)} className="menu ri-menu-fold-fill"></i>
            <div ref={mobileMenuRef} className={`right mobile-view top-0 w-full absolute bg-gradient-to-br from-red-400 to-red-900 h-screen ${open ? "block" : "hidden"}`}
                style={{ backdropFilter: 'blur(10px)' }}>
                <i onClick={handleClose} className="close ri-close-circle-fill"></i>
                <div className="routes flex flex-col ">
                    <Link onClick={handleLinkClick} className="mobile-nav-link relative inline-block after:content-[''] after:absolute after:left-1/2 after:bottom-0 after:w-0 after:h-[2px] after:bg-gradient-to-r after:from-green-700 after:to-black after:transition-all after:duration-300 hover:after:w-full hover:after:left-0" href={"/"} >Home</Link>
                    <Link onClick={handleLinkClick} className="mobile-nav-link relative inline-block after:content-[''] after:absolute after:left-1/2 after:bottom-0 after:w-0 after:h-[2px] after:bg-gradient-to-r after:from-green-700 after:to-black after:transition-all after:duration-300 hover:after:w-full hover:after:left-0" href={"/dashboard"} >Dashboard</Link>
                    <Link onClick={handleLinkClick} className="mobile-nav-link relative inline-block after:content-[''] after:absolute after:left-1/2 after:bottom-0 after:w-0 after:h-[2px] after:bg-gradient-to-r after:from-green-700 after:to-black after:transition-all after:duration-300 hover:after:w-full hover:after:left-0" href={"/profile"} >Profile</Link>
                    <button className="mobile-nav-link relative inline-block after:content-[''] after:absolute after:left-1/2 after:bottom-0 after:w-0 after:h-[2px] after:bg-gradient-to-r after:from-green-700 after:to-black after:transition-all after:duration-300 hover:after:w-full hover:after:left-0">Logout</button>

                </div>
            </div>
        </div>
    )
}

export default Navbar
