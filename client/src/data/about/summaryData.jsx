import React from "react";
import { BsFacebook, BsInstagram, BsTwitter, BsGithub } from "react-icons/bs";
import aboutImg from "../../assets/images/about.png";

export const summaryData = {
  aboutBanner: {
    imgSrc: aboutImg,
    width: "370",
    height: "220",
    alt: "about banner",
  },
  aboutDetails: {
    title: "Aspiring Developer and Coding Bootcamp Student",
    text: "I'm Preston Nguyen, a passionate and dedicated coding bootcamp student. I'm focused on learning full-stack web development and continuously improving my programming skills to build impactful and innovative projects.",
  },
  aboutList: [
    {
      title: "Name",
      value: "Preston Nguyen",
    },
    {
      title: "Phone Number",
      value: "(703) -973-8176",
    },
    {
      title: "Email Address",
      value: "prestonnguyen2001@gmail.com",
    },
    {
      title: "Social Network",
      socialLinks: [
        { href: "#", title: "Facebook", icon: <BsFacebook /> },
        { href: "#", title: "Instagram", icon: <BsInstagram /> },
        { href: "#", title: "Twitter", icon: <BsTwitter /> },
        { href: "#", title: "Github", icon: <BsGithub /> },
      ],
    },
  ],
};
