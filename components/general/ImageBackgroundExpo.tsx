import { Image, ImageSource } from "expo-image";
import React, { ReactNode } from "react";
import { View, ViewProps } from "react-native";

interface ImageBackgroundExpoProps extends Omit<ViewProps, "children"> {
    /** The image source URL or require() */
    source: ImageSource;
    /** Optional overlay children */
    children?: ReactNode;
    /** Tailwind / NativeWind class names for the outer container */
    className?: string;
    /** How to fit the image */
    contentFit?: "cover" | "contain" | "fill" | "scale-down";
    /** Image loading priority */
    priority?: "low" | "normal" | "high";
    /** Fade-in duration in ms */
    transitionDuration?: number;
}

export default function ImageBackgroundExpo({
    source,
    children,
    className = "",
    contentFit = "cover",
    priority = "normal",
    transitionDuration = 500,
    ...rest
}: ImageBackgroundExpoProps) {
    return (
        <View className={`relative overflow-hidden ${className}`} {...rest}>
            {/* Background Image */}
            <Image
                source={source}
                contentFit={contentFit}
                priority={priority}
                cachePolicy="disk"
                transition={transitionDuration}
                className="absolute w-full h-full"
            />
            {/* Overlay Content */}
            <View className="flex-1">{children}</View>
        </View>
    );
}
