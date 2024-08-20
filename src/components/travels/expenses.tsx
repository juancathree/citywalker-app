import { FlashList } from '@shopify/flash-list';
import React from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import tailwind from 'twrnc';

import { useThemeConfig } from '@/core/useThemeConfig';
import { Categories, type Travel } from '@/types/travel';
import { Card, Icon, Text } from '@/ui';

type Props = {
  travel: Travel;
};

export function Expenses({ travel }: Props) {
  const theme = useThemeConfig();
  const [category, setCategory] = React.useState('');
  const [expenses, setExpenses] = React.useState(travel.expenses.all);
  return (
    <View style={tailwind`flex-1 items-center gap-3`}>
      <View style={tailwind`flex-row items-center mt-5`}>
        <Text style={tailwind`font-bold text-4`}>Expenses total amount: </Text>
        <Text style={tailwind`ml-2 text-4`}>{travel.expenses.total}</Text>
        <Icon name="dollar" />
      </View>
      <View style={tailwind`h-10 mt-2`}>
        <ScrollView
          horizontal
          contentContainerStyle={tailwind`gap-2 px-10`}
          showsHorizontalScrollIndicator={false}
        >
          {Object.keys(Categories).map((cat) => (
            <TouchableOpacity
              key={cat}
              style={tailwind`h-10 justify-center`}
              onPress={() =>
                category === Categories[cat as keyof typeof Categories]
                  ? setCategory('')
                  : setCategory(Categories[cat as keyof typeof Categories])
              }
            >
              <Card
                style={tailwind`p-2 rounded-full items-center ${category === Categories[cat as keyof typeof Categories]
                    ? `bg-[${theme.colors.primary}]`
                    : ``
                  } border border-[${theme.colors.primary}]`}
              >
                <Text style={tailwind`font-bold`}>{cat}</Text>
              </Card>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <View style={tailwind`flex-1 justify-between w-full p-5 gap-3`}>
        <FlashList
          data={expenses.filter((exp) =>
            category ? exp.category === category : true
          )}
          ItemSeparatorComponent={() => <View style={tailwind`h-2`} />}
          estimatedItemSize={20}
          renderItem={({ item, index }) => (
            <Card
              style={tailwind`flex-row rounded p-3 justify-between gap-3 items-center`}
            >
              <Icon name={item.category} />
              <Text numberOfLines={2} style={tailwind`grow w-1`}>
                {item.description}
              </Text>
              <View style={tailwind`flex-row items-center`}>
                <Text>{item.price}</Text>
                <Icon name="dollar" />
              </View>
              <TouchableOpacity
                onPress={() =>
                  setExpenses(
                    expenses.filter((exp, i) => (i === index ? false : true))
                  )
                }
              >
                <Icon name="close" fill={theme.colors.error} />
              </TouchableOpacity>
            </Card>
          )}
        />
        <TouchableOpacity
          style={tailwind`self-end bg-[${theme.colors.primary}] p-2 rounded`}
          onPress={() => {
            travel.expenses.total += 44;
            setExpenses([
              ...expenses,
              {
                price: 44,
                category: Categories.ATTRACTION,
                description: 'madame tussauds',
              },
            ]);
          }}
        >
          <Text style={tailwind`font-bold`}>Add expense</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
