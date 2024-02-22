export function ErrorBoundary() {
  let error = useRouteError();
  console.error(error);

  return (
    <Box
      w={"100%"}
      h={"100vh"}
      justifyContent={"center"}
      alignContent={"center"}
      alignItems={"center"}>
      <Text fontSize={40} color={"green"}>
        Rediracting.....
      </Text>
    </Box>
  );
}
