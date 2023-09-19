import { Box, Typography, styled } from "@mui/material";

const ImageWrapper = styled("div")(({}) => ({}));

const ChatEmpy = () => {
  return (
    <>
      <Box sx={{display: "flex", justifyItems: "center", justifyContent: "center", alignItems:"center", width:"100%", height:"100%", flexDirection:"column"}}>
        <Box>
          <ImageWrapper>
            <img
              src={process.env.PUBLIC_URL + "/emptyChat.png"}
              width={"300px"}
            />
          </ImageWrapper>
          <Typography variant={"h6"} fontWeight={"500"}>
            Seleziona una chat e inizia a divertirti
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default ChatEmpy;
