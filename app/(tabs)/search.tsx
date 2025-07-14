import MoviesCard from '@/components/card/MoviesCard';
import Searchbar from '@/components/general/Searchbar';
import { icons } from '@/constants/icons';
import { images } from '@/constants/images';
import { searchMovies } from '@/Services/endpoint';
import { APICall } from '@/utility/functions';
import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    FlatList,
    Image,
    ScrollView,
    Text,
    View
} from 'react-native';

const Search = () => {
    const [query, setQuery] = useState('');
    const [debouncedQuery, setDebouncedQuery] = useState('');

    // Debounce search input
    useEffect(() => {
        const handler = setTimeout(() => {
            if (query !== debouncedQuery) {
                setDebouncedQuery(query);
            }
        }, 500);

        return () => clearTimeout(handler);
    }, [query]);

    const fetchSearchMovies = async (search: string) => {
        const response = await APICall(searchMovies, [search]);
        return response.data;
    };

    const {
        data: searchMovie,
        error,
        isLoading
    } = useQuery({
        queryKey: ['moviesSearch', debouncedQuery],
        queryFn: () => fetchSearchMovies(debouncedQuery),
    });

    const movies = searchMovie?.results ?? [];
    const hasResults = movies.length > 0;
    const hasQuery = debouncedQuery.trim().length > 0;

    return (
        <View className="flex-1 bg-primary-100">
            <Image source={images.bg} className="w-full absolute" />

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    minHeight: '100%',
                    paddingBottom: 10
                }}
            >
                <Image
                    source={icons.logo}
                    className="mx-auto w-12 h-10 mt-20 mb-5"
                />

                <View className="flex-1 mt-4 mx-5">
                    <Searchbar
                        value={query}
                        onChangeText={setQuery}
                        onClear={() => setQuery('')}
                        placeholder="Search through 300+ movies online"
                    />

                    {/* Headline */}
                    {!isLoading && !error && (
                        <Text className="text-white text-lg mt-7 mb-3">
                            {hasQuery ? (
                                <>
                                    Search results for{' '}
                                    <Text className="text-primary-700">
                                        {debouncedQuery}
                                    </Text>
                                </>
                            ) : (
                                'Popular movies'
                            )}
                        </Text>
                    )}

                    {/* Loading state */}
                    {isLoading && (
                        <ActivityIndicator
                            size="large"
                            color="#00f"
                            className="self-center mt-10"
                        />
                    )}

                    {/* Error state */}
                    {error && !isLoading && (
                        <Text className="text-center text-red-500 mt-5">
                            Error loading movies. Please try again later.
                        </Text>
                    )}

                    {/* Movies List */}
                    {!isLoading && !error && (
                        <FlatList
                            data={movies}
                            renderItem={({ item, index }) => (
                                <MoviesCard {...item} index={index} />
                            )}
                            keyExtractor={(item) => item.id.toString()}
                            scrollEnabled={false}
                            numColumns={3}
                            columnWrapperStyle={{
                                gap: 20,
                                justifyContent: 'flex-start',
                                marginHorizontal: 5
                            }}
                            ListEmptyComponent={
                                <View className="mt-10 px-5">
                                    <Text className="text-center text-gray-500">
                                        {hasQuery
                                            ? 'No movies found.'
                                            : 'Search for a movie to get started.'}
                                    </Text>
                                </View>
                            }
                        />
                    )}
                </View>
            </ScrollView>
        </View>
    );
};

export default Search;
