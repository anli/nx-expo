import { useState } from 'react';
import { FlatList } from 'react-native';

import { useSession } from '@entities/authentication';
import { tw } from '@shared/ui';
import { router, Stack } from 'expo-router';
import { Appbar, Checkbox, FAB, List } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

type Task = {
  id: string;
  name: string;
  isCompleted?: boolean;
};

export default function Tasks() {
  const { logout } = useSession();
  const [tasks] = useState<Task[]>([
    { id: '1', name: 'Task 1' },
    { id: '2', name: 'Task 2' },
    { id: '3', name: 'Task 3' },
  ]);

  const handleLogout = () => {
    logout?.();
    router.replace('/');
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          header: () => (
            <Appbar.Header mode="medium">
              <Appbar.Content title="Tasks" />
              <Appbar.Action icon="logout" onPress={handleLogout} />
            </Appbar.Header>
          ),
        }}
      />
      <SafeAreaView edges={['bottom']} style={tw`flex-1`}>
        <FlatList
          data={tasks}
          renderItem={({ item }) => (
            <List.Item
              title={item.name}
              right={(props) => (
                <Checkbox.Android
                  {...props}
                  status={item?.isCompleted ? 'checked' : 'unchecked'}
                />
              )}
            />
          )}
        />
        <FAB
          icon="plus"
          style={tw`absolute ios:bottom-10 android:bottom-4 right-4`}
        />
      </SafeAreaView>
    </>
  );
}
