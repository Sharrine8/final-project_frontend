import img from "../../assets/author.jpeg";
import "./About.css";

function About() {
  return (
    <section className="about">
      <img className="about__img" src={img} alt="Photo of Author" />
      <div className="about__info">
        <h2 className="about__title">About the author</h2>
        <p className="about__text">
          I am a software engineer and a senior student at TripleTen,
          specializing in full-stack development with a strong focus on the MERN
          stack (MongoDB, Express, React, Node.js) and JavaScript. Over the past
          year, I have honed my skills in building and deploying scalable web
          applications, with expertise in areas such as API development, user
          authentication, and data validation. I am proficient in using tools
          like Postman for API testing and Figma for designing intuitive user
          interfaces.
          <br />
          <br />
          I’ve always loved languages and speak four of them. Along the way, I
          discovered a love for problem-solving — whether tackling puzzles,
          escape rooms, or finding practical solutions at home and work.
          <br />
          <br />
          Software engineering felt like the right path, where my curiosity,
          skills, and desire to make an impact come together. After exploring
          different directions in life, I left my teaching career to pursue this
          field, embracing a challenge that excites me and lets me do work I
          genuinely enjoy.
          <br />
          <br />
          With a solid foundation in full-stack development, I am eager to
          contribute to impactful projects and further refine my technical and
          collaborative skills.
        </p>
      </div>
    </section>
  );
}

export default About;
