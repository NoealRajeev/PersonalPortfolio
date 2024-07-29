import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Tab, Nav } from "react-bootstrap";
import { ProjectCard } from "./ProjectCard";
import colorSharp2 from "../assets/img/color-sharp2.png";
import 'animate.css';
import TrackVisibility from 'react-on-screen';

export const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/v1/global/projects');
        if (!response.ok) {
          setError(response.body);
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        setError(error.message);
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, []);

  const filterProjectsByTopic = (topic) => {
    return projects.filter(project => project.topics && project.topics.includes(topic));
  };

  return (
    <section className="project" id="projects">
      <Container>
        <Row>
          <Col size={12}>
            <TrackVisibility>
              {({ isVisible }) =>
                <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                  <h2>Projects</h2>
                  <p>Explore some of the projects that showcase my skills in backend development, networking, and IoT development.</p>
                  {error && <p style={{ color: 'red' }}>Error: {error}</p>}
                  <Tab.Container id="projects-tabs" defaultActiveKey="first">
                    <Nav variant="pills" className="nav-pills mb-5 justify-content-center align-items-center" id="pills-tab">
                      <Nav.Item>
                        <Nav.Link eventKey="first">All Projects</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="second">Backend Development</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="third">IoT Projects</Nav.Link>
                      </Nav.Item>
                    </Nav>
                    <Tab.Content id="slideInUp" className={isVisible ? "animate__animated animate__slideInUp" : ""}>
                      <Tab.Pane eventKey="first">
                        <Row>
                          {projects.map((project, index) => (
                            <ProjectCard
                              key={index}
                              title={project.name}
                              description={project.description}
                              imgUrl={project.imgUrl}
                            />
                          ))}
                        </Row>
                      </Tab.Pane>
                      <Tab.Pane eventKey="second">
                        <Row>
                          {filterProjectsByTopic('backend').map((project, index) => (
                            <ProjectCard
                              key={index}
                              title={project.name}
                              description={project.description}
                              imgUrl={project.imgUrl}
                            />
                          ))}
                        </Row>
                      </Tab.Pane>
                      <Tab.Pane eventKey="third">
                        <Row>
                          {filterProjectsByTopic('iot').map((project, index) => (
                            <ProjectCard
                              key={index}
                              title={project.name}
                              description={project.description}
                              imgUrl={project.imgUrl}
                            />
                          ))}
                        </Row>
                      </Tab.Pane>
                    </Tab.Content>
                  </Tab.Container>
                </div>}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
      <img className="background-image-right" src={colorSharp2} alt="background" />
    </section>
  );
};
