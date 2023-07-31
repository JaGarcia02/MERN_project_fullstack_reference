import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { MessengerChat } from "react-messenger-chat-plugin";
import { useNavigate } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import Footer from "../components/Footer";
import { BsFillTelephoneFill } from "react-icons/bs";
import { MdEmail, MdLocationPin } from "react-icons/md";
import GoogleMapReact from "google-map-react";
import ReservationSticky from "../components/ReservationSticky";
const Home = () => {
  const navigate = useNavigate();
  const [slideIndex, setSlideIndex] = useState(1);

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

  return (
    <div className="w-screen flex flex-col ">
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

      <div className="flex-row justify-evenly text-center h-full w-full flex <md:(text-center items-center justify-center flex-col flex w-full mb-40 )">
        <div className="flex-col w-70 mt-3 <md:( items-center justify-center flex)">
          <span className="font-serif font-bold">Facilities</span>
          <img
            src="/imgs/ktv.jpg"
            className="h-40 w-70 rounded-md mt-3 object-cover "
          />
          <span className="font-serif text-[15px] <md:(text-[10px]) <md:(w-full)">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s,
          </span>
        </div>
        <div className="flex-col w-70 mt-3 ">
          <span className="font-serif font-bold">What's On</span>
          <img
            src="/imgs/art.jpg"
            className="h-40 w-70 mt-3 rounded-md  object-cover "
          />
          <span className="font-serif text-[15px] <md:(text-[10px])">
            The first museum exhibition to approach the movement from this
            perspective, LACMA’s new show will comprise 90 paintings and 45
            works on paper from a diverse..
          </span>
        </div>
        <div className="flex-col h-50 w-70 mt-3 ">
          <span className="font-serif font-bold">What's Hot</span>
          <img
            src="/imgs/panagbenga.jpg"
            className="h-40 w-70 rounded-md mt-3  object-cover "
          />{" "}
          <span className="font-serif text-[15px] <md:(text-[10px])">
            Panagbenga Festival is a month-long annual flower occasion in
            Baguio. The term is of Kankanaey origin, meaning "season of
            blooming". The festival, held in February.
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
              +6391234567890
            </span>
            <span className="  font-resortlogocontact h-10 items-center flex text-[15px]  <md:(text-[10px]">
              <MdEmail className="mr-2 text-[20px]  " />
              example@example.com
            </span>
            <span className="  font-resortlogocontact h-10 items-center flex text-[15px] <md:(text-[10px]">
              <MdLocationPin className="mr-2 text-[20px]  " /># street, sample
              barangay. District,City
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
    </div>
  );
};

export default Home;
