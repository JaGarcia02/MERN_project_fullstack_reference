import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { MessengerChat } from "react-messenger-chat-plugin";
import { useNavigate } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import Footer from "../components/Footer";
import { BsFillTelephoneFill } from "react-icons/bs";
import { MdEmail, MdLocationPin } from "react-icons/md";
import GoogleMapReact from "google-map-react";
import { AiFillFacebook, AiOutlineClose } from "react-icons/ai";
import ReservationSticky from "../components/ReservationSticky";
const Home = () => {
  const navigate = useNavigate();
  const [slideIndex, setSlideIndex] = useState(1);
  const [pickedImg, setPickedImg] = useState(null);

  const imageData = [
    { id: 1, strImg: "/imgs/pubpriv1.jpg" },
    { id: 2, strImg: "/imgs/pubpriv2.jpg" },
    { id: 3, strImg: "/imgs/pubpriv3.jpg" },
  ];

  const nextSlide = () => {
    if (slideIndex !== imageData.length) {
      setSlideIndex(slideIndex + 1);
    } else if (slideIndex === imageData.length) {
      setSlideIndex(1);
    }
  };

  useEffect(() => {
    const autoPlay = setInterval(nextSlide, 5000);
    return () => clearInterval(autoPlay);
  }, [nextSlide]);

  const clicked_img = (imgUrl) => {
    setPickedImg(imgUrl);
  };

  useEffect(() => {
    const close = (e) => {
      if (e.keyCode === 27) {
        setPickedImg(null);
      }
    };
    window.addEventListener("keydown", close);

    return () => {
      window.removeEventListener("keydown", close);
    };
  }, []);

  return (
    <div className="w-screen min-h-screen flex flex-col relative">
      <Navbar />
      <ReservationSticky />
      <div className="w-full relative h-screen">
        {imageData.map((data, index) => {
          return (
            <div
              className={
                slideIndex === index + 1 ? "slider-anim" : "slider-active "
              }
              key={data.id}
            >
              <img
                src={`/imgs/pubpriv${index + 1}.jpg`}
                className="w-screen h-screen object-cover <md:(w-full)"
              />
            </div>
          );
        })}
      </div>

      <span className="text-center text-black font-bold mt-15 text-[30px]">
        OFFERS AND DEAL
      </span>
      <div className="flex-row justify-evenly text-center relative h-full  w-full flex <md:(text-center items-center justify-center flex-col flex w-full mb-40 )">
        <div className="flex-col w-70 mt-3 <md:( items-center justify-center flex)">
          <img
            src="/imgs/sched.jpg"
            className="h-70 w-70 rounded-md mt-3 object-contain cursor-pointer"
            onClick={() => clicked_img("/imgs/sched.jpg")}
          />
        </div>
        <div className="flex-col w-70 mt-3 <md:( items-center justify-center flex)">
          <img
            src="/imgs/package.png"
            className="h-70 w-70 rounded-md mt-3 object-contain cursor-pointer"
            onClick={() => clicked_img("/imgs/package.png")}
          />
        </div>
        <div className="flex-col w-70 mt-3 ">
          <img
            src="/imgs/dikoalam.png"
            className="h-70 w-70 mt-3 rounded-md  object-contain cursor-pointer"
            onClick={() => clicked_img("/imgs/dikoalam.png")}
          />
        </div>
        <div className="flex-col  w-70 mt-3 ">
          <img
            src="/imgs/what.png"
            className="h-70 w-70 rounded-md mt-3 object-contain cursor-pointer"
            onClick={() => clicked_img("/imgs/what.png")}
          />
        </div>
      </div>

      <div className="flex-row justify-evenly text-center h-full w-full flex mt-20 <md:(text-center items-center justify-center flex-col flex w-full mb-40 )">
        <div className="flex-col w-70 mt-3 <md:( items-center justify-center flex)">
          <span className="font-serif font-bold">Facilities</span>
          <img
            src="/imgs/ktv.jpg"
            className="h-40 w-70 rounded-md mt-3 object-cover cursor-pointer"
            onClick={() => clicked_img("/imgs/ktv.jpg")}
          />
          <span className="font-serif text-[15px] <md:(text-[10px]) <md:(w-full)">
            Visit our environmentally friendly garden resort to unwind, breathe
            in Bulacan's fresh air, and take use of our services while taking in
            the resort's amazing scenery.
          </span>
        </div>
        <div className="flex-col w-70 mt-3 ">
          <span className="font-serif font-bold">What's On</span>
          <img
            src="/imgs/bgpool.jpg"
            className="h-40 w-70 mt-3 rounded-md  object-cover cursor-pointer"
            onClick={() => clicked_img("/imgs/bgpool.jpg")}
          />
          <span className="font-serif text-[15px] <md:(text-[10px])">
            Enjoy our pool that can provide relaxation and enjoy your holiday
            with us, we assure that everything you need we can provide with
            great service and quality
          </span>
        </div>
        <div className="flex-col h-50 w-70 mt-3 ">
          <span className="font-serif font-bold">Celebrate with us</span>
          <img
            src="/imgs/celeb.jpg"
            className="h-40 w-70 rounded-md mt-3  object-cover cursor-pointer"
            onClick={() => clicked_img("/imgs/celeb.jpg")}
          />{" "}
          <span className="font-serif text-[15px] <md:(text-[10px])">
            Escape to our beautiful resort and celebrate with us! Whether you're
            here for a romantic getaway, a family vacation, or a special
            occasion, we have everything you need to make your stay
            unforgettable.
          </span>
        </div>
      </div>

      <div className="w-full flex <md:(flex-col flex mt-10  )">
        <div className="h-100 flex items-center justify-center flex flex-1 flex-col <md:(flex flex-col w-full )">
          <div>
            <span className="font-resortlogo text-[40px] text-left <md:(text-[20px])">
              Contact us
            </span>
            <span className=" mt-6 font-resortlogocontact h-10 items-center flex  text-[15px]  mt-2 <md:(text-[10px])">
              <BsFillTelephoneFill className="mr-2 text-[20px] font-resortlogocontactk" />
              0919 806 0645 <br />
              (044) 308-5247
            </span>
            <span className="  font-resortlogocontact h-10 items-center flex text-[15px]  <md:(text-[10px]">
              <MdEmail className="mr-2 text-[20px]  " />
              njegardenresortandpavillion@gmail.com
            </span>
            <p className="  font-resortlogocontact h-10 items-center flex text-[15px] hover:text-blue-700 <md:(text-[10px]">
              <AiFillFacebook className="mr-2 text-[20px]  " />
              <a
                href="https://www.facebook.com/NJEresortlegitaccount"
                target="_blank"
              >
                {" "}
                https://www.facebook.com/NJEresortlegitaccount
              </a>
            </p>
            <span className="  font-resortlogocontact h-10 items-center flex text-[15px] <md:(text-[10px]">
              <MdLocationPin className="mr-2 text-[20px]  " />
              #99 A. MABINI ST. BRGY SABANG BALIUAG,BULACAN, Baliuag,
              Philippines
            </span>
          </div>
        </div>
        <div className="h-100 flex items-center justify-start flex flex-1 <md:(w-[100%] justify-center px-4 my-9)">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3854.5226877297073!2d120.90560471479357!3d14.96366278957208!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397000fef69e9a3%3A0xc2381c2dc06d3a16!2sJE%20Resort!5e0!3m2!1sen!2sph!4v1680363529525!5m2!1sen!2sph"
            width="600"
            height="250"
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>

      <MessengerChat
        pageId="110248655314753"
        language="en_US"
        themeColor={"#0733f9"}
        bottomSpacing={20}
        greetingDialogDisplay={"show"}
        debugMode={true}
      />
      <Footer />
      {pickedImg && (
        <div className="w-screen h-screen fixed flex top-0 left-0 items-center justify-center bg-black/80 z-10000">
          <AiOutlineClose
            className="absolute top-2 right-8 text-[50px] cursor-pointer text-white"
            onClick={() => setPickedImg(null)}
          />
          <img src={pickedImg} className="h-150 w-150 object-contain" />
        </div>
      )}
    </div>
  );
};

export default Home;
