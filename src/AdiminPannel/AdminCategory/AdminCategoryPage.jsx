import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  Image,
  List,
  ListItem,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import AdminNavbar from "../NavBar/AdminNavBar";

import { useSelector } from "react-redux";
import {
  FetchUserCategory,
  SortCategoryId,
} from "../../Services/CategoryService";
import { useEffect, useRef, useState } from "react";

import Loader from "../../Components/Spinner/Spinner";

import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import AdminCategoryCard from "./AdminCategoryCard";
import { Link, useLoaderData } from "react-router-dom";

function AdminCategoryPage() {
  const [newCategoryList, setNewCategoryList] = useState(null);

  let categoryStore = useSelector((data) => {
    return data.CategorySlice;
  });

  const { CategoryData, isError, isLoading } = categoryStore;

  // console.log("catedata", CategoryData);

  useEffect(() => {
    FetchUserCategory();
  }, []);

  useEffect(() => {
    setNewCategoryList(CategoryData);
  }, [CategoryData]);

  const HandledragData = (data) => {
    const srcIndex = data.source.index;
    const destinationIndex = data.destination.index;

    let temarray = [...newCategoryList];
    let [splicedata] = temarray.splice(srcIndex, 1);

    temarray.splice(destinationIndex, 0, splicedata);
    setNewCategoryList(temarray);

    let cateId = temarray.map((ele) => ele.id);
    SortCategoryId(cateId);
  };

  return (
    <>
      <DragDropContext onDragEnd={(data) => HandledragData(data)}>
        {newCategoryList && (
          <Droppable droppableId="drop-1">
            {(provided) => (
              <List spacing={8}>
                <Box
                  w={"80%"}
                  m={"auto"}
                  ref={provided.innerRef}
                  {...provided.droppableProps}>
                  {newCategoryList?.map((ele, i) => (
                    <AdminCategoryCard {...ele} index={i} key={ele.id} />
                  ))}
                </Box>
              </List>
            )}
          </Droppable>
        )}
      </DragDropContext>
    </>
  );
}

export default AdminCategoryPage;
