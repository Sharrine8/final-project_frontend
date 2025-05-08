// import img from "../../assets/search_background.png";
import img from "../../assets/author.jpeg";
import "./About.css";

function About() {
  return (
    <section className="about">
      <img className="about__img" src={img} />
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
          With a solid foundation in full-stack development, I am eager to
          contribute to impactful projects and further refine my technical and
          collaborative skills.
        </p>
      </div>
    </section>
  );
}

export default About;
