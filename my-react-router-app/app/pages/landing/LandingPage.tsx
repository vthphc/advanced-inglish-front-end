import React from "react";
import { motion } from "motion/react";
import { fadeInPropsFn, zoomInPropsFn } from "../../utils/animation";
import { Link, NavLink } from "react-router";
import { CircleCheckBig } from "lucide-react";

export default function LandingPage() {
  const introArray = [
    {
      className: "text-3xl sm:text-4xl lg:text-5xl font-semibold text-center ",
      text: "Học tiếng Anh, mở ra cơ hội.",
    },
    {
      className: "text-3xl sm:text-4xl lg:text-5xl font-semibold text-center ",
      text: "Con đường đến kết nối trôi chảy.",
    },
  ];

  const featureClassName =
    "text-sm sm:text-base text-primary-purple  font-semibold text-center flex items-center gap-2 mx-2 sm:mx-4 md:mx-6 lg:mx-8";

  const featureArray = [
    {
      className: featureClassName,
      text: "Miễn phí",
    },
    {
      className: featureClassName,
      text: "Chủ động",
    },
    {
      className: featureClassName,
      text: "Hiệu quả",
    },
    {
      className: featureClassName,
      text: "Artificial Intelligence",
    },
  ];

  return (
    <div className="m-auto flex flex-col items-center ">
      <motion.p
        {...fadeInPropsFn()}
        className=" font-bold text-center text-xl "
      >
        Welcome to <span className="text-primary-purple">Inglish.</span>
      </motion.p>
      <p className="m-auto flex flex-col gap-4 mt-4">
        {introArray.map((intro, index) => (
          <motion.span
            key={index}
            className={`${intro.className}`}
            {...fadeInPropsFn(index)}
          >
            {intro.text}
          </motion.span>
        ))}
      </p>
      <p className="flex flex-row items-center mt-8">
        {featureArray.map((feature, index) => (
          <motion.div
            key={index}
            className={`${feature.className}`}
            {...zoomInPropsFn(index)}
          >
            <CircleCheckBig height="1.5em" width="1.5em" />
            {feature.text}
          </motion.div>
        ))}
      </p>
      <div className="flex flex-col">
        <motion.button
          className="w-fit m-auto py-2 px-4 bg-primary-purple text-white hover:bg-white hover:text-primary-purple border-2 hover:border-primary-purple rounded-2xl mt-8"
          {...fadeInPropsFn(4)}
        >
          <NavLink className="block w-full" to={"/signup"}>
            Bắt đầu
          </NavLink>
        </motion.button>
        <motion.div {...fadeInPropsFn(5)}>
          <motion.div
            className="relative inline-block mt-4"
            whileHover="hovered"
            initial="rest"
            animate="rest"
          >
            <p className="text-md font-medium  text-gray-500 tracking-tighter cursor-pointer">
              <Link to={"/signin"}>Đã có tài khoản?</Link>
            </p>
            <motion.div //Underline animation
              className="absolute bottom-0 left-0 h-[2px] bg-gray-500"
              variants={{
                rest: {
                  width: 0,
                },
                hovered: {
                  width: "100%",
                },
              }}
              transition={{
                duration: 0.3,
              }}
            />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
