import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";

const GetMovie = () => {
  const [api, setApi] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch(
      "https://api.themoviedb.org/3/trending/movie/day?&api_key=c202f0c11aa8b52272804f5b020a8667&language=en-US"
    )
      .then((res) => res.json())
      .then((data) => setApi(data.results))
      .catch((err) => console.error("Error fetching data:", err));
  }, []);

  const movieSearch = () => {
    fetch(
      `https://api.themoviedb.org/3/search/movie?query=${search}&api_key=c202f0c11aa8b52272804f5b020a8667`
    )
      .then((res) => res.json())
      .then((data) => setApi(data.results))
      .catch((err) => console.error("Error searching movie:", err));
  };

  return (
    <div>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container fluid>
          <Navbar.Brand href="#">MovieZone</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link href="#action1">Home</Nav.Link>
              <Nav.Link href="#action2">Link</Nav.Link>
              <NavDropdown title="Link" id="navbarScrollingDropdown">
                <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action4">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action5">
                  Something else here
                </NavDropdown.Item>
              </NavDropdown>
              <Nav.Link href="#" disabled>
                Link
              </Nav.Link>
            </Nav>
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button variant="outline-success" onClick={movieSearch}>
                Search
              </Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Carousel>
        {api.map((movie) => (
          <div key={movie.id}>
            <img
              src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
              alt={movie.title}
            />
            <p className="legend">{movie.title}</p>
            <p>{movie.vote_average}</p>
          </div>
        ))}
      </Carousel>

      <section
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-evenly",
        }}
      >
        {api.map((movie) => (
          <div key={movie.id} style={{ height: "500px", margin: "20px" }}>
            <Card style={{ width: "20rem" }}>
              <Card.Img
                variant="top"
                src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
                alt={movie.title}
              />
              <Card.Body>
                <Card.Title>{movie.title}</Card.Title>
                <Card.Text>{movie.overview}</Card.Text>
                <Button
                  variant="primary"
                  onClick={() => navigate("/particular", { state: { movie } })}
                >
                  Know More
                </Button>
              </Card.Body>
            </Card>
          </div>
        ))}
      </section>
    </div>
  );
};

export default GetMovie;
