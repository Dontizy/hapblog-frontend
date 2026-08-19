import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, PenLine, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import { TypeAnimation } from "react-type-animation";

import { buttonVariants } from "../ui/button-variants";
import { Badge } from "../ui/badge";
import { cn } from "../../lib/utils";
import type { Variants } from "motion";

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.15,
    },
  },
};

const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: "easeOut",
    },
  },
};

export function LandingHero() {
  return (
    <section className="relative overflow-hidden border-b border-border">
      {/* Animated background glow */}
      <motion.div
        className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(255,255,255,.06),transparent_60%)]"
        animate={{
          opacity: [0.15, 0.28, 0.15],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        // {/* Adjusted padding: pt-6 / py-10 on ultra-small screens so content clears header smoothly */}
        className="mx-auto max-w-6xl px-3 py-10 pt-6 sm:px-6 sm:py-28 lg:py-36"
        >
        <div className="mx-auto max-w-3xl text-center">
          {/* Floating badge */}
          <motion.div
            variants={fadeUp}
            animate={{
              y: [0, -4, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Badge
              variant="secondary"
              className="mb-4 gap-1.5 rounded-full px-2.5 py-1 text-xs font-normal sm:mb-6 sm:px-3 sm:text-sm"
            >
              <Sparkles className="size-3 text-accent sm:size-3.5" />
              Now open to all writers
            </Badge>
          </motion.div>

          {/* Category eyebrow — cycles through real blog categories */}
          <motion.div
            variants={fadeUp}
            className="mb-3 flex flex-wrap items-center justify-center gap-1.5 font-serif text-sm font-medium text-accent sm:mb-4 sm:gap-2 sm:text-lg lg:text-xl"
          >
            <span>Stories on</span>
            <TypeAnimation
              sequence={[
                "Technology",
                1600,
                "Programming",
                1600,
                "AI",
                1600,
                "Business",
                1600,
                "Design",
                1600,
                "Lifestyle",
                1600,
                "Health",
                1600,
                "Education",
                1600,
                "Travel",
                1600,
                "Sports",
                1600,
                "Entertainment",
                1600,
                "News",
                1600,
                "Finance",
                1600,
                "Food",
                1600,
                "Politics",
                1600,
                "Other",
              ]}
              wrapper="span"
              speed={50}
              deletionSpeed={65}
              repeat={Infinity}
              cursor
              className="inline-block min-w-[6ch] text-left sm:min-w-[8ch]"
            />
          </motion.div>

          {/* Hero title */}
          <motion.h1
            variants={fadeUp}
            className="text-balance font-serif text-2xl font-semibold leading-tight tracking-tight sm:text-5xl sm:leading-[1.08] lg:text-6xl lg:leading-[1.05]"
          >
            Writing worth reading,
            <br className="hidden md:block" />{" "}
            <span className="bg-gradient-to-r from-foreground via-foreground to-accent bg-clip-text text-transparent">
              from people worth following.
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={fadeUp}
            className="mx-auto mt-3 max-w-md text-pretty text-xs leading-relaxed text-muted-foreground sm:mt-6 sm:max-w-xl sm:text-lg"
          >
            Hapblog is a calm, modern home for stories and ideas. Discover great
            writing, follow your favorite authors, and publish work you are
            proud of.
          </motion.p>

          {/* Buttons */}
          <motion.div
            variants={fadeUp}
            className="mt-6 flex flex-col items-center justify-center gap-2.5 sm:mt-9 sm:flex-row sm:gap-3"
          >
            <motion.div
              className="w-full sm:w-auto"
              whileHover={{
                scale: 1.04,
              }}
              whileTap={{
                scale: 0.96,
              }}
            >
              <Link
                to="/register"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "h-10 w-full gap-2 px-4 text-xs sm:h-11 sm:w-auto sm:px-5 sm:text-sm",
                )}
              >
                Start writing
                <motion.div
                  animate={{
                    x: [0, 4, 0],
                  }}
                  transition={{
                    duration: 1.6,
                    repeat: Infinity,
                    repeatDelay: 2,
                  }}
                >
                  <ArrowRight className="size-3.5 sm:size-4" />
                </motion.div>
              </Link>
            </motion.div>

            <motion.div
              className="w-full sm:w-auto"
              whileHover={{
                scale: 1.04,
              }}
              whileTap={{
                scale: 0.96,
              }}
            >
              <Link
                to="/feeds"
                className={cn(
                  buttonVariants({
                    variant: "outline",
                    size: "lg",
                  }),
                  "h-10 w-full gap-2 px-4 text-xs sm:h-11 sm:w-auto sm:px-5 sm:text-sm",
                )}
              >
                <BookOpen className="size-3.5 sm:size-4" />
                Explore stories
              </Link>
            </motion.div>
          </motion.div>

          {/* Footer */}
          <motion.p
            variants={fadeUp}
            className="mt-4 flex items-center justify-center gap-1.5 text-xs text-muted-foreground sm:mt-5 sm:gap-2 sm:text-sm"
          >
            <PenLine className="size-3.5 sm:size-4" />
            Join 50,000+ writers and readers
          </motion.p>
        </div>
      </motion.div>
    </section>
  );
}
