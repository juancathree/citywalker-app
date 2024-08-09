import { format } from '@formkit/tempo';
import { router, Stack, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import StepIndicator from 'react-native-step-indicator';
import tailwind from 'twrnc';

import { useCreateTravel } from '@/api/travel/useCreateTravel';
import Blur from '@/components/blur';
import { LoadingButton } from '@/components/form/loadingButton';
import { useThemeConfig } from '@/core/use-theme-config';
import type { City } from '@/types/city';
import type { Travel } from '@/types/travel';
import Card from '@/ui/card';
import { Icon } from '@/ui/icon';
import Text from '@/ui/text';

type Dates = {
  initialDate: {
    date: Date;
    mode: 'date';
    format: 'MMMM D, YYYY';
  };
  endDate: {
    date: Date;
    mode: 'date';
    format: 'MMMM D, YYYY';
  };
  initialDateHour: {
    date: Date;
    mode: 'time';
    format: 'h:mm a';
  };
  hourStart: {
    date: Date;
    mode: 'time';
    format: 'h:mm a';
  };
  hourEnd: {
    date: Date;
    mode: 'time';
    format: 'h:mm a';
  };
  endDateHour: {
    date: Date;
    mode: 'time';
    format: 'h:mm a';
  };
};

interface dateState {
  open: boolean;
  key: keyof Dates;
  mode: 'datetime' | 'time' | 'date';
}

// eslint-disable-next-line max-lines-per-function
export default function CreateTravel() {
  const theme = useThemeConfig();
  const { city } = useLocalSearchParams();
  const { t } = useTranslation();
  const { mutate: createTravel } = useCreateTravel();
  const parsedCity: City = JSON.parse(city as string);
  const [currentPosition, setCurrentPosition] = React.useState(0);
  const [travel, setTravel] = React.useState<Travel>();
  const [categorySelected, setCategorySelected] = React.useState<string[]>([]);
  const [entries, setEntries] = React.useState<string[]>([]);
  const [totalCost, setTotalCost] = React.useState(0);
  const now = new Date();
  const [dates, setDates] = React.useState<Dates>({
    initialDate: { date: new Date(), mode: 'date', format: 'MMMM D, YYYY' },
    initialDateHour: {
      date: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 10, 0),
      mode: 'time',
      format: 'h:mm a',
    },
    endDate: { date: new Date(), mode: 'date', format: 'MMMM D, YYYY' },
    endDateHour: {
      date: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 15, 0),
      mode: 'time',
      format: 'h:mm a',
    },
    hourStart: {
      date: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 10, 0),
      mode: 'time',
      format: 'h:mm a',
    },
    hourEnd: {
      date: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 20, 0),
      mode: 'time',
      format: 'h:mm a',
    },
  });
  const [dateState, setDateState] = React.useState<dateState>({
    open: false,
    key: 'initialDate',
    mode: 'date',
  });

  const categoriesList = [
    'Park',
    'Museum',
    'Attractions',
    'Church',
    'Market',
    'Neighborhood',
    'Monument',
    'Street',
  ];

  const datesPage = (
    <View style={tailwind`flex-1 w-full items-center justify-center gap-5`}>
      <DatePicker
        modal
        open={dateState.open}
        date={dates[dateState.key].date}
        onConfirm={(d) => {
          setDateState({ ...dateState, open: false });
          setDates({
            ...dates,
            [dateState.key]: {
              date: d,
              mode: dateState.mode,
              format: dates[dateState.key].format,
            },
          });
        }}
        onCancel={() => setDateState({ ...dateState, open: false })}
        mode={dateState.mode}
        buttonColor={theme.colors.primary}
        dividerColor={theme.colors.primary}
        title={null}
      />
      <View style={tailwind`gap-10`}>
        {Object.keys(dates).map((key) => (
          <View
            style={tailwind`flex-row items-center justify-between gap-5`}
            key={key}
          >
            <View>
              <Text style={tailwind`font-bold text-4`}>
                {t(`screens.createTravel.${key}`)}
              </Text>
              <Text>{t(`screens.createTravel.${key}Description`)}</Text>
            </View>
            <TouchableOpacity
              onPress={() =>
                setDateState({
                  open: true,
                  key: key as keyof Dates,
                  mode: dates[key as keyof Dates].mode,
                })
              }
            >
              <Card
                style={tailwind`p-2 shadow items-center gap-3 justify-between rounded flex-row`}
              >
                <Card style={tailwind`flex-row items-center gap-2`}>
                  <Icon name={dates[key as keyof Dates].mode} isFocused />
                </Card>
                <Text>
                  {format(
                    dates[key as keyof Dates].date,
                    dates[key as keyof Dates].format
                  )}
                </Text>
              </Card>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </View>
  );

  const categories = (
    <View style={tailwind`flex-1 w-full items-center justify-center`}>
      <View
        style={tailwind`flex-row gap-3 flex-wrap items-center justify-center`}
      >
        {categoriesList.map((category, index) => (
          <TouchableOpacity
            key={index}
            onPress={() =>
              setCategorySelected((prevState) => {
                if (prevState.includes(category)) {
                  return prevState.filter((item) => item !== category);
                }
                return [...prevState, category];
              })
            }
          >
            <Card
              style={tailwind`p-3 self-center rounded shadow flex-row items-center gap-3 ${categorySelected.includes(category)
                  ? `bg-[${theme.colors.primary}]`
                  : ``
                }`}
            >
              <Icon
                name={category.toLowerCase()}
                fill={
                  categorySelected.includes(category)
                    ? theme.colors.text
                    : theme.colors.placeholder
                }
              />
              <Text
                style={tailwind`${categorySelected.includes(category) ? `font-bold` : ``
                  }`}
              >
                {category}
              </Text>
            </Card>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const entriesPage = (
    <View style={tailwind`flex-1 w-full p-3 gap-5 items-center`}>
      <Text style={tailwind`text-7 font-bold`}>Select places to entry</Text>
      <View style={tailwind`flex-row items-center`}>
        <Text style={tailwind`font-bold`}>Total cost of entries: </Text>
        <Text style={tailwind`ml-2`}>{totalCost}</Text>
        <Icon name="dollar" width={20} />
      </View>
      <ScrollView
        style={tailwind`flex-1 w-full`}
        showsVerticalScrollIndicator={false}
      >
        <View style={tailwind`flex-row flex-wrap gap-3 justify-between`}>
          {parsedCity.places
            .filter((place) => place.visit.all !== 0)
            .map((place, index) => (
              <TouchableOpacity
                key={index}
                style={tailwind`grow`}
                onPress={() =>
                  setEntries((prevEntries) => {
                    if (prevEntries.includes(place.name)) {
                      setTotalCost((prevCost) => prevCost - place.price);
                      return prevEntries.filter(
                        (entry) => entry !== place.name
                      );
                    }
                    setTotalCost((prevCost) => prevCost + place.price);
                    return [...prevEntries, place.name];
                  })
                }
              >
                <Card
                  style={tailwind`rounded p-2 shadow items-center justify-center gap-2 ${entries.includes(place.name)
                      ? `bg-[${theme.colors.primary}]`
                      : ``
                    }`}
                >
                  <Text style={tailwind`font-bold text-center`}>
                    {place.name}
                  </Text>
                  <View style={tailwind`flex-row items-center justify-center`}>
                    <Text>{place.price}</Text>
                    <Icon
                      name="dollar"
                      style={tailwind``}
                      fill={
                        entries.includes(place.name)
                          ? theme.colors.text
                          : theme.colors.placeholder
                      }
                    />
                  </View>
                </Card>
              </TouchableOpacity>
            ))}
        </View>
      </ScrollView>
    </View>
  );

  const summaryPage = (
    <View style={tailwind`flex-1 w-full p-3 gap-5 justify-center`}>
      {Object.keys(dates).map((key) => (
        <View style={tailwind`flex-row flex-wrap`} key={key}>
          <Text style={tailwind`font-bold text-4`}>
            {t(`screens.createTravel.${key}`)} :{' '}
          </Text>
          <Text style={tailwind``}>
            {format(dates[key].date, dates[key].format)}
          </Text>
        </View>
      ))}
      <View style={tailwind`flex-row flex-wrap`}>
        <Text style={tailwind`font-bold text-4`}>Discarded categories : </Text>
        <Text style={tailwind``}>{categorySelected.join(', ')}</Text>
      </View>
      <View style={tailwind`flex-row flex-wrap`}>
        <Text style={tailwind`font-bold text-4`}>Places to enter : </Text>
        <Text style={tailwind``}>{entries.join(', ')}</Text>
      </View>
      <View style={tailwind`flex-row items-center gap-3`}>
        <Text style={tailwind`font-bold text-4`}>Entries cost : </Text>
        <View style={tailwind`flex-row items-center`}>
          <Text>{totalCost}</Text>
          <Icon name="dollar" width={20} />
        </View>
      </View>
      <LoadingButton
        style={tailwind`mt-10`}
        text="Create travel"
        onPress={() => {
          setTravel({
            city: parsedCity.city,
            discardedCategories: categorySelected,
            placesToEnter: entries,
            schedule: {
              initialDate: dates.initialDate.date,
              endDate: dates.endDate.date,
              hourInitialDate: dates.initialDateHour.date,
              hourStart: dates.hourStart.date,
              hourEnd: dates.endDateHour.date,
              hourEndDate: dates.hourEnd.date,
            },
          });
          console.log(travel);
          createTravel(travel!, {
            onSuccess: (response) => {
              router.replace('/(travels)');
            },
            onError: (data) => {
              console.log(data);
              console.log('error');
            },
          });
        }}
      />
    </View>
  );

  const pages = [datesPage, categories, entriesPage, summaryPage];

  const labels = ['Dates', 'Categories', 'Entries', 'Summary'];
  const customStyles = {
    stepIndicatorSize: 35,
    currentStepIndicatorSize: 50,
    separatorStrokeWidth: 2,
    currentStepStrokeWidth: 3,
    stepStrokeCurrentColor: theme.colors.success,
    stepStrokeWidth: 3,
    stepStrokeFinishedColor: theme.colors.success,
    stepStrokeUnFinishedColor: theme.colors.placeholder,
    separatorFinishedColor: theme.colors.success,
    separatorUnFinishedColor: theme.colors.placeholder,
    stepIndicatorFinishedColor: theme.colors.success,
    stepIndicatorUnFinishedColor: theme.colors.background,
    stepIndicatorCurrentColor: theme.colors.background,
    stepIndicatorLabelFontSize: 13,
    currentStepIndicatorLabelFontSize: 13,
    stepIndicatorLabelCurrentColor: theme.colors.text,
    stepIndicatorLabelFinishedColor: theme.colors.text,
    stepIndicatorLabelUnFinishedColor: theme.colors.placeholder,
    labelColor: theme.colors.text,
    labelSize: 13,
    currentStepLabelColor: theme.colors.text,
  };

  const onStepPress = (position: number) => {
    setCurrentPosition(position);
  };

  const renderStepIndicator = ({
    position,
    stepStatus,
  }: {
    position: number;
    stepStatus: string;
  }) => {
    if (stepStatus === 'finished') {
      return <Icon name="check" fill={theme.colors.background} />;
    } else {
      return <Text>{position + 1}</Text>;
    }
  };

  return (
    <SafeAreaView style={tailwind`flex-1 p-5`}>
      <Stack.Screen
        options={{
          title: 'Create Travel',
          headerShown: true,
          headerShadowVisible: true,
          headerTitleAlign: 'center',
          headerLeft: () => (
            <TouchableOpacity
              style={tailwind`p-1 bg-[${theme.colors.card}] rounded`}
              onPress={() => {
                router.dismissAll();
                router.replace({
                  pathname: '/city',
                  params: { item: JSON.stringify(parsedCity) },
                });
              }}
            >
              <Icon name="back" style={tailwind`ml-2`} />
            </TouchableOpacity>
          ),
          headerBackground: () => <Blur />,
        }}
      />
      <StepIndicator
        customStyles={customStyles}
        stepCount={4}
        currentPosition={currentPosition}
        renderStepIndicator={renderStepIndicator}
        labels={labels}
        onPress={onStepPress}
      />
      {pages[currentPosition]}
      <View
        style={tailwind`flex-row ${currentPosition <= 0 ? `justify-end` : `justify-between`
          }`}
      >
        {currentPosition <= 0 ? null : (
          <LoadingButton
            text="Back"
            onPress={() =>
              setCurrentPosition(
                currentPosition <= 0 ? currentPosition : currentPosition - 1
              )
            }
            style={tailwind`p-2 w-15`}
          />
        )}
        {currentPosition >= labels.length - 1 ? null : (
          <LoadingButton
            text="Next"
            onPress={() =>
              setCurrentPosition(
                currentPosition >= labels.length - 1
                  ? currentPosition
                  : currentPosition + 1
              )
            }
            style={tailwind`p-2 w-15`}
          />
        )}
      </View>
    </SafeAreaView>
  );
}
