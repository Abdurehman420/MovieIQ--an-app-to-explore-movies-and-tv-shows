import ContentWrapper from "./ContentWrapper";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
} from "react-icons/fa6";
const Footer = () => {
  return (
    <footer className="    bg-extraDarkPink    py-12  z-50 mt-8 ">
      <ContentWrapper>
        <div className="footerContent flex flex-col justify-center items-center sm:space-y-7 space-y-9 ">
          <ul className=" list-none flex  font-bold flex-wrap  child-hover:text-lightBlue child:duration-200 child:cursor-pointer  justify-center gap-5 ">
            <li>Terms Of Use</li>
            <li> Privacy Policy</li>
            <li> About</li>
            <li> Blog</li>
            <li> FAQ</li>
          </ul>
          <p className=" text-center   opacity-50 tracking-wide">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Labore
            dolorum maxime quos consectetur laborum sunt ipsam molestias hic
            tempore non placeat laudantium debitis saepe, aliquid adipisci fugit
            distinctio? Quae, temporibus totam ratione minima ex quo sequi alias
            in delectus ipsam.
          </p>
          <div className="social list-none flex space-x-5">
            <span>
              <FaFacebookF />
            </span>
            <span>
              <FaInstagram />
            </span>
            <span>
              <FaTwitter />
            </span>
            <span>
              <FaLinkedin />
            </span>
          </div>
        </div>
      </ContentWrapper>
    </footer>
  );
};

export default Footer;
