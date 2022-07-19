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
  Divider,
  AlertDialogOverlay,
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { useState } from "react";
import { getCurrentDate } from "./util/date";


const App = () => {
  const [newTask, setNewTask] = useState("");
  const [tasks, setTasks] = useState([]);
  

  // Function to add a new task
  const addTask = (e) => {
    //Aqui pongo la function el nombre de e
    e.preventDefault(); //Previene que se recargue la pagina

    if (newTask.length > 0) {
      //Si el nombre de la tarea es mayor a 0
      setTasks([
        ...tasks,
        { 'text': newTask, 'isChecked': false },
      ]); //Agrega la tarea a la lista
      setNewTask(""); //Limpia el input
    }
  };

  // Function to check a task
  const updateTask = (index, checked) => {
    let newTask = [...tasks]; // Crea una copia de la lista de tareas
    newTask[index].isChecked = checked; // Cambia el estado de la tarea
    setTasks(newTask); // Actualiza la lista de tareas
  };

  // Function to delete a task
  const removeTask = (index) => {
    // Funcion para eliminar una tarea
    const newTask = [...tasks]; // Crea una copia de la lista de tareas
    newTask.splice(index, 1); // Elimina la tarea de la lista
    setTasks(newTask); // Actualiza la lista de tareas
  };

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
          <Flex flexDir="row">
            <Text fontWeight="700" fontSize={30} color="black">
              Hoy
            </Text>
            <Text
              fontWeight="200"
              fontSize={20}
              color="black"
              mt="10px"
              ml="10px"
            >
              {getCurrentDate()}
            </Text>
          </Flex>

          <Tabs mt="2%" w="100%" isFitted variant="enclosed">
            <TabList>
              <Tab>Tareas sin hacer</Tab>
              <Tab>Tareas hechas</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                {tasks.map((task, index) =>
                  !task.isChecked ? (
                    <TaskItem
                      removeTask={removeTask}
                      updateTask={updateTask}
                      key={index}
                      task={task}
                      index={index}
                    />
                  ) : null // Si la tarea no esta hecha, muestra la tarea en la lista Tareas sin hacer
                )}
                
              </TabPanel>
              <TabPanel>
                {tasks.map((task, index) =>
                  task.isChecked ? (
                    <TaskItem
                      removeTask={removeTask}
                      key={index}
                      task={task}
                      index={index}
                    />
                  ) : null // Si la tarea esta hecha, muestra la tarea en la lista Tareas hechas
                )}
              </TabPanel>
            </TabPanels>
          </Tabs>
          <form onSubmit={(e) => addTask(e)}>
            <Flex mt="1%">
              <Input
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)} // Cambia el valor del input
                variant="flushed"
                placeholder="Crear tarea"
                w="100%"
                color="black"
              />{" "}
              {/* Input para agregar una tarea */}
              <Button type="submit" ml={5} bg="blue.400" color="white">
                +
              </Button>
            </Flex>
          </form>
        </Flex>
      </Flex>
    </>
  );
};
                
const TaskItem = ({ task, index, updateTask, removeTask }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = React.useRef()

  return (
    <Checkbox
      onChange={(e) => updateTask(index, e.target.checked)}
      colorScheme="green"
      mb={10}
      w="100%"
      flexDir="row"
      isChecked={task.isChecked}
      
    >
      <Flex w="100%" flexDir="row">
        <Text color="black" alignSelf="center">
          {task.text}
        </Text>
        <IconButton
          // 
          onClick={onOpen}
          bg="red.600"
          pos="absolute"
          right={0}
          color="white"
          icon={<DeleteIcon />}
          aria-label={""}
          borderRadius="full"
        />
        <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Borrar tarea
            </AlertDialogHeader>

            <AlertDialogBody>
              Estas seguro que quieres borrar esta tarea?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancelar
              </Button>
              <Button colorScheme='red' onClick={() => removeTask(index)} ml={3}>
                Borrar
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
      </Flex>
    </Checkbox>
  );
};

export default App;
