"use client";

import { motion } from "motion/react";
import { ReactNode } from "react";

type AnimatedWrapperProps = {
    children: ReactNode
}

export default function AnimatedWrapper({ children }: AnimatedWrapperProps) {
    return (
    <motion.div
        initial={{ y:20, opacity: 0}}
        animate={{ y:0, opacity: 1}}
        exit={{ opacity: 0}}
        layout
    >
        {children}
    </motion.div>)
}