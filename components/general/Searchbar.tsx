import { icons } from '@/constants/icons';
import { Ionicons } from "@expo/vector-icons";
import React from 'react';
import { Image, TextInput, TouchableOpacity, View } from 'react-native';

interface SearchBarProps {
    value: string;
    onChangeText: (text: string) => void;
    placeholder?: string;
    onClear?: () => void;
    onPress?: () => void;
    containerClassName?: string;
    inputClassName?: string;
}

const Searchbar = ({ value, onChangeText, inputClassName, onClear, placeholder, onPress }: SearchBarProps) => {
    return (
        <View className='items-center bg-primary-200 gap-2 flex-row px-5 py-2 mt-4 rounded-full '>
            <Image source={icons.search} className='size-4 text-primary-400' />
            <TextInput
                className={`flex-1 text-base text-white ${inputClassName}`}
                value={value}
                onPress={onPress}
                onChangeText={onChangeText}
                placeholder={placeholder}
                placeholderTextColor="#A1A1AA"
            />
            {value.length > 0 && (
                <TouchableOpacity onPress={onClear}>
                    <Ionicons name="close-circle" size={18} color="#A1A1AA" />
                </TouchableOpacity>
            )}
        </View>
    )
}

export default Searchbar