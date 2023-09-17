import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, Container } from "@mui/material";

export default function About() {
  return (
    <Container maxWidth="md" sx={{ padding: "3rem", paddingBottom: "7rem" }}>
      <Card>
        <CardActionArea>
          <CardMedia
            component="img"
            height="300"
            image="https://images.unsplash.com/photo-1563906267088-b029e7101114?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
            alt="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              About Us
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quae,
              quod dolorem. Maiores deserunt aspernatur illum nobis commodi
              dolores modi repellendus reprehenderit architecto fugit ea, neque
              sequi, aperiam nam est maxime! Lorem ipsum, dolor sit amet
              consectetur adipisicing elit. Cupiditate, veniam. Asperiores
              praesentium inventore hic sapiente sit ex, dolorum provident in.
              Vero perspiciatis nam eligendi soluta quia! Deserunt, perferendis
              omnis! Recusandae. Lorem ipsum dolor, sit amet consectetur
              adipisicing elit. Nesciunt laboriosam perferendis mollitia et
              velit. Alias, id exercitationem aut quas facere consequuntur
              eligendi dicta ex minima, doloremque autem, harum hic porro.
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Container>
  );
}
