import React from "react";
import Link from "next/link";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import Image from "next/image";

const Footer = () => {
  return (
    <>
      <div className="w-screen px-10 lg:px-20 py-5 lg:py-10 bg-[#1A8FE3] text-white relative bottom-0 mt-10 lg:mt-0">
        <footer className="grid grid-cols-1 lg:grid-cols-4 gap-5 lg:gap-10">
          <div className="flex flex-col gap-2">
            <Image
              src="/images/gkcc.png"
              alt="Logo"
              width={200}
              height={100}
              className="rounded-3xl object-cover bg-white w-[90px] sm:w-[150px] md:w-[200px]"
            />
            <div className="flex gap-5 lg:gap-10 mt-2 items-center lg:justify-start">
              <Link
                href="#"
                aria-label="Facebook"
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg lg:text-xl"
              >
                <FaFacebook />
              </Link>
              <Link
                href="https://x.com/globalkokanicc"
                aria-label="Twitter"
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg lg:text-xl"
              >
                <FaTwitter />
              </Link>
              <Link
                href="https://www.instagram.com/globalkokani/"
                aria-label="Instagram"
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg lg:text-xl"
              >
                <FaInstagram />
              </Link>
              <Link
                href="https://www.linkedin.com/in/global-kokani-committees-council-569472332/"
                aria-label="LinkedIn"
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg lg:text-xl"
              >
                <FaLinkedin />
              </Link>
            </div>
          </div>
          <div>
            <h3 className="font-medium text-white text-lg lg:text-xl">
              POPULAR LINKS
            </h3>
            <ul>
              <li className="text-sm lg:text-base">Trust</li>
              <li className="text-sm lg:text-base">Teamwork</li>
              <li className="text-sm lg:text-base">Innovation</li>
              <li className="text-sm lg:text-base">Quality</li>
              <li className="text-sm lg:text-base">Integrity</li>
              <li className="text-sm lg:text-base">Commitment</li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium text-white text-lg lg:text-xl">
              GET IN TOUCH
            </h3>
            <ul>
              <li>
                <Link
                  href="mailto:globalkokanicc@gmail.com"
                  className="text-sm lg:text-base hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  globalkokanicc@gmail.com
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium text-white text-lg lg:text-xl">
              WHO WE ARE
            </h3>
            <ul>
              <li>
                <Link
                  href="/aboutus"
                  className="text-sm lg:text-base hover:underline"
                >
                  Mission
                </Link>
              </li>
              <li>
                <Link
                  href="/aboutus"
                  className="text-sm lg:text-base hover:underline"
                >
                  Vision
                </Link>
              </li>
              <li>
                <Link
                  href="/managements/office-bearers"
                  className="text-sm lg:text-base hover:underline"
                >
                  Management
                </Link>
              </li>
              <li>
                <Link
                  href="/aboutus"
                  className="text-sm lg:text-base hover:underline"
                >
                  Our story
                </Link>
              </li>
            </ul>
          </div>
        </footer>
      </div>
      <div className="text-center w-screen py-2">
        <p className="text-sm lg:text-base font-bold">
          &copy; 2024 Global Kokani Committees&apos; Council. All rights
          reserved.
        </p>
      </div>
    </>
  );
};

export default Footer;
