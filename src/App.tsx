import { DeleteIcon } from "@chakra-ui/icons";
import {
  Flex,
  Text,
  Input,
  Button,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Checkbox,
  IconButton,
} from "@chakra-ui/react";
import {useState} from 'react';

const App = () => {
  const [newTask, setNewTask] = useState('');
  const [tasks, setTasks] = useState([]);

  const addTask = (e) => {
    e.preventDefault();

    if (newTask.length > 0) {
      setTasks(prevState => [...prevState, {text: newTask, isChecked: false}]);
      setNewTask('');
    }
  }

  const updateTask = (index, checked) => {
    let newTask = [...tasks];
    newTask[index].isChecked = checked;
    setTasks(newTask);
  }

  const removeTask = index => {
    const newTask = [...tasks];
    newTask.splice(index, 1);
    setTasks(newTask);
  }

  return (
    <>
      <Flex w="100%" h="100vh">
        <Flex
          w="100%"
          flexDir="column"
          ml="20%"
          mt="5%"
          mr="20%"
          color="blue.400"
        >
          <Text fontWeight="700" fontSize={30} color="black">
            Tasks
          </Text>
          <form onSubmit={addTask}>
            <Flex mt="2%">
              <Input value={newTask} onChange={e => setNewTask(e.target.value)} variant="flushed" placeholder="Add Task" w="50%" />
              <Button onClick={addTask} ml={5} bg="blue.400" color="white">
                Add Task
              </Button>
            </Flex>
          </form>
          <Tabs mt="2%" w="100%">
            <TabList>
              <Tab>Incomplete Tasks</Tab>
              <Tab>Completed Tasks</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                {tasks.map((task, index) => (
                  !task.isChecked ? <TaskItem removeTask={removeTask} updateTask={updateTask} key={index} task={task} index={index}/> : null
                ))}
              </TabPanel>
              <TabPanel>
                {tasks.map((task, index) => (
                  task.isChecked ? <TaskItem removeTask={removeTask} key={index} task={task} index={index}/> : null
                ))}
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Flex>
      </Flex>
    </>
  );
};


const TaskItem = ({task, index, updateTask, removeTask}) => {
  return(
    <Checkbox onChange={e => updateTask(index, e.target.checked)} colorScheme='green' mb={10} w='100%' flexDir='row' isChecked={task.isChecked}>
      <Flex w='100%' flexDir='row'>
        <Text color="black" alignSelf="center">
          {task.text}
        </Text>
        <IconButton onClick={() => removeTask(index)}bg="red.600" pos='absolute' right={0} color='white' icon={<DeleteIcon />} aria-label={""} />
      </Flex>
    </Checkbox>
  )
}

export default App;
