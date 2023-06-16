import React from "react";
import { Container, Card, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";

const Hero = () => {
  const { userInfo } = useSelector((state) => state.auth);
  return (
    <div className="py-5">
      <Container className="d-flex justify-content-center">
        <Card className="p-5 d-flex flex-column align-items-center hero-card bg-light w-75">
          <h1 className="text-center mb-4">MERN Authentication</h1>
          <p className="text-center mb-4">
            This is a boilerplate for MERN authentication that stores a JWT in
            an HTTP-Only cookie. It also uses Redux Toolkit and the React
            Bootstrap library
          </p>
          <div className="d-flex">
            {userInfo ? (
              <>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Maiores laborum ipsam voluptatem dolorum laboriosam distinctio
                  provident. Quos ad doloribus fuga veniam repellendus earum
                  ipsum quam dicta. Aliquam deserunt repudiandae numquam quis
                  eligendi, ipsam iure illum dolor animi cum autem, quaerat
                  tempore at odit quibusdam perspiciatis nostrum voluptate,
                  voluptates repellat alias fuga sapiente commodi! Minus natus
                  iusto, est fuga rem id reiciendis veritatis. Ipsam, deleniti.
                  Aperiam voluptatibus placeat, voluptatem perspiciatis,
                  laudantium asperiores reprehenderit sapiente earum sunt nulla
                  deleniti, dolore omnis! Amet aspernatur tempore totam cum unde
                  consectetur voluptate dolorem ratione aperiam tempora. Quo
                  perferendis debitis impedit animi adipisci et at a.
                </p>
              </>
            ) : (
              <>
                <LinkContainer to="/login">
                  <Button variant="primary" className="me-3">
                    Sign In
                  </Button>
                </LinkContainer>
                <LinkContainer to="/register">
                  <Button variant="secondary">Register</Button>
                </LinkContainer>
              </>
            )}
          </div>
        </Card>
      </Container>
    </div>
  );
};

export default Hero;
