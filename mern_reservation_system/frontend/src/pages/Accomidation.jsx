import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { API_URL, API_URL_ROOMS } from "../utils/Urls";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import LoginModal from "../components/Booking/LoginModal";
import { AnimatePresence } from "framer-motion";
import Fade from "react-reveal/Fade";
import Footer from "../components/Footer";
import { MessengerChat } from "react-messenger-chat-plugin";
import ReservationSticky from "../components/ReservationSticky";

const Accomidation = () => {
  const [rooms, setRooms] = useState([]);
  const [scrollValue, setScrollValue] = useState(0);

  useEffect(() => {
    let subscribe = true;
    axios
      .get(API_URL_ROOMS + "get-rooms")
      .then((res) => {
        if (subscribe) setRooms(res.data);
      })
      .catch((err) => console.log(err));

    return () => (subscribe = false);
  }, []);

  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollValue(position);
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrollValue]);

  return (
    <div className=" w-screen flex flex-col justify-start items-center <md:(flex-col flex w-full  items-center justify-start)">
      <Navbar />
      <ReservationSticky />
      {/* header */}
      <div className=" items-start sticky z-20 bg-glasss justify-start w-full h-30  flex flex-col p-2">
        <span className="text-black text-[30px] mt-3 ml-3">Accommodation</span>
        <span className="text-black text-[20px] mt-3 ml-3 font-bold">
          Name of Resort
        </span>
        <span className="text-black text-[10px] mt-3 mb-5 ml-3">
          622 Ventura Boulevard, Beverly Hills, 556644 United States of America
        </span>
      </div>
      {/* header */}
      <div className="flex flex-col text-black items-center bg-gray-300 justify-evenly <md:(flex-col flex w-full items-start justify-center)">
        <div className="w-[75%] mt-15 flex <md:(flex flex-col justify-center w-full)">
          <div className="flex-1 flex flex-col items-center justify-end <md:(justify-center)">
            <Fade left cascade>
              <div className="flex flex-wrap w-170 justify-end <md:(w-full flex flex-wrap justify-center) ">
                <img
                  src="/imgs/pubpool1.jpg"
                  className=" h-40 w-80 mr-2 mb-2 rounded-md shadow-md shadow-gray-500  <md:(h-40 w-70 mr-2 mb-2 rounded-md shadow-md shadow-gray-500)"
                />
                <img
                  src="/imgs/pubpool2.jpg"
                  className=" h-50 w-80 mr-2 mb-2 rounded-md shadow-md shadow-gray-500  <md:(h-40 w-70 mr-2 mb-2 rounded-md shadow-md shadow-gray-500)"
                />
                <img
                  src="/imgs/pubpool3.jpg"
                  className=" h-50 w-80  mr-2 mb-2  rounded-md shadow-md shadow-gray-500  <md:(h-40 w-70 mr-2 mb-2 rounded-md shadow-md shadow-gray-500)"
                />
                <img
                  src="/imgs/pubpool4.jpg"
                  className=" h-50 w-80 mr-2 mb-2  rounded-md shadow-md shadow-gray-500 <md:(h-40 w-70 mr-2 mb-2  rounded-md shadow-md shadow-gray-500)"
                />
              </div>
            </Fade>
          </div>
          <Fade right cascade>
            <div className="flex-1 flex items-center justify-center <md:(flex flex-col w-full)">
              <div className="w-150 h-75 shadow-sm  shadow-gray-500  text-center flex flex-col items-center justify-start <md:(flex flex-col  w-[90%] p-2 h-90)">
                <span className="text-black h-5 text-center text-[15px] mt-3  font-bold">
                  Public Pools
                </span>
                <div className="flex w-full <md:(flex flex-col items-center justify-center w-full )">
                  <div className="flex justify-start w-120  flex-col <md:(w-full)">
                    <span className="text-black ml-2 text-left text-[13px] w-[100%]  mt-3 font-bold <md:(ml-0)">
                      Inclution
                    </span>
                    <span className="text-black ml-10 text-left text-[13px] w-[100%]  mt-3 font-serif <md:(ml-0)">
                      ● 2 Pool Access (4ft to 6ft deep) and (5ft deep)
                    </span>
                    <span className="text-black ml-10 text-left text-[13px] w-[100%]  mt-3 font-serif <md:(ml-0)">
                      ● Can accommodate maximum 300 persons
                    </span>
                    <span className="text-black ml-10 text-left text-[13px] w-[100%]  mt-3 font-serif <md:(ml-0)">
                      ● 13 cottages (A1 to A13) for 3-4 capacity --------------
                      Php 300.00
                    </span>

                    <span className="text-black ml-10 text-left text-[13px] w-[100%]  mt-3 font-serif <md:(ml-0)">
                      ● 7 cottages (B1 to B7) for 10-15 capacity ---------------
                      Php 600.00
                    </span>
                    <span className="text-black ml-10 text-left text-[13px] w-[100%]  mt-3 font-serif <md:(ml-0)">
                      ● Slide swimming pool
                    </span>
                    <span className="text-black ml-10 text-left text-[13px] w-[100%]  mt-3 font-serif <md:(ml-0)">
                      ● Bathroom
                    </span>
                  </div>
                  <div className="flex justify-start w-120  flex-col <md:(w-full)">
                    <span className="text-black text-left w-full ml-2 text-[13px] mt-3  font-bold <md:(ml-0)">
                      Entrance Fee Rate
                    </span>
                    <span className="text-black ml-8 text-left text-[13px] w-[100%]  mt-2 font-bold <md:(ml-0)">
                      Day Swimming (9am to 4pm)
                    </span>
                    <span className="text-black ml-10 text-left text-[13px] w-[100%]  mt-3 font-serif <md:(ml-0)">
                      ● Adult ----------------- Php 150 per head
                    </span>
                    <span className="text-black ml-10 text-left text-[13px] w-[100%]  mt-3 font-serif <md:(ml-0)">
                      ● Kids (3ft below) ---- Php 150 per head
                    </span>
                  </div>{" "}
                </div>{" "}
              </div>
            </div>
          </Fade>
        </div>

        <div className="w-[75%] mt-15 flex <md:(flex flex-col w-full justify-center items-center)">
          <Fade left when={scrollValue > 400}>
            <div className="flex flex-1 items-center justify-end <md:(flex w-[90%] h-300 justify-center)">
              <div className="w-160 h-75 shadow-sm bg-green-200 shadow-gray-500 border border-black text-center flex flex-col items-center justify-start <md:(flex flex-col justify-center w-full h-140 p-2)">
                <span className="text-black h-5 text-center text-[15px] mt-3  font-bold">
                  Private Pools
                </span>
                <div className="flex w-full flex-row  <md:(flex flex-col items-center justify-center w-full )">
                  <div className="flex justify-start w-150  flex-col <md:(w-full)">
                    <span className="text-black ml-2 text-left text-[13px] w-[100%]  mt-3 font-bold <md:(ml-0)">
                      Inclution
                    </span>
                    <span className="text-black ml-10 text-left text-[13px] w-[100%]  mt-3 font-serif <md:(ml-0)">
                      ● 1 Pool Access (5ft deep)
                    </span>
                    <span className="text-black ml-10 text-left text-[13px] w-[100%]  mt-3 font-serif <md:(ml-0)">
                      ● Can accommodate 30 to 50 pax
                    </span>
                    <span className="text-black ml-10 text-left text-[13px] w-[100%]  mt-3 font-serif <md:(ml-0)">
                      ● Available for 7 hours (9:00 am to 4:00pm)
                    </span>
                    <span className="text-black ml-10 text-left text-[13px] w-[100%]  mt-3 font-serif <md:(ml-0)">
                      ● 15 cottages
                    </span>
                    <span className="text-black ml-10 text-left text-[13px] w-[100%]  mt-3 font-serif <md:(ml-0)">
                      ● Grilling Area
                    </span>
                    <span className="text-black ml-10 text-left text-[13px] w-[100%]  mt-3 font-serif <md:(ml-0)">
                      ● Mini Pavillion
                    </span>
                    <span className="text-black ml-10 text-left text-[13px] w-[100%]  mt-3 font-serif <md:(ml-0)">
                      ● 15 Tables and benches with umbrella
                    </span>
                    <span className="text-black ml-10 text-left text-[13px] w-[100%]  mt-3 font-serif <md:(ml-0)">
                      ● Wide Parking Space
                    </span>
                    <span className="text-black ml-10 text-left text-[13px] w-[100%]  mt-3 font-serif <md:(ml-0)">
                      ● Comfort Room/Shower Rooms
                    </span>
                  </div>
                  <div className="flex justify-start w-150  flex-col <md:(w-full)">
                    <span className="text-black ml-2 text-left text-[13px] w-[100%]  mt-3 font-bold <md:(ml-0)">
                      Rate
                    </span>
                    <span className="text-black ml-8 text-left  text-[12px] w-[100%]  mt-2 font-bold <md:(ml-0)">
                      WEEKDAYS (Monday to Thursday)
                    </span>
                    <span className="text-black ml-10 text-left text-[13px] w-[100%]  mt-3 font-serif <md:(ml-0)">
                      ● Day tour Php 5,000 (9am to 4pm ONLY)
                    </span>

                    <span className="text-black ml-10 text-left text-[13px] w-[100%]  mt-3 font-serif <md:(ml-0)">
                      ● Night tour Php 6,000 (3pm to 10pm ONLY)
                    </span>
                    <span className="text-black ml-8 text-left  text-[12px] w-[100%]  mt-2 font-bold <md:(ml-0)">
                      WEEKEND (Friday to Sunday)
                    </span>
                    <span className="text-black ml-10 text-left text-[13px] w-[100%]  mt-3 font-serif <md:(ml-0)">
                      ● Day tour Php 6,000 (9am to 4pm ONLY)
                    </span>
                    <span className="text-black ml-10 text-left text-[13px] w-[100%]  mt-3 font-serif <md:(ml-0)">
                      ● Night tour Php 8,000 (3pm to 10pm ONLY)
                    </span>
                    <span className="text-black ml-2 text-left text-[13px] w-[100%]  mt-3 font-bold <md:(ml-0)">
                      Additional Fee:
                    </span>
                    <span className="text-black ml-10 text-left text-[13px] w-[100%]  mt-3 font-serif <md:(ml-0)">
                      ● Php 1,000 per exceeding time
                    </span>
                    <span className="text-black ml-10 text-left text-[13px] w-80  mt-3 font-serif <md:(w-full ml-0)">
                      ● A fee of Php 100 per head shall be paid in excess of
                      designated allowable
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Fade>
          <Fade cascade right when={scrollValue > 400}>
            <div className="w-300 flex-1 flex flex-wrap items-center justify-center <md:(flex flex-col w-full mt-10)">
              <img
                src="/imgs/priv2.jpg"
                className=" h-50 w-80 mr-2 mb-2 rounded-md shadow-md shadow-gray-500 "
              />
              <img
                src="/imgs/priv1.jpg"
                className=" h-50 w-80  mr-2 mb-2  rounded-md shadow-md shadow-gray-500 "
              />
              <img
                src="/imgs/priv3.jpg"
                className=" h-50 w-80 mr-2 mb-2 rounded-md shadow-md shadow-gray-500 "
              />{" "}
            </div>
          </Fade>
        </div>

        <div className="w-[75%] text-center flex flex-col justify-center items-center <md:(flex flex-col w-full px-5)">
          <Fade cascade right when={scrollValue > 600}>
            <div className="mt-20 w-320 <md:(flex flex-col w-full )">
              <img
                src="/imgs/pubpriv2.jpg"
                className="h-120 w-120 object-cover float-left mr-5 rounded-md shadow-md shadow-gray-500 "
              />
              <p className="text-justify w-full">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Faucibus pulvinar elementum integer enim neque volutpat ac
                tincidunt vitae. Egestas erat imperdiet sed euismod nisi porta.
                Eget mauris pharetra et ultrices neque ornare aenean euismod
                elementum. Diam volutpat commodo sed egestas egestas fringilla
                phasellus. Id neque aliquam vestibulum morbi blandit cursus
                risus at. Dignissim diam quis enim lobortis scelerisque
                fermentum dui faucibus in. Et netus et malesuada fames ac. A
                arcu cursus vitae congue mauris rhoncus. Varius vel pharetra vel
                turpis nunc. Erat velit scelerisque in dictum non consectetur a.
                Odio ut sem nulla pharetra diam sit. Aliquet porttitor lacus
                luctus accumsan tortor posuere ac ut. A erat nam at lectus urna
                duis convallis convallis. Nunc sed augue lacus viverra vitae
                congue eu consequat. Sed augue lacus viverra vitae congue eu
                consequat. Egestas dui id ornare arcu odio ut sem. Morbi tempus
                iaculis urna id volutpat lacus laoreet non. Turpis in eu mi
                bibendum neque egestas congue quisque. Ut pharetra sit amet
                aliquam id. Dignissim suspendisse in est ante in nibh mauris
                cursus mattis. Congue mauris rhoncus aenean vel. Pretium
                vulputate sapien nec sagittis aliquam malesuada bibendum arcu
                vitae. Integer malesuada nunc vel risus. Morbi enim nunc
                faucibus a pellentesque sit amet. Accumsan sit amet nulla
                facilisi morbi. Varius vel pharetra vel turpis nunc. Elementum
                curabitur vitae nunc sed velit dignissim sodales ut eu. Diam ut
                venenatis tellus in metus vulputate eu scelerisque felis. At
                consectetur lorem donec massa sapien faucibus et molestie ac. At
                imperdiet dui accumsan sit amet. Aliquet risus feugiat in ante
                metus dictum at tempor commodo. Id neque aliquam vestibulum
                morbi blandit cursus risus at. Egestas integer eget aliquet
                nibh. Fringilla phasellus faucibus scelerisque eleifend donec
                pretium vulputate sapien. Sagittis purus sit amet volutpat
                consequat mauris nunc. Viverra maecenas accumsan lacus vel
                facilisis. Nullam non nisi est sit. Et leo duis ut diam.
                Condimentum mattis pellentesque id nibh tortor id aliquet. Etiam
                erat velit scelerisque in. Faucibus in ornare quam viverra orci
                sagittis. Commodo elit at imperdiet dui. Tortor consequat id
                porta nibh venenatis cras. Vitae congue eu consequat ac felis
                donec et. Eget aliquet nibh praesent tristique magna sit amet
                purus gravida. Mi in nulla posuere sollicitudin aliquam
                ultrices. Fusce id velit ut tortor pretium viverra. Lorem mollis
                aliquam ut porttitor leo a diam sollicitudin. Ac turpis egestas
                sed tempus. Arcu ac tortor dignissim convallis aenean et tortor.
                Congue eu consequat ac felis. Metus vulputate eu scelerisque
                felis imperdiet proin fermentum. Viverra nam libero justo
                laoreet sit amet. Posuere ac ut consequat semper viverra. Duis
                ut diam quam nulla porttitor massa. Interdum consectetur libero
                id faucibus nisl.
              </p>
            </div>
          </Fade>
          <Fade left cascade when={scrollValue > 1200}>
            <div className="mt-20 w-320 <md:(flex flex-col w-full)">
              <img
                src="/imgs/pubpriv3.jpg"
                className=" h-120 w-120 object-cover float-right ml-5 rounded-md shadow-md shadow-gray-500 <md:(ml-0)"
              />
              <p className="text-justify w-full">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Faucibus pulvinar elementum integer enim neque volutpat ac
                tincidunt vitae. Egestas erat imperdiet sed euismod nisi porta.
                Eget mauris pharetra et ultrices neque ornare aenean euismod
                elementum. Diam volutpat commodo sed egestas egestas fringilla
                phasellus. Id neque aliquam vestibulum morbi blandit cursus
                risus at. Dignissim diam quis enim lobortis scelerisque
                fermentum dui faucibus in. Et netus et malesuada fames ac. A
                arcu cursus vitae congue mauris rhoncus. Varius vel pharetra vel
                turpis nunc. Erat velit scelerisque in dictum non consectetur a.
                Odio ut sem nulla pharetra diam sit. Aliquet porttitor lacus
                luctus accumsan tortor posuere ac ut. A erat nam at lectus urna
                duis convallis convallis. Nunc sed augue lacus viverra vitae
                congue eu consequat. Sed augue lacus viverra vitae congue eu
                consequat. Egestas dui id ornare arcu odio ut sem. Morbi tempus
                iaculis urna id volutpat lacus laoreet non. Turpis in eu mi
                bibendum neque egestas congue quisque. Ut pharetra sit amet
                aliquam id. Dignissim suspendisse in est ante in nibh mauris
                cursus mattis. Congue mauris rhoncus aenean vel. Pretium
                vulputate sapien nec sagittis aliquam malesuada bibendum arcu
                vitae. Integer malesuada nunc vel risus. Morbi enim nunc
                faucibus a pellentesque sit amet. Accumsan sit amet nulla
                facilisi morbi. Varius vel pharetra vel turpis nunc. Elementum
                curabitur vitae nunc sed velit dignissim sodales ut eu. Diam ut
                venenatis tellus in metus vulputate eu scelerisque felis. At
                consectetur lorem donec massa sapien faucibus et molestie ac. At
                imperdiet dui accumsan sit amet. Aliquet risus feugiat in ante
                metus dictum at tempor commodo. Id neque aliquam vestibulum
                morbi blandit cursus risus at. Egestas integer eget aliquet
                nibh. Fringilla phasellus faucibus scelerisque eleifend donec
                pretium vulputate sapien. Sagittis purus sit amet volutpat
                consequat mauris nunc. Viverra maecenas accumsan lacus vel
                facilisis. Nullam non nisi est sit. Et leo duis ut diam.
                Condimentum mattis pellentesque id nibh tortor id aliquet. Etiam
                erat velit scelerisque in. Faucibus in ornare quam viverra orci
                sagittis. Commodo elit at imperdiet dui. Tortor consequat id
                porta nibh venenatis cras. Vitae congue eu consequat ac felis
                donec et. Eget aliquet nibh praesent tristique magna sit amet
                purus gravida. Mi in nulla posuere sollicitudin aliquam
                ultrices. Fusce id velit ut tortor pretium viverra. Lorem mollis
                aliquam ut porttitor leo a diam sollicitudin. Ac turpis egestas
                sed tempus. Arcu ac tortor dignissim convallis aenean et tortor.
                Congue eu consequat ac felis. Metus vulputate eu scelerisque
                felis imperdiet proin fermentum. Viverra nam libero justo
                laoreet sit amet. Posuere ac ut consequat semper viverra. Duis
                ut diam quam nulla porttitor massa. Interdum consectetur libero
                id faucibus nisl.
              </p>
            </div>
          </Fade>
          <Fade
            left
            cascade
            when={scrollValue > 2000}
            className="<md:(flex flex-wrap w-130 justify-start)"
          >
            <div className="mt-20 w-320 <md:(flex flex-col w-full)">
              <img
                src="/imgs/pubpriv1.jpg"
                className=" h-120 w-120 object-cover float-left mr-5 rounded-md shadow-md shadow-gray-500 "
              />
              <p className="text-justify w-full ">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Faucibus pulvinar elementum integer enim neque volutpat ac
                tincidunt vitae. Egestas erat imperdiet sed euismod nisi porta.
                Eget mauris pharetra et ultrices neque ornare aenean euismod
                elementum. Diam volutpat commodo sed egestas egestas fringilla
                phasellus. Id neque aliquam vestibulum morbi blandit cursus
                risus at. Dignissim diam quis enim lobortis scelerisque
                fermentum dui faucibus in. Et netus et malesuada fames ac. A
                arcu cursus vitae congue mauris rhoncus. Varius vel pharetra vel
                turpis nunc. Erat velit scelerisque in dictum non consectetur a.
                Odio ut sem nulla pharetra diam sit. Aliquet porttitor lacus
                luctus accumsan tortor posuere ac ut. A erat nam at lectus urna
                duis convallis convallis. Nunc sed augue lacus viverra vitae
                congue eu consequat. Sed augue lacus viverra vitae congue eu
                consequat. Egestas dui id ornare arcu odio ut sem. Morbi tempus
                iaculis urna id volutpat lacus laoreet non. Turpis in eu mi
                bibendum neque egestas congue quisque. Ut pharetra sit amet
                aliquam id. Dignissim suspendisse in est ante in nibh mauris
                cursus mattis. Congue mauris rhoncus aenean vel. Pretium
                vulputate sapien nec sagittis aliquam malesuada bibendum arcu
                vitae. Integer malesuada nunc vel risus. Morbi enim nunc
                faucibus a pellentesque sit amet. Accumsan sit amet nulla
                facilisi morbi. Varius vel pharetra vel turpis nunc. Elementum
                curabitur vitae nunc sed velit dignissim sodales ut eu. Diam ut
                venenatis tellus in metus vulputate eu scelerisque felis. At
                consectetur lorem donec massa sapien faucibus et molestie ac. At
                imperdiet dui accumsan sit amet. Aliquet risus feugiat in ante
                metus dictum at tempor commodo. Id neque aliquam vestibulum
                morbi blandit cursus risus at. Egestas integer eget aliquet
                nibh. Fringilla phasellus faucibus scelerisque eleifend donec
                pretium vulputate sapien. Sagittis purus sit amet volutpat
                consequat mauris nunc. Viverra maecenas accumsan lacus vel
                facilisis. Nullam non nisi est sit. Et leo duis ut diam.
                Condimentum mattis pellentesque id nibh tortor id aliquet. Etiam
                erat velit scelerisque in. Faucibus in ornare quam viverra orci
                sagittis. Commodo elit at imperdiet dui. Tortor consequat id
                porta nibh venenatis cras. Vitae congue eu consequat ac felis
                donec et. Eget aliquet nibh praesent tristique magna sit amet
                purus gravida. Mi in nulla posuere sollicitudin aliquam
                ultrices. Fusce id velit ut tortor pretium viverra. Lorem mollis
                aliquam ut porttitor leo a diam sollicitudin. Ac turpis egestas
                sed tempus. Arcu ac tortor dignissim convallis aenean et tortor.
                Congue eu consequat ac felis. Metus vulputate eu scelerisque
                felis imperdiet proin fermentum. Viverra nam libero justo
                laoreet sit amet. Posuere ac ut consequat semper viverra. Duis
                ut diam quam nulla porttitor massa. Interdum consectetur libero
                id faucibus nisl.
              </p>
            </div>
          </Fade>
        </div>
        <div className="flex justify-start flex-col mt-20 mb-10 <md:(px-2 w-full)">
          <iframe
            src="https://www.youtube.com/embed/LDzdHR9ysgc"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
            className="w-200 h-120 <md:(w-full)"
          />
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

export default Accomidation;
