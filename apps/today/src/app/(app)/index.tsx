import { useEffect, useState } from 'react';
import { Alert, FlatList } from 'react-native';

import { useLogout } from '@entities/authentication';
import { taskMutations, taskQueries, type Task } from '@entities/task';
import { queryClient } from '@shared/api';
import { tw } from '@shared/ui';
import { useInfiniteQuery, useMutation } from '@tanstack/react-query';
import { router, Stack } from 'expo-router';
import { KeyboardStickyView } from 'react-native-keyboard-controller';
import {
  ActivityIndicator,
  Appbar,
  Checkbox,
  IconButton,
  List,
  TextInput,
} from 'react-native-paper';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

const TaskListItem = (item: Task) => {
  const { mutate: deleteTask, isPending: isPendingDeleteTask } = useMutation({
    mutationFn: taskMutations.delete,
    onSettled: () => {
      void queryClient.invalidateQueries({ queryKey: taskQueries.all() });
    },
    onError: (error) => {
      Alert.alert(error.message);
    },
  });
  const { mutate: updateTask } = useMutation({
    mutationFn: taskMutations.update,
    onSettled: () => {
      void queryClient.invalidateQueries({ queryKey: taskQueries.all() });
    },
    onError: (error) => {
      Alert.alert(error.message);
    },
  });
  const [isChecked, setIsChecked] = useState(!!item.isCompleted);

  useEffect(() => {
    setIsChecked((_checked) => item.isCompleted);
  }, [item.isCompleted]);

  const handleDeleteTask = () => {
    Alert.alert('Are you sure you want to delete this task?', '', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => deleteTask(item.id),
      },
    ]);
  };

  const handleCompleteTask = () => {
    setIsChecked((_isChecked) => !_isChecked);
    updateTask({ id: item.id, isCompleted: !isChecked });
  };

  return (
    <List.Item
      title={item.name}
      right={(props) => (
        <>
          <Checkbox.Android
            {...props}
            status={isChecked ? 'checked' : 'unchecked'}
            onPress={handleCompleteTask}
          />
          <IconButton
            {...props}
            disabled={isPendingDeleteTask}
            loading={isPendingDeleteTask}
            icon="delete"
            onPress={handleDeleteTask}
          />
        </>
      )}
    />
  );
};

export default function Tasks() {
  const { mutate: logout } = useLogout({
    onSuccess: () => {
      router.replace('/');
    },
  });
  const {
    data: listData,
    fetchNextPage,
    isFetching,
  } = useInfiniteQuery(taskQueries.list());
  const tasks = listData?.pages.flat();

  const [newTask, setNewTask] = useState('');
  const { mutate: createTask, isPending: isPendingCreateTask } = useMutation({
    mutationFn: taskMutations.create,
    onSettled: () => {
      void queryClient.invalidateQueries({ queryKey: taskQueries.all() });
      setNewTask('');
    },
    onError: (error) => {
      Alert.alert(error.message);
    },
  });
  const { bottom } = useSafeAreaInsets();
  const keyboardOffset = {
    closed: 0,
    opened: bottom,
  };

  const handleCreateTask = () => {
    if (!newTask) {
      return;
    }

    createTask({ name: newTask });
  };

  const handleLoadMore = () => {
    if (isFetching) return;

    void fetchNextPage();
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          header: () => (
            <Appbar.Header mode="medium">
              <Appbar.Content title="Tasks" />
              <Appbar.Action icon="logout" onPress={logout} />
            </Appbar.Header>
          ),
        }}
      />
      <SafeAreaView edges={['bottom']} style={tw`flex-1`}>
        <FlatList
          ListFooterComponent={() =>
            isFetching && <ActivityIndicator style={tw`mt-4`} />
          }
          keyExtractor={(item) => item.id.toString()}
          data={tasks}
          renderItem={({ item }) => <TaskListItem {...item} />}
          onEndReached={handleLoadMore}
        />
        <KeyboardStickyView offset={keyboardOffset}>
          <TextInput
            disabled={isPendingCreateTask}
            value={newTask}
            onChangeText={setNewTask}
            placeholder="Enter a new task"
            right={
              <TextInput.Icon
                disabled={isPendingCreateTask}
                loading={isPendingCreateTask}
                onPress={handleCreateTask}
                icon="plus"
              />
            }
          />
        </KeyboardStickyView>
      </SafeAreaView>
    </>
  );
}
