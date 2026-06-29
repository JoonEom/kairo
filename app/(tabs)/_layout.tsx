import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/constants/colors';
import { fontSize } from '@/constants/typography';

type IoniconsName = React.ComponentProps<typeof Ionicons>['name'];

function tabIcon(focused: boolean, active: IoniconsName, inactive: IoniconsName) {
  return ({ color }: { color: string }) => (
    <Ionicons name={focused ? active : inactive} size={22} color={color} />
  );
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
          borderTopWidth: 1,
        },
        tabBarActiveTintColor: colors.text.primary,
        tabBarInactiveTintColor: colors.text.placeholder,
        tabBarLabelStyle: {
          fontSize: fontSize.xs,
          fontWeight: '500',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ focused, color }) =>
            tabIcon(focused, 'home', 'home-outline')({ color }),
        }}
      />
      <Tabs.Screen
        name="friends"
        options={{
          title: 'Friends',
          tabBarIcon: ({ focused, color }) =>
            tabIcon(focused, 'people', 'people-outline')({ color }),
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          title: 'Create',
          tabBarIcon: ({ focused, color }) =>
            tabIcon(focused, 'add-circle', 'add-circle-outline')({ color }),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ focused, color }) =>
            tabIcon(focused, 'person', 'person-outline')({ color }),
        }}
      />
    </Tabs>
  );
}
