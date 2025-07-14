import React from 'react';
import { Image, ImageBackground, ImageSourcePropType, Text, View } from 'react-native';

interface TabIconInterface {
    image: ImageSourcePropType;
    icon: ImageSourcePropType;
    focused: boolean;
    name: string
}

const TabIcon = ({ icon, image, name, focused }: TabIconInterface) => {
    if (focused) {
        return (
            <ImageBackground
                source={image}
                resizeMode="stretch"
                className="flex-row justify-center items-center mt-6 rounded-[60px] w-[125px] h-[48px] gap-1"
            >
                <Image source={icon} tintColor={"#151312"} className="w-[18px] h-[18px]" />
                <Text className="text-primary-300 text-sm font-semibold">{name}</Text>
            </ImageBackground>
        )
    }

    return (
        <View className='justify-center mt-6 items-center rounded-full'>
            <Image source={icon} tintColor={"#A8B5DB"} className='w-[18px] h-[18px]' />
        </View>
    )




}

export default TabIcon