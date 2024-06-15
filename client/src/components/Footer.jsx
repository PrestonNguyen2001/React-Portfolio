import { Footer } from "flowbite-react";
import { Link } from "react-router-dom";
import { BsFacebook, BsInstagram, BsTwitter, BsGithub } from "react-icons/bs";

export default function FooterCom() {
  return (
    <Footer
      container
      className="border-t-2 bg-light-background dark:bg-dark-background text-light-text dark:text-dark-text"
    >
      <div className="w-full max-w-7xl mx-auto">
        <div className="grid w-full justify-between sm:flex md:grid-cols-1">
          <div className="mt-5">
            <Link
              to="/"
              className="self-center whitespace-nowrap text-lg sm:text-xl font-semibold"
            >
              <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
                Preston&apos;s
              </span>
              Portfolio
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 sm:gap-6">
            <div>
              <Footer.Title
                title="about"
                className="text-light-text dark:text-dark-text"
              />
              <Footer.LinkGroup col>
                <Footer.Link
                  href="/about"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-light-text dark:text-dark-text"
                >
                  Preston&apos;s Portfolio
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title
                title="Follow Us"
                className="text-light-text dark:text-dark-text"
              />
              <Footer.LinkGroup col>
                <Footer.Link
                  href="https://github.com/PrestonNguyen2001"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-light-text dark:text-dark-text"
                >
                  Github Account
                </Footer.Link>
                <Footer.Link
                  href="linkedin.com/in/preston-nguyen-8a08a52a8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-light-text dark:text-dark-text"
                >
                  LinkedIn
                </Footer.Link>
                <Footer.Link
                  href="#"
                  className="text-light-text dark:text-dark-text"
                >
                  Instagram
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title
                title="Legal"
                className="text-light-text dark:text-dark-text"
              />
              <Footer.LinkGroup col>
                <Footer.Link
                  href="#"
                  className="text-light-text dark:text-dark-text"
                >
                  Privacy Policy
                </Footer.Link>
                <Footer.Link
                  href="#"
                  className="text-light-text dark:text-dark-text"
                >
                  Terms &amp; Conditions
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
        <Footer.Divider />
        <div className="w-full sm:flex sm:items-center sm:justify-between">
          <Footer.Copyright
            href="#"
            by="Preston's Blog"
            year={new Date().getFullYear()}
            className="text-light-text dark:text-dark-text"
          />
          <div className="flex gap-6 sm:mt-0 mt-4 sm:justify-center">
            <Footer.Icon
              href="#"
              icon={BsFacebook}
              className="text-light-text dark:text-dark-text"
            />
            <Footer.Icon
              href="#"
              icon={BsInstagram}
              className="text-light-text dark:text-dark-text"
            />
            <Footer.Icon
              href="#"
              icon={BsTwitter}
              className="text-light-text dark:text-dark-text"
            />
            <Footer.Icon
              href="https://github.com/PrestonNguyen2001"
              icon={BsGithub}
              className="text-light-text dark:text-dark-text"
            />
          </div>
        </div>
      </div>
    </Footer>
  );
}
