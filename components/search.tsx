import icons from '@/constants/icons';
import { router, useLocalSearchParams, usePathname } from 'expo-router';
import React, { useState } from 'react';
import { Image, TextInput, TouchableOpacity, View } from 'react-native';
import { useDebouncedCallback } from 'use-debounce';

const Search = () => {
    const path = usePathname();
    const params = useLocalSearchParams<{ query?: string }>();
    const [search, setSearch] = useState(params.query);

    //Debounce search is used to avoid search call after every keypress
    const debouncedSearch = useDebouncedCallback((text: string) => router.setParams({ query: text }), 500)

    const handleSearch = (text: string) => {
        setSearch(text);
        debouncedSearch(text);
    }

    return (
        <View className='flex flex-row items-center justify-between w-full px-4 rounded-lg bd-accesnt-100 border border-primary-100 mt-5 py-2'>
            <View className='flex-1 flex flex-row items-center mt-5 py-2'>
                <Image source={icons.search} className='w-5 h-5' />
                <TextInput
                    value={search}
                    onChangeText={handleSearch}
                    placeholder='Search something'
                    className='text-sm flex-1 ml-2 text-base font-rubik text-black-200'
                />
            </View>
            <TouchableOpacity>
                <Image source={icons.filter} className='size-5' />
            </TouchableOpacity>
        </View>
    )
}

export default Search