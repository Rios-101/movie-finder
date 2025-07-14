import TabIcon from '@/components/tab/TabIcon'
import { icons } from '@/constants/icons'
import { images } from '@/constants/images'
import { Tabs } from 'expo-router'
import React from 'react'

const _layout = () => {
    return (
        <Tabs
            screenOptions={{
                tabBarShowLabel: false,
                tabBarItemStyle: {
                    width: "100%",
                    height: "100%",
                    alignItems: "center",
                    justifyContent: "center"
                },
                tabBarStyle: {
                    backgroundColor: "#0F0D23",
                    borderRadius: 70,
                    height: 48,
                    marginHorizontal: 12,
                    marginBottom: 50,
                    position: "absolute",
                    overflow: "hidden",
                    borderWidth: 1,
                    borderColor: "#0F0D23",
                }
            }}
        >
            <Tabs.Screen name='index'
                options={{
                    headerShown: false,
                    title: "Home",
                    tabBarIcon: ({ focused }) => (
                        <TabIcon icon={icons.home} focused={focused} name='Home' image={images.highlight} />
                    )
                }}
            />
            <Tabs.Screen name='search'
                options={{
                    headerShown: false,
                    title: "Search",
                    tabBarIcon: ({ focused }) => (
                        <TabIcon icon={icons.search} focused={focused} name='Search' image={images.highlight} />
                    )
                }}
            />
            <Tabs.Screen name='saved'
                options={{
                    headerShown: false,
                    title: "Saved",
                    tabBarIcon: ({ focused }) => (
                        <TabIcon icon={icons.save} focused={focused} name='Saved' image={images.highlight} />
                    )

                }}
            />
            <Tabs.Screen name='profile'
                options={{
                    headerShown: false,
                    title: "Profile",
                    tabBarIcon: ({ focused }) => (
                        <TabIcon icon={icons.person} focused={focused} name='Profile' image={images.highlight} />
                    )
                }}
            />
        </Tabs>
    )
}

export default _layout