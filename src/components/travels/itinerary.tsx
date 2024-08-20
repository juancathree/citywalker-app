import { format } from '@formkit/tempo';
import polyline from '@mapbox/polyline';
import React, { useEffect } from 'react';
import { Animated, StyleSheet, TouchableOpacity, View } from 'react-native';
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import tailwind from 'twrnc';

import { useThemeConfig } from '@/core/useThemeConfig';
import type { Travel } from '@/types/travel';
import { Card, Text } from '@/ui';

type Props = {
  travel: Travel;
};

type Data = {
  time: string;
  title: string;
};

// eslint-disable-next-line max-lines-per-function
export function Itinerary({ travel }: Props) {
  const theme = useThemeConfig();
  const [index, setIndex] = React.useState(0);
  const [mapState, setMapState] = React.useState(
    polyline.decode(travel.geometry[index]).map((point) => ({
      latitude: point[0],
      longitude: point[1],
    }))
  );
  const [middle, setMiddle] = React.useState(Math.floor(mapState.length / 2));

  const [data, setData] = React.useState<Data[]>([]);

  useEffect(() => {
    setMapState(
      polyline.decode(travel.geometry[index]).map((point) => ({
        latitude: point[0],
        longitude: point[1],
      }))
    );
    setMiddle(Math.floor(mapState.length / 2) - 1);
    setData(
      travel.itinerary[index].map((it) => {
        return {
          time: format(it.date, 'H:m'),
          title: it.place.name,
        };
      })
    );
  }, [index]);

  return (
    <View style={tailwind`flex-1 p-5 items-center justify-between`}>
      <View style={tailwind`h-100 w-full rounded`}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={[{ ...StyleSheet.absoluteFillObject }]}
          zoomEnabled
          region={{
            latitude: mapState[middle]?.latitude,
            longitude: mapState[middle]?.longitude,
            latitudeDelta: 0.07,
            longitudeDelta: 0.07,
          }}
        >
          <Polyline
            coordinates={mapState}
            strokeColor="#0000FF"
            strokeWidth={2}
          />
          {travel.itinerary[index].map((itinerary, index) => (
            <Marker
              key={itinerary.place.name}
              coordinate={{
                latitude: itinerary.place.location.coordinates[0],
                longitude: itinerary.place.location.coordinates[1],
              }}
            >
              <View style={tailwind`h-10 w-10`}>
                <Animated.Image
                  source={{
                    uri: `https://ik.imagekit.io/aacivfepey/${itinerary.place.uuid}.jpg`,
                  }}
                  style={[tailwind`h-full w-full rounded-full`]}
                />
                <View
                  style={tailwind`absolute h-full w-full bg-black rounded-full opacity-20`}
                />
                <View
                  style={tailwind`absolute h-full w-full justify-center items-center`}
                >
                  <Text style={tailwind`font-bold text-7 text-white`}>
                    {index + 1}
                  </Text>
                </View>
              </View>
            </Marker>
          ))}
        </MapView>
      </View>
      <View style={tailwind`mt-5 gap-3`}>
        <View
          style={tailwind`absolute h-full w-[.5] bg-[${theme.colors.text}] ml-16`}
        />
        {data.map((itinerary, index) => (
          <View key={index} style={tailwind`flex-row gap-2 items-center`}>
            <Text style={tailwind`text-5 font-bold`}>{itinerary.time}</Text>
            <View style={tailwind`rounded-full bg-blue-500 h-3 w-3`} />
            <Text>{itinerary.title}</Text>
          </View>
        ))}
      </View>
      <View style={tailwind`flex-row justify-center gap-5`}>
        {travel.itinerary.map((itinerary, i) => (
          <TouchableOpacity key={i} onPress={() => setIndex(i)}>
            <Card
              style={tailwind`rounded p-2 ${index === i ? `bg-[${theme.colors.primary}]` : ``
                }`}
            >
              <Text style={tailwind`font-bold`}>
                {format(itinerary[0].date, 'MMMM D')}
              </Text>
            </Card>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
