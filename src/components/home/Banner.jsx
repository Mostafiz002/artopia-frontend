import React from "react";
import { Link } from "react-router";
import { Typewriter } from "react-simple-typewriter";
import { motion } from "framer-motion";

const textVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.8, ease: "easeOut" },
  }),
};

const Banner = () => {
  return (
    <section className="h-full lg:h-screen py-12 lg:py-0 flex flex-col lg:flex-row items-center justify-between max-w-[1432px] mx-auto px-4 gap-6 lg:gap-0 overflow-hidden">
      <motion.div
        className="flex-1 text-center lg:text-left space-y-5"
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className="inline-flex items-center gap-2 py-1 px-4 rounded-lg border border-primary"
          variants={textVariant}
          custom={1}
        >
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
          </span>
          <p className="font-medium">Explore Exclusive Collections</p>
        </motion.div>

        <motion.h1
          className="playfair text-3xl md:text-[56px] font-medium w-full lg:w-[90%] leading-tight"
          variants={textVariant}
          custom={2}
        >
          Discover, Explore, and Collect Art Masterpieces <br /> from&nbsp;
          <span>
            <Typewriter
              words={[
                "Around the World",
                "Global Artists",
                "Diverse Cultures",
                "Creative Minds",
                "Every Corner",
              ]}
              loop={0}
              cursor
              cursorStyle="|"
              typeSpeed={90}
              deleteSpeed={60}
              delaySpeed={2000}
            />
          </span>
        </motion.h1>

        <motion.p
          className="paragraph w-full lg:w-[80%]"
          variants={textVariant}
          custom={3}
        >
          Unlock a world of imagination with our curated collection of original
          artworks.
        </motion.p>

        <motion.div variants={textVariant} custom={4}>
          <Link to="/explore-artworks" className="btn-primary-one">
            Explore Art
          </Link>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="flex-1 flex gap-6 items-center justify-center px-0 lg:pl-6"
      >
        <motion.figure
          animate={{ opacity: 1, y: [0, 15, 0] }}
          transition={{
            delay: 0.5,
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="w-1/2"
        >
          <img
            src="https://i.pinimg.com/736x/03/7c/77/037c77bd35ef894a75d8fcf563ed16ff.jpg"
            alt="Main artwork"
            className="w-full h-[400px] object-cover rounded-2xl shadow-lg"
          />
        </motion.figure>

        <motion.figure className="w-1/2 flex flex-col gap-6">
          <motion.img
            animate={{ opacity: 1, y: [0, 10, 0] }}
            transition={{
              delay: 1,
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            src="https://i.pinimg.com/736x/f7/c1/d9/f7c1d93fe07b7f18dc6c77c3a7a7132d.jpg"
            alt="Artwork 1"
            className="w-full h-60 object-cover rounded-2xl shadow-md"
          />
          <motion.img
            animate={{ opacity: 1, y: [0, 10, 0] }}
            transition={{
              delay: 0.5,
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            src="https://i.pinimg.com/1200x/1d/b8/ec/1db8ec26d5da93337e5834e41b6e6bc2.jpg"
            alt="Artwork 2"
            className="w-full h-60 object-cover rounded-2xl shadow-md"
          />
        </motion.figure>
      </motion.div>
    </section>
  );
};

export default Banner;
